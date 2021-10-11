import { useParams } from 'react-router';
import { ModalAddAccountProps } from './modal-add-account/modal-add-account.interface';

export const useMainState = () => {
  const { typeCreation } =
    useParams<{ typeCreation: ModalAddAccountProps['type'] }>();

  return { typeCreation };
};
