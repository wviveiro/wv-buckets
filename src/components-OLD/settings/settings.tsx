import React from 'react';
import { useSettingsState } from './settings.hook';
import { SettingsProps } from './settings.interface';
import { Container, Form, Button } from 'react-bootstrap';

export const Settings: React.FC<SettingsProps> = (props) => {
  const { state, handleChange, onSave } = useSettingsState(props);

  return (
    <Container>
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
      <Form.Group className="mb-3">
        <Form.Label>Client ID</Form.Label>
        <Form.Control
          type="text"
          value={state.client_id}
          disabled={state.disabled}
          onChange={handleChange('client_id')}
        />
        {state.errors.client_id && (
          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
            {state.errors.client_id}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>API Key</Form.Label>
        <Form.Control
          type="text"
          value={state.apikey}
          disabled={state.disabled}
          onChange={handleChange('apikey')}
        />
        {state.errors.apikey && (
          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
            {state.errors.apikey}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <hr />
      <p style={{ overflowWrap: 'break-word' }}>
        Set the google sheet id below. It is going to be used as your database.
        The spreadsheet id can on found on the URL like the example
        https://docs.google.com/spreadsheets/d/
        <strong className="text-danger">spreedsheet_id</strong>/edit
      </p>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Spreadsheet ID</Form.Label>
        <Form.Control
          type="text"
          value={state.spid}
          disabled={state.disabled}
          onChange={handleChange('spid')}
        />
        {state.errors.spid && (
          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
            {state.errors.spid}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <hr />
      <Button variant="success" onClick={onSave} disabled={state.disabled}>
        Save
      </Button>
    </Container>
  );
};

export default Settings;
