import React, { Component } from 'react';
import { Language, CurrencyFormat, RandomNumber } from 'common';
import { DashboardWidget, DashboardTable } from 'components/dashboard';
import { Col, Avatar, Tag } from 'antd';
import PropTypes from 'prop-types';

const PriceForm = ({ price }) => {
  return (
    <p><CurrencyFormat price={price} /></p>
  )
}

const color = ['red', 'black', 'blue', 'yellow', 'purple', 'green', 'aqua', 'antiquewhite', 'darkcyan', 'royalblue', 'orange', 'maroon', 'tan', 'lightsteelblue']
const status = [<Language value={'Arriving'} />, <Language value={'Delivered'} />, <Language value={'Canceled'} />]
const shippingList = []
for (let i = 1; i <= 50; i++) {
  const random = Math.floor(Math.random() * Math.floor(3))
  const shipping = {
    key: i,
    no: i,
    orderNo: `#${RandomNumber(5)}`,
    buyer: <Avatar icon="user" shape="square" size="large" style={{ backgroundColor: color[RandomNumber(14)] }} />,
    address: `${RandomNumber(5)} Test Street Apt ${100 + RandomNumber(20)}, CA`,
    total: <PriceForm price={RandomNumber(5000)} />,
    quantity: RandomNumber(999),
    status: <Tag style={{ color: 'white', background: random === 0 ? 'green' : (random === 1 ? 'blue' : 'red') }}>{status[random]}</Tag>,
  }
  shippingList.push(shipping)
}

class ShoppingShipping extends Component {
  state = {
    columns: ['no', 'orderNo', 'buyer', 'address', 'total', 'quantity', 'status'],
  }
  render() {
    const { columns } = this.state
    let number = 1
    const Shipping = DashboardWidget(<DashboardTable columns={columns} data={shippingList} pageSize={15} />, <Language value={'Shipping'} />, 24, false)
    return (
      [
        <Col xs={24} sm={24} md={24} lg={24} xl={24} key={number++} >
          <Shipping />
        </Col>,
      ]
    );
  }
}

export default ShoppingShipping;

ShoppingShipping.propTypes = {
  columns: PropTypes.array,
  number: PropTypes.number,
}