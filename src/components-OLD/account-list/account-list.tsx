import * as React from 'react';
import { useAccountListState } from './account-list.hook';
import { format, parseISO } from 'date-fns';
import Table from 'react-bootstrap/Table';

export const AccountList: React.FC = () => {
  const { state } = useAccountListState();

  return (
    <div>
      <h2>Account List</h2>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {state.rows.map((row, index) => (
            <tr key={index}>
              <td>{format(parseISO(row.date), 'dd/MM/yyyy')}</td>
              <td>${row.amount.toFixed(2)}</td>
              <td>{row.category}</td>
              <td>{row.message}</td>
              <td />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
