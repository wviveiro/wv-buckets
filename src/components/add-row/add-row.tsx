import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { AddRowState } from './add-row.hook';
import { Form, Modal, Button } from 'react-bootstrap';

export const AddRow: React.FC = () => {
  const { state, handleCategoryChange, changeField, onSave, onClose } =
    AddRowState();

  return (
    <Modal show={state.open} animation={false}>
      <Modal.Header>
        <Modal.Title>Edit Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <CreatableSelect
            isClearable
            placeholder="Category"
            options={state.categories}
            isDisabled={state.disabled}
            onChange={handleCategoryChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            disabled={state.disabled}
            onChange={changeField('date')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            disabled={state.disabled}
            onChange={changeField('amount')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            disabled={state.disabled}
            onChange={changeField('message')}
          />
        </Form.Group>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={state.disabled}
            onClick={onClose}
          >
            Close
          </Button>
          <Button variant="success" disabled={state.disabled} onClick={onSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
