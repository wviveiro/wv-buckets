import { selectAccounts } from 'components/redux/selectors/accounts';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ModalAddAccountProps } from './modal-add-account/modal-add-account.interface';

export const useAccountsState = () => {
  const { typeCreation } =
    useParams<{ typeCreation: ModalAddAccountProps['type'] }>();

  const accounts = useSelector(selectAccounts);

  return { accounts, typeCreation };
};
