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

const ItemBox = ({ product, color }) => {
  return (
    <Link to={`/product/view/${product.no}`}>
      <Row type="flex" justify="space-around" align="middle" style={{ background: 'white', marginBottom: '1em', padding: '1px', borderRadius: '1em' }}>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ border: '2px solid white', borderRadius: '1em' }}>
          <div style={{ width: '100%', paddingBottom: '100%', background: color[product.image], borderRadius: '1em' }} />
        </Col>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ padding: '1em', fontWeight: 'bold', background: 'white', borderRadius: '1em' }}>
          <h4 className="text-overflow">{product.name}</h4>
          <h4 style={{ textAlign: 'right' }}>
            {product.originPrice ?
              <p style={{ textDecoration: 'line-through' }}>
                (<CurrencyFormat price={product.originPrice} />)
              </p>
              : ''}
            <p><CurrencyFormat price={product.price} /></p>
          </h4>
        </Col>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <div style={{ padding: '0.5em', fontWeight: 'bold', background: 'white', borderRadius: '1em', display: 'flex' }}>
            <div style={{ width: '5.5em', paddingBottom: '5.5em', background: color[product.image], borderRadius: '1em', marginRight: '1em' }} />
            <div style={{ width: '70%' }}>
              <h4 className="text-overflow">{product.name}</h4>
              <h4 style={{ textAlign: 'right' }}>
                {product.originPrice ?
                  <p style={{ textDecoration: 'line-through' }}>
                    (<CurrencyFormat price={product.originPrice} />)
              </p>
                  : ''}
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
      color,
      handleListSort,
      handleCreateProduct
    } = this.props
    let _list = []
    if (list.length > 1) {
      _list = list.sort((a, b) => {
        if (sort === 'name') {
          if (a.name > b.name) return asc ? 1 : -1
          if (a.name < b.name) return asc ? -1 : 1
          return 0
        } else if (sort === 'originPrice') {
          if (a.originPrice < b.originPrice) return asc ? 1 : -1
          if (a.originPrice > b.originPrice) return asc ? -1 : 1
          return 0
        } else if (sort === 'price') {
          if (a.originPrice < b.originPrice) return asc ? 1 : -1
          if (a.originPrice > b.originPrice) return asc ? -1 : 1
          return 0
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
              <Col xs={24} sm={24} md={22} lg={22} xl={22} style={{ marginBottom: '1em', display: 'flex' }}>
                <Row>
                  <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a" onClick={() => { handleListSort('name') }}><Language text="Name" /></Radio.Button>
                      <Radio.Button value="c" onClick={() => { handleListSort('price') }}><Language text="Price" /></Radio.Button>
                      <Radio.Button value="d" disabled><h4>{asc ? <Icon type="arrow-up" theme="outlined" /> : <Icon type="arrow-down" theme="outlined" />}</h4></Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Button type="primary" onClick={() => { handleCreateProduct() }}><Language text="Create" /></Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={30}>
              {_list.length ? _list.map((product, index) => {
                return (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                    <ItemBox product={product} color={color} />
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