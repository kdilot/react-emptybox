import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button } from 'antd';
import styled from 'styled-components';
import { Language } from 'common';
import { LinkButton, AddButton } from 'common/ButtonType';
const { TextArea } = Input;

const Wrapper = styled.div`
  .ant-input, .ant-input-number {
    margin: 0.5em 0;
  }
  h3 {
    text-align: center;
  }
  button {
    margin-right: 1em;
  }
`
const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  .anticon {
    margin: 0 0.5em;
  }
`

const OptionBox = ({ value, arrow = true, event, change, focus, blur }) => {
  return (
    <OptionWrapper>
      <Input defaultValue={value} onChange={change} onFocus={focus} onBlur={blur} />
      <Icon type="minus-circle" style={{ fontSize: '1.5em' }} theme="outlined" onClick={event} />
      {arrow ? <Icon type="arrow-right" theme="outlined" /> : ''}
    </OptionWrapper>
  )
}

const InformationWrapper = ({ title, children }) => {
  return (
    <Col span={24}>
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={8} sm={8} md={5} lg={5} xl={5}>
          <h3>{title}</h3>
        </Col>
        <Col xs={16} sm={16} md={19} lg={19} xl={19}>
          {children}
        </Col>
      </Row>
    </Col>
  )
}

class ProductForm extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.list !== this.props.list
  }

  render() {
    const {
      list,
      pathname,
      handleRemoveOption,
      handleModifyProduct,
      handleAddOption,
      handleProductRemove
    } = this.props

    let _list = list.filter((data) => data.no === parseInt(pathname[3], 10))[0]

    return (
      <Wrapper>
        <Row>
          <Col xs={0} sm={0} md={2} lg={6} xl={7} />
          <Col xs={24} sm={24} md={20} lg={12} xl={10}>
            <Row>
              <Col span={24}>
                <LinkButton LinkTo={`/product/view/${pathname[3]}`} ButtonName={<Language value="Back" />} />
                <LinkButton LinkTo={`/product`} click={() => { handleProductRemove(pathname[3]) }} ButtonName={<Language value="Remove" />} />
              </Col>
              <InformationWrapper
                title={<Language value="Name" />}
                children={
                  <Input style={{ width: '100%' }} defaultValue={_list.name ? _list.name : ''} onBlur={(e) => { handleModifyProduct('product', null, null, 'name', e.target.value) }} />
                }
              />
              <InformationWrapper
                title={<Language value="OriginPrice" />}
                children={
                  <Input type="number" defaultValue={_list.originPrice} onBlur={(e) => { handleModifyProduct('product', null, null, 'originPrice', e.target.value) }} />
                }
              />
              <InformationWrapper
                title={<Language value="Price" />}
                children={
                  <Input type="number" defaultValue={_list.price} onBlur={(e) => { handleModifyProduct('product', null, null, 'price', e.target.value) }} />
                }
              />

              <InformationWrapper
                title={<Language value="Option" />}
                children={
                  <AddButton click={() => { handleAddOption('new') }} />
                }
              />
              {_list.option.length ?
                <Col span={24} style={{ paddingLeft: '2em' }}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                      {_list.option.map((opt, index) => {
                        return (
                          <Row key={index} style={{ marginBottom: '2em' }}>
                            <InformationWrapper
                              title={<Language value="Name" />}
                              children={
                                <OptionWrapper>
                                  <Input style={{ width: '50%' }} defaultValue={opt.name} onBlur={(e) => { handleModifyProduct('option', index, null, 'name', e.target.value) }} />
                                  <Icon type="minus-circle" style={{ fontSize: '1.5em' }} theme="outlined" onClick={() => { handleRemoveOption('top', index) }} />
                                </OptionWrapper>
                              }
                            />
                            <InformationWrapper
                              title={<Language value="OriginPrice" />}
                              children={
                                <Input type="number" defaultValue={opt.originPrice} onBlur={(e) => { handleModifyProduct('option', index, null, 'originPrice', e.target.value) }} />
                              }
                            />
                            <InformationWrapper
                              title={<Language value="Price" />}
                              children={
                                <Input type="number" defaultValue={opt.price} onBlur={(e) => { handleModifyProduct('option', index, null, 'price', e.target.value) }} />
                              }
                            />
                            {Object.keys(opt.depth).length ?
                              <div>
                                <Col xs={{ span: 14, offset: 2 }} sm={{ span: 14, offset: 2 }} md={{ span: 6, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                                  <OptionBox value={opt.depth.name} event={() => { handleRemoveOption(0, index) }} blur={(e) => { handleModifyProduct('option', index, 'depth', 'name', e.target.value) }} />
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                  {Object.keys(opt.depth.option).length ?
                                    opt.depth.option.map((depth1, index1) => {
                                      return (
                                        <div key={index1}>
                                          <Col xs={{ span: 14, offset: 4 }} sm={{ span: 14, offset: 4 }} md={{ span: 8, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }}>
                                            <OptionBox value={depth1.name} event={() => { handleRemoveOption(1, index, index1) }} blur={(e) => { handleModifyProduct('option', index, index1, 'name', e.target.value) }} />
                                          </Col>
                                          {Object.keys(depth1.depth).length ?
                                            <div>
                                              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                                <Col xs={{ span: 14, offset: 6 }} sm={{ span: 14, offset: 6 }} md={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} xl={{ span: 12, offset: 0 }}>
                                                  <OptionBox value={depth1.depth.name} event={() => { handleRemoveOption(2, index, [index1]) }} blur={(e) => { handleModifyProduct('option', index, [index1], 'name', e.target.value) }} />
                                                </Col>
                                                <Col xs={{ span: 14, offset: 8 }} sm={{ span: 14, offset: 8 }} md={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} xl={{ span: 12, offset: 0 }}>
                                                  {Object.keys(depth1.depth).length ?
                                                    depth1.depth.option.map((depth2, index2) => {
                                                      return (
                                                        <OptionBox key={index2} value={depth2.name} arrow={false} event={() => { handleRemoveOption(2, index, [index1, index2]) }} blur={(e) => { handleModifyProduct('option', index, [index1, index2], 'name', e.target.value) }} />
                                                      )
                                                    })
                                                    : ''}
                                                  <AddButton click={() => { handleAddOption(2, index, index1) }} />
                                                </Col>
                                              </Col>
                                            </div>
                                            : <Col xs={{ span: 24, offset: 6 }} sm={{ span: 24, offset: 6 }} md={{ span: 16, offset: 0 }} lg={{ span: 16, offset: 0 }} xl={{ span: 16, offset: 0 }}><div style={{ display: 'flex' }}><AddButton click={() => { handleAddOption(1, index, index1) }} /></div></Col>}
                                        </div>
                                      )
                                    })
                                    : ''}
                                  <Col xs={{ span: 24, offset: 4 }} sm={{ span: 24, offset: 4 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }}><AddButton click={() => { handleAddOption(0, index) }} /></Col>
                                </Col>
                              </div>
                              :
                              <InformationWrapper
                                title={<Language value="OptionDepth" />}
                                children={
                                  <AddButton click={() => { handleAddOption(null, index) }} />
                                }
                              />
                            }
                          </Row>
                        )
                      })}
                    </Col>
                  </Row>
                </Col>
                : ''
              }
              <InformationWrapper
                title={<Language value="Description" />}
                children={
                  <TextArea rows={10} style={{ width: '100%', margin: 0 }} defaultValue={_list.description ? _list.description : ''} onBlur={(e) => { handleModifyProduct('product', null, null, 'description', e.target.value) }} />
                }
              />
              <Col span={24} style={{ marginTop: '1em' }}>
                <LinkButton LinkTo={`/product/view/${pathname[3]}`} ButtonName={<Language value="Back" />} />
                <LinkButton LinkTo={`/product`} click={() => { handleProductRemove(pathname[3]) }} ButtonName={<Language value="Remove" />} />
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={2} lg={6} xl={7} />
        </Row>
      </Wrapper >
    );
  }
}

export default ProductForm;