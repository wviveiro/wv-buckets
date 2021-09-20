import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { InputGroup } from '../../ui-components/input-group';
import { Loading } from '../loading';
import { Status } from '../statuses/statuses.interface';
import { AddRowState } from './add-row.hook';

export const AddRow: React.FC = () => {
  const { disabled, state, handleCategoryChange, changeField, onSave } =
    AddRowState();

  if (state.status === Status.initializing) {
    return <Loading>Initializing</Loading>;
  }

  return (
    <div>
      <h2>Add Row</h2>
      <hr />
      <InputGroup>
        <label>Category</label>
        <CreatableSelect
          isClearable
          placeholder="Category"
          onChange={handleCategoryChange}
          options={state.categories}
          isDisabled={disabled}
        />
      </InputGroup>
      <InputGroup>
        <label>Date</label>
        <input
          type="date"
          value={state.date}
          onChange={changeField('date')}
          disabled={disabled}
        />
      </InputGroup>
      <InputGroup>
        <label>Amount</label>
        <input
          type="number"
          value={state.amount}
          onChange={changeField('amount')}
          disabled={disabled}
        />
      </InputGroup>

      <InputGroup>
        <label>Message</label>
        <input
          type="text"
          value={state.message}
          onChange={changeField('message')}
          disabled={disabled}
        />
      </InputGroup>
      <button disabled={disabled} onClick={onSave}>
        Save
      </button>
    </div>
  );
};
