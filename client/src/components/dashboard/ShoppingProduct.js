import React, { Component } from 'react';
import { Language, CurrencyFormat, RandomNumber } from 'common';
import { DashboardWidget, DashboardTable } from 'components/dashboard';
import { Col, Avatar, Tag } from 'antd';
import PropTypes from 'prop-types';

const PriceForm = ({ origin, price }) => {
  return (
    <div>
      {origin ?
        <p style={{ textDecoration: 'line-through', opacity: 0.5 }}><CurrencyFormat price={origin} /></p>
        : ''
      }
      <p><CurrencyFormat price={price} /></p>
    </div>
  )
}

const color = ['red', 'black', 'blue', 'yellow', 'purple', 'green', 'aqua', 'antiquewhite', 'darkcyan', 'royalblue', 'orange', 'maroon', 'tan', 'lightsteelblue']
const display = [<Language value={'Disabled'} />, <Language value={'Enabled'} />]
const productList = []
for (let i = 1; i <= 50; i++) {
  const random = Math.floor(Math.random() * Math.floor(2))
  const product = {
    key: i,
    no: i,
    name: `New Macbook S ${i}`,
    thumbnail: <Avatar shape="square" size="large" style={{ backgroundColor: color[RandomNumber(14)] }} />,
    price: <PriceForm origin={RandomNumber(9000)} price={RandomNumber(5000)} />,
    quantity: RandomNumber(999),
    display: <Tag style={{ color: 'white', opacity: random === 0 ? 0.5 : 1 }}>{display[random]}</Tag>,
  }
  productList.push(product)
}

class ShoppingProduct extends Component {
  state = {
    columns: ['no', 'thumbnail', 'name', 'price', 'quantity', 'display'],
  }
  render() {
    const { columns } = this.state
    let number = 1
    const Product = DashboardWidget(<DashboardTable columns={columns} data={productList} pageSize={15} />, <Language value={'Product'} />, 24, false)
    return (
      [
        <Col xs={24} sm={24} md={24} lg={24} xl={24} key={number++} >
          <Product />
        </Col>,
      ]
    );
  }
}

export default ShoppingProduct;

ShoppingProduct.propTypes = {
  columns: PropTypes.array,
  number: PropTypes.number,
}