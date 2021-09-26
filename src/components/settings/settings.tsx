import React from 'react';
import { Grid, GridItem } from '../../ui-components/grid/grid';
import { InputGroup } from '../../ui-components/input-group';
import { useSettingsState } from './settings.hook';
import { SettingsProps } from './settings.interface';

export const Settings: React.FC<SettingsProps> = (props) => {
  const { state, handleChange, onSave } = useSettingsState(props);

  return (
    <div>
      <h2>Settings Page</h2>
      <p>
        In order to this project to work, we need you to create a new project
        on&nbsp;
        <a
          href="https://console.developers.google.com"
          target="_blank"
          rel="noreferrer"
        >
          https://console.developers.google.com
        </a>
        .
      </p>
      <p>
        Create a new project and OAUTH 2.0 credential and add the Client ID and
        API Key below. This information will be retained on your device and we
        will not save it online
      </p>
      <hr />
      <Grid>
        <GridItem size={1}>
          <InputGroup>
            <label>Client ID</label>
            <input
              type="text"
              value={state.client_id}
              disabled={state.disabled}
              onChange={handleChange('client_id')}
            />
            {state.errors.client_id && (
              <p className="text-danger">{state.errors.client_id}</p>
            )}
          </InputGroup>
        </GridItem>
        <GridItem size={1}>
          <InputGroup>
            <label>API Key</label>
            <input
              type="text"
              value={state.apikey}
              disabled={state.disabled}
              onChange={handleChange('apikey')}
            />
            {state.errors.apikey && (
              <p className="text-danger">{state.errors.apikey}</p>
            )}
          </InputGroup>
        </GridItem>
      </Grid>
      <hr />
      <p>
        Set the google sheet id below. It is going to be used as your database.
        The spreadsheet id can on found on the URL like the example
        https://docs.google.com/spreadsheets/d/
        <strong className="text-danger">spreedsheet_id</strong>/edit
      </p>
      <hr />
      <Grid>
        <GridItem>
          <label>Spreadsheet ID</label>
          <input
            type="text"
            value={state.spid}
            disabled={state.disabled}
            onChange={handleChange('spid')}
          />
          {state.errors.spid && (
            <p className="text-danger">{state.errors.spid}</p>
          )}
        </GridItem>
      </Grid>
      <hr />
      <button onClick={onSave} disabled={state.disabled}>
        Save
      </button>
    </div>
  );
};

export default Settings;
