import { EntityId } from '@reduxjs/toolkit';
import { AccountInterface } from 'components/redux/slices/accounts/accounts.interface';

export interface AccountProps {
  account: AccountInterface;
  onShowMenu: (show: EntityId) => () => void;
}
