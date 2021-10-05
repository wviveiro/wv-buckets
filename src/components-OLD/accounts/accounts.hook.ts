import React, { useEffect } from 'react';
import { useStateStatus } from '../../util/use-state-status';
import { getGlobalSettings, saveGlobalSettings } from '../settings';
import { getSpreadsheetDetails } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { AccountsStatesInterface } from './accounts.interface';
import { initialiseAccounts } from './accounts.service';

export const useAccountsState = () => {
  const [state, setState] = useStateStatus<AccountsStatesInterface>({
    defaultAccount: '',
    accounts: [],
    spreadsheets: {},
    addAccountModal: false,
    newaccount: '',
  });

  const handleModalState = (addAccountModal: boolean) => {
    return () => {
      setState({ addAccountModal });
    };
  };

  const handleChangeNewAccount = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState({ newaccount: ev.target.value });
  };

  const onAddAccount = async () => {
    if (!state.newaccount.trim()) return alert('Spreadsheetid is required');
    setState({ status: Status.loading });

    try {
      console.log('--->0008');
      const account = await getSpreadsheetDetails(state.newaccount);
      const globalSettings = getGlobalSettings();
      if (!globalSettings.accounts) globalSettings.accounts = [];
      globalSettings.accounts.push(state.newaccount);
      saveGlobalSettings(globalSettings);
      console.log('00002', state);
      setState({
        status: Status.loaded,
        addAccountModal: false,
        newaccount: '',
        accounts: [...state.accounts, state.newaccount],
        spreadsheets: {
          ...state.spreadsheets,
          [state.newaccount]: {
            title: account.result.properties.title,
          },
        },
      });
    } catch (error) {
      return alert(error.message);
    }
  };

  const makeAccountDefault = (index: number) => {
    return () => {
      const selected = state.accounts[index];

      const globalSettings = getGlobalSettings();
      globalSettings.spid = selected;
      saveGlobalSettings(globalSettings);

      setState({
        defaultAccount: selected,
      });
    };
  };

  useEffect(() => {
    initialiseAccounts((state) => {
      setState({
        status: Status.loaded,
        ...state,
      });
    }).catch((reason) => {
      alert(reason.message || reason.result?.error?.message);
    });
  }, [setState]);

  return {
    state,
    handleModalState,
    handleChangeNewAccount,
    onAddAccount,
    makeAccountDefault,
  };
};
