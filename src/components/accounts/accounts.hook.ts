import { EntityId } from '@reduxjs/toolkit';
import { selectAccounts } from 'components/redux/selectors/accounts';
import { removeAccount } from 'components/redux/slices/accounts';
import { onConfirm } from 'components/ui-components/confirm-modal/confirm-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { onDeleteAccount } from './accounts.service';
import { ModalAddAccountProps } from './modal-add-account/modal-add-account.interface';

export const useAccountsState = () => {
  const { typeCreation } =
    useParams<{ typeCreation: ModalAddAccountProps['type'] }>();

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState<EntityId | false>(false);

  const accounts = useSelector(selectAccounts);

  const onSetShowMenu = (show: EntityId | false) => {
    return () => {
      setShowMenu(show);
    };
  };

  const onClickDelete = () => {
    onConfirm({
      description:
        'Account will be deleted from the app but not from your google drive.',
      onConfirm: () => {
        if (showMenu === false) return;
        setShowMenu(false);
        dispatch(removeAccount(showMenu));
        onDeleteAccount(showMenu as string);
      },
    });
  };

  return { accounts, typeCreation, showMenu, onSetShowMenu, onClickDelete };
};
