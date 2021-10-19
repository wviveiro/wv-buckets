import { setAlert } from 'components/alert';
import { useAppContext } from 'components/app/app.hook';
import { getSpreadsheetDetails } from 'components/sheet-api';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  ModalAddAccountErrors,
  ModalAddAccountProps,
  ModalAddAccountStateInterface,
} from './modal-add-account.interface';

export const useModalAddAccountState = (props: ModalAddAccountProps) => {
  const { onAddAccount } = useAppContext();
  const history = useHistory();
  const [state, setState] = useStateStatus<ModalAddAccountStateInterface>({
    status: Status.loaded,
    title: '',
    url: '',
    show: !!props.type,
    error: {},
  });

  useEffect(() => {
    setState({ show: !!props.type });
  }, [props.type, setState]);

  const onModalClose = () => {
    history.push('/');
  };

  const onCancel = () => {
    setState({ show: false });
  };

  const onImport = async () => {
    if (!state.url.trim()) {
      return setState({
        error: {
          url: ModalAddAccountErrors.missingUrl,
        },
      });
    }
    const found = state.url.match(
      /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]*)(\/.*)?$/
    );
    if (!found || !found[1]) {
      return setState({
        error: {
          url: ModalAddAccountErrors.invalidUrl,
        },
      });
    }

    setState({ status: Status.loading, error: {} });

    try {
      const details = await getSpreadsheetDetails(found[1]);

      // onAddAccount({
      //   title: details.result.properties?.title || '',
      //   spreadsheetId: found[1],
      // });

      setAlert('Account added successfully', 'success');

      setState({
        status: Status.loaded,
        show: false,
      });
    } catch (error: any) {
      if (error instanceof Error)
        return setState({
          status: Status.loaded,
          error: { url: error.message },
        });

      console.error(error);

      if (error?.result?.error?.message)
        return setState({
          status: Status.loaded,
          error: {
            url: error.result.error.message,
          },
        });

      return setState({
        status: Status.loaded,
        error: {
          url: ModalAddAccountErrors.invalidUrl,
        },
      });
    }

    setState({ status: Status.loaded });
  };

  const handleCreateButton = () => {
    if (props.type === 'import-account') {
      return onImport();
    }
  };

  const onChangeValue = (type: 'url' | 'title') => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      setState({ [type]: ev.target.value });
    };
  };

  return {
    type: props.type,
    state,
    onModalClose,
    onCancel,
    handleCreateButton,
    onChangeValue,
  };
};
