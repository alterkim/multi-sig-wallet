import React from "react";
import BN from "bn.js";
import TransactionActions from "./TransactionActions";
import { Table } from "semantic-ui-react";

interface Transaction {
  txIndex: number;
  to: string;
  value: BN;
  data: string;
  executed: boolean;
  numConfirmations: number;
  isConfirmedByCurrentAccount: boolean;
}

interface Props {
  numConfirmationsRequired: number;
  count: number;
  data: Transaction[];
}

// const headerRow = ['Tx Index', 'To', 'Value', 'Data', 'Executed', 'Confirmations'];

const TransactionList: React.FC<Props> = ({
  numConfirmationsRequired,
  count,
  data
}) => {
  return (
    <Table celled size="large">
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Data</Table.HeaderCell>
          <Table.HeaderCell>Executed</Table.HeaderCell>
          <Table.HeaderCell>Confirmations</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {data.map(tx => (
        <Table.Body>
          <Table.Row textAlign="center">
            <Table.Cell collapsing key={tx.txIndex}>{tx.txIndex}</Table.Cell>
            <Table.Cell>{tx.to}</Table.Cell>
            <Table.Cell>{tx.value.toString()}</Table.Cell>
            <Table.Cell>{tx.data}</Table.Cell>
            <Table.Cell>{tx.executed.toString()}</Table.Cell>
            <Table.Cell>{tx.numConfirmations}</Table.Cell>
            <Table.Cell>
              <TransactionActions 
              numConfirmationsRequired={numConfirmationsRequired}
              tx={tx}/>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ))}
    </Table>
    // <ul>
    //   {data.map(tx => (
    //     <li key={tx.txIndex}>
    //       <div>Tx Index: {tx.txIndex}</div>
    //       <div>To: {tx.to}</div>
    //       <div>Value: {tx.value.toString()}</div>
    //       <div>Data: {tx.data}</div>
    //       <div>Executed: {tx.executed.toString()}</div>
    //       <div>Confirmations: {tx.numConfirmations}</div>
    //       <TransactionActions
    //         numConfirmationsRequired={numConfirmationsRequired}
    //         tx={tx}
    //       />
    //     </li>
    //   ))}
    // </ul>
  );
};

export default TransactionList;
