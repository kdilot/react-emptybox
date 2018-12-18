import React, { Component } from 'react';
import { Language, CurrencyFormat } from 'common';
import { WithWidget, DashboardTitle } from 'components/dashboard/common';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  font-size: 0.8em;
  padding-left: 1em;
  p {
    font-size: 1em;
    padding: 0;
    margin: 0;
  }
  h1 { font-weight: bold; }
`
const AccountWrapper = styled.div`
  h2 { 
    font-size: 1.3em;
    text-align: right; 
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  h3, h6 { text-align: center; }
  h6 { 
    margin-bottom: 2em;
    opacity: 0.8;
  }
`
const TransWrapper = styled.div`
  div { 
    padding-left: 0.7em;
    border-radius: 0.3em;
  }
  .in { border-left: 1em solid green; }
  .out { border-left: 1em solid red; }
  p {
    font-size: 0.8em;
    font-weight: normal;
    display: inline;
    opacity: 0.8;
    margin-left: 5px;
  }
  h5 { font-weight: bold; }
  h6 {
    padding-left: 0.5em;
    border-radius: 0.5em;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0.6;
  }
`

const InoutForm = ({ price, title }) => {
  return (
    <Wrapper>
      <h1><CurrencyFormat price={price} digit={2} /></h1>
      <p><Language text={title} /></p>
    </Wrapper>
  )
}

const AccountForm = ({ account }) => {
  return (
    <AccountWrapper>
      <h2>{account[0]}</h2>
      <h3>{account[1]}</h3>
      <h6>{account[2]}</h6>
    </AccountWrapper>
  )
}

//  income or outcome / price / account information / transcation message
const TransactionForm = ({ type, price, account, message }) => {
  return (
    <TransWrapper>
      <div className={type}>
        <h5>
          {type === 'in' ? '+' : '-'}<CurrencyFormat price={price} digit={2} />
          <p>{account[0]}</p>
          <p>{account[2]}</p>
        </h5>
        <h6>{message}</h6>
      </div>
    </TransWrapper>
  )
}

class Account extends Component {
  constructor(props) {
    super(props)

    this.state = {
      AccountList: [  // country / name / account number
        ['US', 'CHASE', '1240-43045-6554'],
        ['US', 'WELLS FARGO', '7458-88763-1778'],
        ['KR', 'SHINHAN', '110-234-003890'],
        ['US', 'CITY', '4857-2383-498']
      ],
      TransList: [  // country / mount / account / trans name 
        ['in', 1608.39, 0, 'Amazon'],
        ['out', 5800, 3, 'Ebay'],
        ['out', 44.59, 1, 'Ebay'],
        ['in', 10000, 2, 'Company'],
        ['out', 2790.40, 1, 'Shopping'],
      ]
    }
  }

  render() {
    const {
      AccountList,
      TransList
    } = this.state
    let number = 1
    const Income = WithWidget(<InoutForm price={50120} title={'Income'} />)({ col: 12 })
    const Outcome = WithWidget(<InoutForm price={19203.33} title={'Outcome'} />)({ col: 12 })
    return (
      [
        <Income key={number++} />,
        <Outcome key={number++} />,
        <DashboardTitle title={'YourAccount'} key={number++} />,
        AccountList.map((list, index) => {
          const Account = WithWidget(<AccountForm account={list} />)({ col: 6 })
          return (
            <Account key={index} />
          )
        }),
        <DashboardTitle title={'RecentTransactions'} key={number++} />,
        TransList.map((list, index) => {
          const Trans = WithWidget(<TransactionForm type={list[0]} price={list[1]} account={AccountList[list[2]]} message={list[3]} />)(false)
          return (
            <Trans key={index} />
          )
        }),
      ]
    );
  }
}

export default Account;

Account.propTypes = {
  AccountList: PropTypes.array,
  TransList: PropTypes.array,
}