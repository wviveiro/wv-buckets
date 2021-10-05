import React from 'react';
import { SettingsContainer } from './settings.styled';
import { Form, Button } from 'react-bootstrap';
import { useSettingsState } from './settings.hook';

export const Settings: React.FC = () => {
  const { state, onChangeClient, onSave } = useSettingsState();

  return (
    <SettingsContainer>
      <h1>Authenticate</h1>
      <p>
        In order for this project to work, we need you to create a new project
        on{' '}
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
        Create a new project and OAUTH 2.0 credential and add the Client ID
        below. This information will be retained on your device and we will not
        save it online
      </p>
      <p>
        To know more about how create credentials{' '}
        <a
          href="https://developers.google.com/workspace/guides/create-credentials"
          target="_blank"
          rel="noreferrer"
        >
          click here <i className="fas fa-external-link-alt" />
        </a>
      </p>
      <hr />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Client ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Client ID from Oauth 2"
            value={state.client_id}
            onChange={onChangeClient}
          />
          {state.error.client_id && (
            <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
              {state.error.client_id}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
      <div className="d-grid">
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </div>
    </SettingsContainer>
  );
};
