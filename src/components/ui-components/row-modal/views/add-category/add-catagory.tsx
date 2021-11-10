import BottomModal from 'components/ui-components/bottom-modal';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useAddCategory } from './add-category.hook';

export const AddCategory: React.FC = () => {
  const { state, onCancel, onChangeCategory, onAddCategory } = useAddCategory();

  return (
    <>
      <BottomModal.Title>Add Category</BottomModal.Title>
      <BottomModal.Disclaimer>
        To add a new category, enter the name of the category and click "Add
        Category".
      </BottomModal.Disclaimer>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Spreadsheet Title"
          disabled={state.disabled}
          value={state.category}
          onChange={onChangeCategory}
        />
        {state.error && (
          <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
            {state.error}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <BottomModal.Button
        variant="primary"
        disabled={state.disabled}
        onClick={onAddCategory}
      >
        Add Category
      </BottomModal.Button>
      <BottomModal.Button onClick={onCancel}>Cancel</BottomModal.Button>
    </>
  );
};
