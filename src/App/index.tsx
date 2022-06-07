import React, {useEffect, useState} from "react";
import { Button, Container, Divider, Form, Grid, Header, Image, Label, List, ListItem, Message, Segment, Table } from "semantic-ui-react";
import { unlockAccount } from "../api/web3";
import "./index.css";
import useAsync from "../components/useAsync";
import { useWeb3Context } from "../contexts/Web3";
import Network from "./Network";
import { useMultiSigWalletContext } from "../contexts/MultiSigWallet";
import CreateTxModal from "./CreateTxModal";
import TransactionList from "./TransactionList";
import DepositForm from "./DepositForm";


function App() {
  const {
    state: { account, netId },
    updateAccount,
  } = useWeb3Context();
  const [connect, setConnect] = useState(false);
  const { state } = useMultiSigWalletContext();
  const [open, openModal] = useState(false);

  const { pending, error, call } = useAsync(unlockAccount);

  async function onClickConnect() {
    const { error, data } = await call(null);

    if (error) {
      console.error(error);
    }
    if (data) {
      updateAccount(data);
      setConnect(true);
    }
  }


  if(!connect) {
    return (
      <Grid textAlign="center" style={{height: '100vh'}} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 500}}>
          <Header as='h1' color='teal' textAlign="center">
            Multi-Signature Ethereum Wallet
          </Header>
          <h1/>
        
          <Form size="large">
            <Segment stacked padded>
              <>
                {error ? (
                  <Button fluid size="large">{error.message}</Button>
                ): (
                  <Button fluid size="large" color='red'>Warning : Metamask is not connected</Button>
                )}
              </>
              <h3/>
              <Button color="teal" fluid size="large" onClick={() => onClickConnect()} disabled={pending} loading={pending}>
                  Connect to Metamask
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <Grid padded textAlign="center" style={{height: '100vh'}} verticalAlign='top' >
      <Grid.Column style={{maxWidth: 1000}}>
        <Header as='h1' color='teal' textAlign="center">
          Multi-Signature Ethereum Wallet
        </Header>
        <Divider/>
        <Table celled size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Current Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell> {account} </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider/>

        <Table celled size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Multi-Sig Smart Contract Address : {state.address}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>

        <h3 style={{textAlign:'left'}}>Balance : {state.balance} wei</h3>
        <DepositForm/>
        <Divider/>

        <Table celled size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Multi-Sig Smart Contract Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {state.owners.map((owner, i) => (
            <Table.Body>
            <Table.Row>
              <Table.Cell collapsing key={owner}>
                {i+1}
              </Table.Cell>
              <Table.Cell>{owner}</Table.Cell>
            </Table.Row>
          </Table.Body>
          ))}
        </Table>
        <h4>Confirmations required : {state.numConfirmationsRequired}</h4>
        <Button color="teal" fluid size="large" onClick={() => openModal(true)}>
          Create Transaction
        </Button>
        {open && <CreateTxModal open={open} onClose={() => openModal(false)} />}
        
        <Divider/>
        <h3 style={{textAlign:'left'}}>Transaction List</h3>
        <TransactionList
        numConfirmationsRequired={state.numConfirmationsRequired}
        data={state.transactions}
        count={state.transactionCount}
      />
      </Grid.Column>
    </Grid>
  );

  


    // <div className="App">
    //   <Header as='h1' inverted icon textAlign="center" >
    //     Multi-Signatrue Ethereum Wallet
    //   </Header>
    //   <div className="App-main">
    //     {account ? (
    //       <>
    //         {netId !== 0 && <Network netId={netId} />}
    //         <div>Account: {account}</div>
    //         <MultiSigWallet />
    //       </>
    //     ) : (
    //       <>
    //         {error ? (
    //           <Message error>{error.message}</Message>
    //         ) : (
    //           <Message warning>Metamask is not connected</Message>
    //         )}
    //         <Button
    //           color="green"
    //           onClick={() => onClickConnect()}
    //           disabled={pending}
    //           loading={pending}
    //         >
    //           Connect to Metamask
    //         </Button>
    //       </>
    //     )}
    //   </div>
    // </div>
  // );
}

export default App;
