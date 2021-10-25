import { useAppContext } from 'components/app/app.hook';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { ModalAddAccountProps } from './modal-add-account/modal-add-account.interface';

export const useMainState = () => {
  const { accounts } = useAppContext();
  const { typeCreation } =
    useParams<{ typeCreation: ModalAddAccountProps['type'] }>();

  return { accounts, typeCreation };
};
