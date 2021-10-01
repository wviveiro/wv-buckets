import React from 'react';
import { Grid } from '../../ui-components/grid/grid';
import { InputGroup } from '../../ui-components/input-group';
import { Modal } from '../../ui-components/modal';
import { Loading } from '../loading';
import { Status } from '../statuses/statuses.interface';
import { useAccountsState } from './accounts.hook';

export const Accounts: React.FC = () => {
  const {
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
          {state.accounts.map((account, i) => (
            <tr key={i}>
              {console.log('00003', state)}
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
                {state.defaultAccount === account ? (
                  `Default`
                ) : (
                  <button
                    disabled={state.disabled}
                    onClick={makeAccountDefault(i)}
                  >
                    Make Default
                  </button>
                )}
              </td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button disabled={state.disabled} onClick={handleModalState(true)}>
        Add Account
      </button>
      {state.addAccountModal && (
        <Modal>
          <h3>Add an account</h3>
          <InputGroup>
            <label>Spreadsheet ID</label>
            <input
              type="text"
              disabled={state.disabled}
              placeholder="Add new spreadsheetid"
              value={state.newaccount}
              onChange={handleChangeNewAccount}
            />
          </InputGroup>
          <Grid>
            <button disabled={state.disabled} onClick={handleModalState(false)}>
              Cancel
            </button>
            <button disabled={state.disabled} onClick={onAddAccount}>
              Create
            </button>
          </Grid>
        </Modal>
      )}
    </div>
  );
};
