import React, { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { getGlobalSettings, saveGlobalSettings } from '../settings';
import { getSpreadsheetDetails } from '../sheet-api';
import { Status } from '../statuses/statuses.interface';
import { AccountsStatesInterface } from './accounts.interface';
import { initialiseAccounts } from './accounts.service';

export const useAccountsState = () => {
  const [state, setState] = useCreateState<AccountsStatesInterface>({
    status: Status.initializing,
    defaultAccount: '',
    accounts: [],
    spreadsheets: {},
    addAccountModal: false,
    newaccount: '',
  });
  const disabled = state.status !== Status.loaded;

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
      const account = await getSpreadsheetDetails(state.newaccount);
      const globalSettings = getGlobalSettings();
      if (!globalSettings.accounts) globalSettings.accounts = [];
      globalSettings.accounts.push(state.newaccount);
      saveGlobalSettings(globalSettings);
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
      const currentDefault = state.defaultAccount;
      const selected = state.accounts[index];

      const accounts = state.accounts.slice(0);
      accounts.splice(index, 1);
      accounts.push(currentDefault);

      const globalSettings = getGlobalSettings();
      globalSettings.spid = selected;
      globalSettings.accounts = accounts;
      saveGlobalSettings(globalSettings);

      setState({
        defaultAccount: selected,
        accounts,
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
    disabled,
    state,
    handleModalState,
    handleChangeNewAccount,
    onAddAccount,
    makeAccountDefault,
  };
};
