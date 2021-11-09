import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAccountDetails } from 'components/redux/selectors/accounts/accounts.hooks';
import BlackModal, { Item } from 'components/ui-components/black-modal';
import React from 'react';
import { useRowModalContext } from '../../context/row-modal-context';
import { SelectAccountItemProps } from './select-account.interface';

export const SelectAccount: React.FC = () => {
  const { setState, accounts, selectedAccount } = useRowModalContext();

  const onClose = () => {
    setState({ openAccountList: false });
  };

  return (
    <>
      <BlackModal.Title
        leftButton={
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        }
      >
        Select an Account
      </BlackModal.Title>
      <BlackModal.List>
        {accounts.ids.map((id, i) => (
          <SelectAccountItem
            key={i}
            id={id}
            selected={selectedAccount?.spreadsheetId === id}
          />
        ))}
      </BlackModal.List>
    </>
  );
};

const SelectAccountItem: React.FC<SelectAccountItemProps> = ({
  id,
  selected,
}) => {
  const { setState } = useRowModalContext();
  const { account, balance } = useAccountDetails(id);

  const onClick = () => {
    setState({ account_id: id, openAccountList: false });
  };

  return (
    <BlackModal.List.Item onClick={onClick}>
      <div className="flex">
        <div className="icon-container">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
        <div className="flexGrow">
          <h4>{account?.title}</h4>
          <div className="flex">
            <span>Balance</span>
            <span
              className={classNames('balance', { 'text-danger': balance < 0 })}
            >
              ${balance.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="tick-container">
          {selected && <FontAwesomeIcon icon={faCheck} />}
        </div>
      </div>
    </BlackModal.List.Item>
  );
};
