import React, { Component } from 'react';
import { Row, Col, InputNumber, Tag } from 'antd';
import { CurrencyFormat, Language } from 'common';
import { LinkButton } from 'common/ButtonType';
import styled from 'styled-components';

const Wrapper = styled.div`
  h3 {margin-bottom: 0.5em}
  .ant-tag {
    margin: 0.5em;
  }
`

class ProductInfo extends Component {
  componentDidMount = () => {
    const handleResetSelectedOption = this.props.handleResetSelectedOption
    handleResetSelectedOption()
  }
  render() {
    const {
      list,
      color,
      pathname,
      optionStatus,
      productStatus,
      handleOptionDepth,
      handleSelectedOption
    } = this.props

    let _list = list.filter((data) => data.no === parseInt(pathname[3], 10))[0]
    let percentage = ''
    let percentage2 = ''
    if (_list) {
      percentage = _list.originPrice ? Math.round(((_list.originPrice - _list.price) * 100) / _list.originPrice, 2) : 0
      percentage2 = productStatus.originPrice ? Math.round(((productStatus.originPrice - productStatus.price) * 100) / productStatus.originPrice, 2) : 0
    }

    return (
      <Wrapper>
        {_list ?
          <Row>
            <Col xs={0} sm={0} md={1} lg={3} xl={3} />
            <Col xs={24} sm={24} md={22} lg={18} xl={18}>
              <Row>
                <Col span={24}>
                  <LinkButton LinkTo={`/product`} ButtonName={<Language text="Back" />} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={12} style={{ textAlign: 'center' }}>
                  <div className="thumbnail" style={{ background: color[(productStatus.image ? productStatus.image : _list.image)], border: '2px solid white', width: '80%', paddingBottom: '80%', height: '0', borderRadius: '1em' }} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={10} xl={12}>
                  <Row>
                    <Col span={24}>
                      <LinkButton LinkTo={`/product/modify/${pathname[3]}`} ButtonName={<Language text="Modify" />} />
                    </Col>
                    <Col span={24}>
                      <h1 className="text-overflow" title={_list.name}>
                        {_list.name}
                      </h1>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col xs={7} sm={5} md={4} lg={6} xl={4}><h3><Language text="Price" /> : </h3></Col>
                        <Col xs={17} sm={19} md={20} lg={18} xl={20}>
                          <h3>
                            {_list.originPrice || productStatus.originPrice ?
                              <div style={{ textDecoration: 'line-through' }}>
                                {productStatus.originPrice ? <CurrencyFormat price={productStatus.originPrice} /> : <CurrencyFormat price={_list.originPrice} />}
                              </div>
                              : ''
                            }
                            {productStatus.price ? <CurrencyFormat price={productStatus.price} /> : <CurrencyFormat price={_list.price} />} {percentage || percentage2 ? ` ( ${percentage2 ? percentage2 : percentage}% off )` : ''}
                          </h3>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col xs={7} sm={5} md={4} lg={6} xl={4}><h3><Language text="Quantity" /> : </h3></Col>
                        <Col xs={17} sm={19} md={20} lg={18} xl={20}><InputNumber min={1} max={99} defaultValue={1} /></Col>
                      </Row>
                    </Col>
                    {_list.option.length ?
                      <Col span={24}>
                        <Row>
                          <Col xs={7} sm={5} md={4} lg={6} xl={4}><h3><Language text="Option" /> : </h3></Col>
                          <Col xs={17} sm={19} md={20} lg={18} xl={20}>
                            <Col span={24}><h3>{optionStatus.name}</h3></Col>
                            {_list.option.map((opt, index) => {
                              return (
                                <Col xs={6} sm={3} md={4} lg={8} xl={4} key={index}>
                                  <div className="thumbnail" style={{ background: color[opt.image], border: '1px solid white', width: '90%', paddingBottom: '90%', height: '0', borderRadius: '1em' }} onClick={() => { handleOptionDepth(opt) }} />
                                </Col>
                              )
                            })}
                          </Col>
                        </Row>
                      </Col>
                      : ''}
                    {Object.keys(optionStatus.depth[0]).length ?
                      <Col span={24}>
                        <Row>
                          {Object.keys(optionStatus.depth[0].option).length ?
                            <Col xs={7} sm={5} md={4} lg={6} xl={4}><h3>{optionStatus.depth[0].name} : </h3></Col>
                            : ''}
                          <Col xs={17} sm={19} md={20} lg={18} xl={20}>
                            <div>
                              {optionStatus.depth[0].option.map((opt, index) => {
                                return (
                                  <Tag className={index === optionStatus.selected[0] ? 'selected' : ''} color=" " key={index} onClick={() => { handleOptionDepth(opt, index, 1) }}>{opt.name}</Tag>
                                )
                              })}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      : ''}
                    {Object.keys(optionStatus.depth[1]).length ?
                      <Col span={24}>
                        <Row>
                          {Object.keys(optionStatus.depth[1].option).length ?
                            <Col xs={7} sm={5} md={4} lg={6} xl={4}><h3>{optionStatus.depth[1].name} : </h3></Col>
                            : ''}
                          <Col xs={17} sm={19} md={20} lg={18} xl={20}>
                            <div>
                              {optionStatus.depth[1].option.map((opt, index) => {
                                return (
                                  <Tag className={index === optionStatus.selected[1] ? 'selected' : ''} color=" " key={index} onClick={() => { handleSelectedOption(index, 2) }}>{opt.name}</Tag>
                                )
                              })}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      : ''}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={24} style={{ padding: '1em' }}>
                      <h1 style={{ textAlign: 'center' }}><Language text="Description" /></h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ padding: '1em' }}>
                      <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: _list.description }} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={0} sm={0} md={1} lg={3} xl={3} />
          </Row>
          :
          <Row style={{ textAlign: 'center' }}>
            <Col span={24}>
              <h1><Language text="IncorrectPage" /></h1>
            </Col>
          </Row>
        }
      </Wrapper>
    );
  }
}

export default ProductInfo;