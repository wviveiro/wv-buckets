import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ModalAddAccountProps } from './modal-add-account.interface';

export const useModalAddAccountState = (props: ModalAddAccountProps) => {
  const history = useHistory();
  const [state, setState] = useStateStatus({
    status: Status.loaded,
    title: '',
    url: '',
    show: !!props.type,
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

  return {
    type: props.type,
    state,
    onModalClose,
    onCancel,
  };
};
