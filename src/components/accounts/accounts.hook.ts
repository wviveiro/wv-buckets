import { EntityId } from '@reduxjs/toolkit';
import { selectAccounts } from 'components/redux/selectors/accounts';
import { getAccountDetails } from 'components/redux/selectors/accounts/accounts.helpers';
import { removeAccount } from 'components/redux/slices/accounts';
import { onConfirm } from 'components/ui-components/confirm-modal/confirm-modal';
import { rowController } from 'components/ui-components/row-modal/row-modal.hook';
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

  const onAddRowModal = () => {
    if (!showMenu) return;

    const { buckets } = getAccountDetails(accounts, showMenu);

    setShowMenu(false);
    rowController.open({
      account_id: showMenu as EntityId,
      category: buckets.ids.length > 0 ? buckets.ids[0] : '',
    });
  };

  return {
    accounts,
    typeCreation,
    showMenu,
    onSetShowMenu,
    onClickDelete,
    onAddRowModal,
  };
};
