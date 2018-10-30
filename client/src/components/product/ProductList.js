import React, { Component } from 'react';
import { Row, Col, Card, Radio, Icon, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { CurrencyFormat } from 'common';
import styled from 'styled-components';

const { Meta } = Card;

const Wrapper = styled.div`
  margin-bottom: 2em;
  .ant-card-meta-title,
  .ant-card-meta-description,
  .ant-radio-button-wrapper .ant-radio-button-wrapper-disabled span,
  h4 {
    color: black;
  }
  h4 {
    text-align: right;
  }
  .ant-radio-button-wrapper-disabled {
    background: white;
    border-color: white;
  }
  .ant-btn-primary {
    margin-left: 0.5em;
  }
  p {
    margin: 0;
  }
`

const PriceBox = ({ price, originPrice, linethrough = false }) => {
  return (
    <h4>
      {originPrice ?
        <p style={{ textDecoration: (linethrough ? 'line-through' : '') }}>
          (<CurrencyFormat price={originPrice} />)
        </p>
        : ''}
      <p><CurrencyFormat price={price} /></p>
    </h4>
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
          <Col xs={0} sm={0} md={2} lg={2} xl={2} />
          <Col xs={24} sm={24} md={20} lg={20} xl={20}>
            <Row>
              <Col xs={24} sm={24} md={22} lg={22} xl={22} style={{ marginBottom: '1em', display: 'flex' }}>
                <Row>
                  <Col xs={22} sm={20} md={20} lg={20} xl={20}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                      <Radio.Button value="a" onClick={() => { handleListSort('name') }}>name</Radio.Button>
                      <Radio.Button value="c" onClick={() => { handleListSort('price') }}>price</Radio.Button>
                      <Radio.Button value="d" disabled><h4>{asc ? <Icon type="arrow-up" theme="outlined" /> : <Icon type="arrow-down" theme="outlined" />}</h4></Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col xs={0} sm={4} md={4} lg={4} xl={4}>
                    <Button type="primary" onClick={() => { handleCreateProduct() }}>Create</Button>
                  </Col>
                  <Col xs={2} sm={0} md={0} lg={0} xl={0}>
                    <h2><Icon type="file-add" theme="outlined" style={{ fontSize: '22px' }} onClick={() => { handleCreateProduct() }} /></h2>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={30}>
              {_list.length ? _list.map((product, index) => {
                return (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index} className="card">
                    <Link to={`/product/view/${product.no}`}>
                      <Card
                        hoverable
                        style={{ width: '100%' }}
                        cover={<Avatar shape="square" style={{ background: color[product.image], width: '100%', paddingBottom: '100%', display: 'inline-block', textAlign: 'center' }} />}
                      >
                        <Meta
                          title={product.name}
                          description={
                            <PriceBox price={product.price} originPrice={product.originPrice} linethrough={true} />
                          }
                        />
                      </Card>
                    </Link>
                  </Col>
                )
              }) : ''}
            </Row>
          </Col>
          <Col xs={0} sm={0} md={2} lg={2} xl={2} />
        </Row>
      </Wrapper>
    );
  }
}

export default ProductList;