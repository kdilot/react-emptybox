import React, { Component } from 'react';
import { Language, CurrencyFormat, RandomNumber } from 'common';
import { WithWidget, DashboardTable, SearchButton } from 'components/dashboard/common';
import randomcolor from 'randomcolor';
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

const display = [<Language text={'Disabled'} />, <Language text={'Enabled'} />]
const productList = []
for (let i = 1; i <= 50; i++) {
  const random = Math.floor(Math.random() * Math.floor(2))
  const product = {
    key: i,
    no: i,
    name: `New Macbook S ${i}`,
    thumbnail: <Avatar shape="square" size="large" style={{ backgroundColor: randomcolor() }} />,
    price: <PriceForm origin={RandomNumber(9000, true)} price={RandomNumber(5000, true)} />,
    quantity: RandomNumber(999, true),
    display: <Tag style={{ color: 'white', opacity: random === 0 ? 0.5 : 1 }}>{display[random]}</Tag>,
  }
  productList.push(product)
}

class ShoppingProduct extends Component {
  SearchList = (value, keyword) => {
    const { list } = this.state
    this.setState({
      search: value ? value : list,
      keyword
    })
  }
  state = {
    list: productList,
    search: false,
    keyword: null,
    columns: ['no', 'thumbnail', 'name', 'price', 'quantity', 'display'],
    SearchList: this.SearchList
  }
  render() {
    const {
      list,
      search,
      keyword,
      columns,
      SearchList
    } = this.state
    let number = 1
    const SearchBtn = WithWidget(<SearchButton list={list} func={SearchList} keyword={keyword} />)({ title: 'ProductSearch', hide: false })
    const Product = WithWidget(<DashboardTable columns={columns} data={search ? search : list} pageSize={15} />)({ title: 'Product', hide: false })
    return (
      [
        <Col xs={24} sm={24} md={24} lg={24} xl={24} key={number++} >
          <SearchBtn />
          <Product />
        </Col>,
      ]
    );
  }
}

export default ShoppingProduct;

ShoppingProduct.propTypes = {
  list: PropTypes.array,
  search: PropTypes.bool,
  keyword: PropTypes.string,
  columns: PropTypes.array,
  number: PropTypes.number,
  SearchList: PropTypes.func,
}