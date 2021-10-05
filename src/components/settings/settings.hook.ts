import { setGlobalSettings } from 'components/global-settings';
import { useStateStatus } from 'components/util/use-state-status';
import React from 'react';
import { SettingsStateInterface } from './settings.interface';

export const useSettingsState = () => {
  const [state, setState] = useStateStatus<SettingsStateInterface>({
    client_id: '',
    error: {},
  });

  const onChangeClient = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      client_id: ev.target.value,
      error: {
        ...state.error,
        client_id: undefined,
      },
    });
  };

  const onSave = () => {
    if (!state.client_id.trim()) {
      return setState({
        error: {
          ...state.error,
          client_id: 'Client ID required',
        },
      });
    }

    setGlobalSettings({ client_id: state.client_id });
    window.location.reload();
  };

  return { state, onChangeClient, onSave };
};
