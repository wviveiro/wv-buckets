import React, { useEffect } from 'react';
import { useStateStatus } from '../../util/use-state-status';
import { alert } from '../alert/alert';
import { useMainProvider } from '../main-provider';
import { Status } from '../statuses/statuses.interface';
import {
  SettingsInterface,
  SettingsProps,
  SettingsStateInterface,
} from './settings.interface';
import {
  deleteGlobalSettings,
  getGlobalSettings,
  isAppAuthenticated,
  saveGlobalSettings,
} from './settings.service';

export const useSettingsState = (props: SettingsProps) => {
  const { initialiser } = useMainProvider();
  const [state, setState] = useStateStatus<SettingsStateInterface>({
    apikey: '',
    client_id: '',
    spid: '',
    errors: {},
  });

  const handleChange = (field: keyof typeof state) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      setState({ [field]: ev.target.value });
    };
  };

  const onSave = async () => {
    const required: (keyof SettingsInterface)[] = [
      'apikey',
      'client_id',
      'spid',
    ];
    const invalid = required.filter((field) => !`${state[field]}`.trim());
    if (invalid.length) {
      return setState(
        invalid.reduce(
          (acc, curr) => ({
            errors: {
              ...acc.errors,
              [curr]: `Field is required`,
            },
          }),
          { errors: {} }
        )
      );
    }

    setState({ errors: {} });

    let globalSettings = getGlobalSettings();

    const accounts = (globalSettings.accounts || []).filter(
      (account) => account !== state.spid
    );

    globalSettings = {
      ...globalSettings,
      ...required.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: state[curr],
        }),
        {}
      ),
      accounts: [...accounts, state.spid],
    };

    saveGlobalSettings(globalSettings);
    if (initialiser) initialiser();
  };

  useEffect(() => {
    const globalSettings = getGlobalSettings();
    setState({
      apikey: globalSettings.apikey,
      client_id: globalSettings.client_id,
      spid: globalSettings.spid,
      status: Status.loaded,
    });
  }, [setState]);

  return {
    state,
    handleChange,
    onSave,
  };
};
