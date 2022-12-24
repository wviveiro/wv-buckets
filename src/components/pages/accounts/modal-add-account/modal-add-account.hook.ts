import { setAlert } from 'components/alert';
import { treatGoogleAPIError } from 'components/google/google-api/google-api';
import { importAccounts, loadAccounts } from 'components/redux/slices/accounts';
import { initialiseDatabase } from 'components/schemas';
import { createSpreadsheet } from 'components/sheet-api';
import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { accountExists, onAddAccount } from '../accounts.service';
import {
  ModalAddAccountErrors,
  ModalAddAccountProps,
  ModalAddAccountStateInterface,
} from './modal-add-account.interface';

export const useModalAddAccountState = (props: ModalAddAccountProps) => {
  const history = useHistory();
  const [state, setState] = useStateStatus<ModalAddAccountStateInterface>({
    status: Status.loaded,
    title: '',
    url: '',
    show: !!props.type,
    error: {},
  });

  const dispatch = useDispatch();

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

    if (accountExists(found[1])) {
      return setState({
        error: {
          url: ModalAddAccountErrors.accountExists,
        },
      });
    }

    setState({ status: Status.loading, error: {} });

    try {
      // Verify if ID is correct
      const accounts = await initialiseDatabase([found[1]]);

      const hasError = accounts.find((account) => account.error);

      if (hasError) throw new Error(hasError.error as string);

      dispatch(loadAccounts(accounts));

      onAddAccount(found[1]);

      setAlert('Account created successfully', 'success');
      return setState({
        status: Status.loaded,
        show: false,
      });
    } catch (error: any) {
      return setState({
        status: Status.loaded,
        error: { url: treatGoogleAPIError(error) },
      });
    }
  };

  const onCreateAccount = async () => {
    if (!state.title.trim()) {
      return setState({
        error: {
          url: ModalAddAccountErrors.missingUrl,
        },
      });
    }

    setState({ status: Status.loading, error: {} });

    try {
      const response = await createSpreadsheet(state.title);
      const spreadsheetId = response.spreadsheetId;

      if (!spreadsheetId) throw new Error('Spreadsheet not returned from api');

      dispatch(importAccounts([spreadsheetId]));
      onAddAccount(spreadsheetId);

      setAlert('Account created successfully', 'success');
      return setState({
        status: Status.loaded,
        show: false,
      });
    } catch (error: any) {
      return setState({
        status: Status.loaded,
        error: { url: treatGoogleAPIError(error) },
      });
    }
  };

  const handleCreateButton = () => {
    if (props.type === 'import-account') {
      return onImport();
    }

    if (props.type === 'create-account') {
      return onCreateAccount();
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
