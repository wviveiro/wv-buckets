import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useModalAddAccountState } from './modal-add-account.hook';
import { ModalAddAccountProps } from './modal-add-account.interface';
import { ModalAddAccountContainer } from './modal-add-account.styled';

export const ModalAddAccount: React.FC<ModalAddAccountProps> = (props) => {
  const { state, type, onCancel, onModalClose } =
    useModalAddAccountState(props);

  return (
    <ModalAddAccountContainer show={state.show} onClose={onModalClose}>
      {type === 'create-account' ? (
        <>
          <h2>Create Account</h2>
          <p className="disclaimer">
            Accounts are based on spreadsheets in your google account. You can
            create a new spreadsheet by filling the title below. If you rather
            import an existent spreadsheet{' '}
            <Link to="/import-account">Click here</Link>
          </p>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Spreadsheet Title"
              disabled={state.disabled}
            />
          </Form.Group>
        </>
      ) : type === 'import-account' ? (
        <>
          <h2>Import Account</h2>
          <p className="disclaimer">
            Accounts are based on spreadsheets in your google account. You can
            import a spreadsheet by filling its URL below. If you rather create
            a new spreadsheet <Link to="/create-account">Click here</Link>
          </p>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Spreadsheet URL"
              disabled={state.disabled}
            />
          </Form.Group>
        </>
      ) : null}
      <button disabled={state.disabled} className="create-account">
        {type === 'create-account' ? 'Create Account' : 'Import Account'}
      </button>
      <button
        disabled={state.disabled}
        className="cancel-creation"
        onClick={onCancel}
      >
        Cancel
      </button>
    </ModalAddAccountContainer>
  );
};
