import React from 'react';
import { Grid } from '../../ui-components/grid/grid';
import { InputGroup } from '../../ui-components/input-group';
import { Modal } from '../../ui-components/modal';
import { Loading } from '../loading';
import { Status } from '../statuses/statuses.interface';
import { useAccountsState } from './accounts.hook';

export const Accounts: React.FC = () => {
  const {
    disabled,
    state,
    handleModalState,
    handleChangeNewAccount,
    onAddAccount,
    makeAccountDefault,
  } = useAccountsState();

  if (state.status === Status.initializing) {
    return <Loading>Initializing</Loading>;
  }

  return (
    <div>
      <h2>Accounts</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.spreadsheets[state.defaultAccount].title}</td>
            <td>
              <a
                href={`https://docs.google.com/spreadsheets/d/${state.defaultAccount}`}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </td>
            <td>Default</td>
            <td />
          </tr>
          {state.accounts.map((account, i) => (
            <tr key={i}>
              <td>{state.spreadsheets[account].title}</td>
              <td>
                <a
                  href={`https://docs.google.com/spreadsheets/d/${account}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                </a>
              </td>
              <td>
                <button disabled={disabled} onClick={makeAccountDefault(i)}>
                  Make Default
                </button>
              </td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button disabled={disabled} onClick={handleModalState(true)}>
        Add Account
      </button>
      {state.addAccountModal && (
        <Modal>
          <h3>Add an account</h3>
          <InputGroup>
            <label>Spreadsheet ID</label>
            <input
              type="text"
              disabled={disabled}
              placeholder="Add new spreadsheetid"
              value={state.newaccount}
              onChange={handleChangeNewAccount}
            />
          </InputGroup>
          <Grid>
            <button disabled={disabled} onClick={handleModalState(false)}>
              Cancel
            </button>
            <button disabled={disabled} onClick={onAddAccount}>
              Create
            </button>
          </Grid>
        </Modal>
      )}
    </div>
  );
};
