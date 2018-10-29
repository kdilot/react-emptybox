import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from 'modules/product';
import { ProductInfo, ProductForm, ProductList } from 'components/product';
import { Row, Col } from 'antd';
import styled from 'styled-components';

// import PropTypes from 'prop-types';


const Wrapper = styled.div`
  display: flex;
  text-align: 'center';
  justify-content: center;
  width: 100vw;
  margin-top: 2em;
  padding: 2em;

  .style {
    width: 100%;
    text-align: 'center'
  }
  h1 { margin-bottom: 1em}
  h3 {
    /* margin-bottom: 0.7em; */
    /* font-size: 1.5em; */
  }
  .thumbnail {
    margin: 1em 0;
    display: inline-block;
  }
  .selected {
    border-color: white;
  }
`

class ProductContainer extends Component {

  handleOptionDepth = (opt, name, dpt = 0) => {
    const { ProductActions } = this.props
    const array = Object.assign({ index: dpt }, opt)
    ProductActions.optionDepth(array)
    if (name) this.handleSelectedOption(name, dpt)
  }

  handleSelectedOption = (name, dpt = 0) => {
    const { ProductActions } = this.props
    ProductActions.selectedOption({ name: name, index: dpt })
  }

  handleListSort = (type) => {
    const { ProductActions } = this.props
    ProductActions.changeSort(type)
  }

  handleRemoveOption = (type, index, depth) => {
    const { ProductActions } = this.props
    const pathname = this.props.location.pathname.split('/')
    ProductActions.removeOption({ product: pathname[3], type, index, depth })
  }

  handleModifyProduct = (type, index, depth, name, e, number) => {
    const { ProductActions } = this.props
    const pathname = this.props.location.pathname.split('/')
    ProductActions.modifyProduct({ product: pathname[3], type, index, depth, name, value: number ? e : e.target.value })
  }

  handleAddOption = (type, index, depth) => {
    const { ProductActions } = this.props
    const pathname = this.props.location.pathname.split('/')
    ProductActions.addOption({ product: pathname[3], type, index, depth })
  }

  handleCreateProduct = () => {
    const { ProductActions } = this.props
    ProductActions.createProduct()
  }

  handleProductRemove = (index) => {
    const { ProductActions } = this.props
    ProductActions.removeProduct({ index })
  }

  handleResetSelectedOption = () => {
    const { ProductActions } = this.props
    ProductActions.resetSelectedOption()
  }

  constructor(props) {
    super(props)

    this.state = {
      handleListSort: this.handleListSort,
      handleSelectedOption: this.handleSelectedOption,
      handleOptionDepth: this.handleOptionDepth,
      handleAddOption: this.handleAddOption,
      handleRemoveOption: this.handleRemoveOption,
      handleCreateProduct: this.handleCreateProduct,
      handleModifyProduct: this.handleModifyProduct,
      handleProductRemove: this.handleProductRemove,
      handleResetSelectedOption: this.handleResetSelectedOption,
    }
  }
  render() {
    const {
      handleListSort,
      handleSelectedOption,
      handleOptionDepth,
      handleAddOption,
      handleRemoveOption,
      handleCreateProduct,
      handleModifyProduct,
      handleProductRemove,
      handleResetSelectedOption,
    } = this.state

    const product = this.props.product
    const pathname = this.props.location.pathname.split('/')
    return (
      <Wrapper>
        <Row style={{ width: '100%' }}>
          <Col span={24}>
            {pathname[2] ?
              pathname[2] === 'modify' ?
                <ProductForm
                  list={product.get('list').toJS()}
                  handleRemoveOption={handleRemoveOption}
                  handleModifyProduct={handleModifyProduct}
                  handleAddOption={handleAddOption}
                  handleProductRemove={handleProductRemove}
                  pathname={pathname}
                />
                :
                <ProductInfo
                  handleOptionDepth={handleOptionDepth}
                  handleSelectedOption={handleSelectedOption}
                  handleResetSelectedOption={handleResetSelectedOption}
                  list={product.get('list').toJS()}
                  optionStatus={product.get('optionStatus').toJS()}
                  productStatus={product.get('productStatus').toJS()}
                  pathname={pathname}
                />
              :
              <ProductList
                list={product.get('list').toJS()}
                sort={product.get('sort')}
                asc={product.get('asc')}
                handleListSort={handleListSort}
                handleCreateProduct={handleCreateProduct}
              />
            }
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default connect(
  (state) => ({
    product: state.product,
  }),
  (dispatch) => ({
    ProductActions: bindActionCreators(productActions, dispatch),
  })
)(ProductContainer)