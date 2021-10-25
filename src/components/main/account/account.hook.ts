import { AccountProps } from './account.interface';

export const AccountState = (props: AccountProps) => {
  const { account } = props;

  return { account };
};
