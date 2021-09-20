import React, { useEffect } from 'react';
import useCreateState from 'react-hook-setstate';
import { Status } from '../statuses/statuses.interface';
import {
  bucketStorageName,
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
  const [state, setState] = useCreateState<SettingsStateInterface>({
    status: Status.initializing,
    apikey: '',
    client_id: '',
    spid: '',
    errors: {},
  });
  const disabled = state.status !== Status.loaded;

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

    const globalSettings: Partial<SettingsInterface> = required.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: state[curr],
      }),
      {}
    );

    saveGlobalSettings(globalSettings);

    // Check if authentication is valid
    try {
      setState({ status: Status.loading });
      await isAppAuthenticated(true);
    } catch (error) {
      setState({ status: Status.loaded });
      deleteGlobalSettings();
      alert(error);
      return;
    }

    setState({ status: Status.loaded });
    alert('Saved successfully'); // TODO Create a global alert field

    if (props.onAuthenticate) return props.onAuthenticate();

    return setState({ errors: {} });
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
    disabled,
    state,
    handleChange,
    onSave,
  };
};
