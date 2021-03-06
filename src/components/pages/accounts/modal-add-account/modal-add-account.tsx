import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useModalAddAccountState } from './modal-add-account.hook';
import { ModalAddAccountProps } from './modal-add-account.interface';
import BottomModal from 'components/ui-components/bottom-modal';

export const ModalAddAccount: React.FC<ModalAddAccountProps> = (props) => {
  const {
    state,
    type,
    onCancel,
    onModalClose,
    handleCreateButton,
    onChangeValue,
  } = useModalAddAccountState(props);

  return (
    <BottomModal show={state.show} onClose={onModalClose}>
      {type === 'create-account' ? (
        <>
          <BottomModal.Title>Create Account</BottomModal.Title>
          <BottomModal.Disclaimer>
            Accounts are based on spreadsheets in your google account. You can
            create a new spreadsheet by filling the title below. If you rather
            import an existent spreadsheet{' '}
            <Link to="/import-account">Click here</Link>
          </BottomModal.Disclaimer>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Spreadsheet Title"
              disabled={state.disabled}
              value={state.title}
              onChange={onChangeValue('title')}
            />
            {state.error.title && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: 'block' }}
              >
                {state.error.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </>
      ) : type === 'import-account' ? (
        <>
          <BottomModal.Title>Import Account</BottomModal.Title>
          <BottomModal.Disclaimer>
            Accounts are based on spreadsheets in your google account. You can
            import a spreadsheet by filling its URL below. If you rather create
            a new spreadsheet <Link to="/create-account">Click here</Link>
          </BottomModal.Disclaimer>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Spreadsheet URL"
              disabled={state.disabled}
              value={state.url}
              onChange={onChangeValue('url')}
            />
            {state.error.url && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: 'block' }}
              >
                {state.error.url}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </>
      ) : null}
      <BottomModal.Button
        variant="primary"
        disabled={state.disabled}
        onClick={handleCreateButton}
      >
        {type === 'create-account' ? 'Create Account' : 'Import Account'}
      </BottomModal.Button>
      <BottomModal.Button disabled={state.disabled} onClick={onCancel}>
        Cancel
      </BottomModal.Button>
    </BottomModal>
  );
};
