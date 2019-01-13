import React, { Component } from 'react';
import { Row, Col, Radio, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CurrencyFormat, Language } from 'common';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-radio-button-wrapper .ant-radio-button-wrapper-disabled span,
  h4 {
    font-weight: bold;
    color: black;
  }
  .ant-radio-button-wrapper-disabled {
    background: white;
    border-color: white;
  }
  p {
    margin: 0;
  }
`

const ItemBox = ({ product }) => {
  return (
    <Link to={`/product/view/${product.no}`}>
      <Row type="flex" justify="space-around" align="middle" style={{ background: 'white', marginBottom: '1em', padding: '1px', borderRadius: '1em' }}>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ border: '2px solid white', borderRadius: '1em' }}>
          <div style={{ width: '100%', paddingBottom: '100%', background: product.image, borderRadius: '1em' }} />
        </Col>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ padding: '1em', fontWeight: 'bold', background: 'white', borderRadius: '1em' }}>
          <h4 className="text-overflow">{product.name}</h4>
          <h4 style={{ textAlign: 'right' }}>
            <p style={{ textDecoration: 'line-through' }}>
              (<CurrencyFormat price={product.originPrice} />)
            </p>
            <p><CurrencyFormat price={product.price} /></p>
          </h4>
        </Col>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <div style={{ padding: '0.5em', fontWeight: 'bold', background: 'white', borderRadius: '1em', display: 'flex' }}>
            <div style={{ width: '5.5em', paddingBottom: '5.5em', background: product.image, borderRadius: '1em', marginRight: '1em' }} />
            <div style={{ width: '70%' }}>
              <h4 className="text-overflow">{product.name}</h4>
              <h4 style={{ textAlign: 'right' }}>
                <p style={{ textDecoration: 'line-through' }}>
                  (<CurrencyFormat price={product.originPrice} />)
                </p>
                <p><CurrencyFormat price={product.price} /></p>
              </h4>
            </div>
          </div>
        </Col>
      </Row>
    </Link>
  )
}

class ProductList extends Component {
  render() {
    const {
      list,
      sort,
      asc,
      handleListSort,
      handleCreateProduct
    } = this.props
    let _list = []
    if (list.length > 1) {
      _list = list.sort((a, b) => {
        if (sort === 'name') {
          const first = a.name.toString()
          const second = b.name.toString()
          if (!isNaN(a.name) && !isNaN(b.name))
            return asc ? (a.name < b.name ? -1 : 1) : (a.name < b.name ? 1 : -1)
          else
            return asc ? (second.localeCompare(first) ? 1 : -1) : (second.localeCompare(first) ? -1 : 1)
        } else if (sort === 'originPrice') {
          return asc ? (a.originPrice < b.originPrice ? -1 : 1) : (a.originPrice < b.originPrice ? 1 : -1)
        } else if (sort === 'price') {
          return asc ? (a.price < b.price ? -1 : 1) : (a.price < b.price ? 1 : -1)
        }
        return 0
      })
    } else {
      _list = list
    }
    return (
      <Wrapper>
        <Row>
          <Col xs={1} sm={1} md={2} lg={2} xl={2} />
          <Col xs={22} sm={22} md={20} lg={20} xl={20}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: '1em', display: 'flex' }}>
                <Row style={{ width: '100%' }}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ margin: '0.5em 0' }}>
                    <Button type="primary" onClick={() => { handleCreateProduct() }}><Language text="Create" /></Button>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ margin: '0.5em 0', textAlign: 'right' }}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a" onClick={() => { handleListSort('name') }}><Language text="Name" /></Radio.Button>
                      <Radio.Button value="b" onClick={() => { handleListSort('originPrice') }}><Language text="Price" /></Radio.Button>
                      <Radio.Button value="c" onClick={() => { handleListSort('price') }}><Language text="DiscountPrice" /></Radio.Button>
                      <Radio.Button value="d" disabled><h4>{asc ? <Icon type="arrow-up" theme="outlined" /> : <Icon type="arrow-down" theme="outlined" />}</h4></Radio.Button>
                    </Radio.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={30}>
              {_list.length ? _list.map((product, index) => {
                return (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                    <ItemBox product={product} />
                  </Col>
                )
              }) : ''}
            </Row>
          </Col>
          <Col xs={1} sm={1} md={2} lg={2} xl={2} />
        </Row>
      </Wrapper>
    );
  }
}

export default ProductList;