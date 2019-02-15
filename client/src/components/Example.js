import React, { Component } from 'react';
import { Row, Col, Card, Icon, Tag } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import { Store } from 'context';
const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;

  h1 {
    margin-top: 1em;
    padding: 0 1em;
  }
  .ant-card-meta-title {
    height: 3em;
    white-space: normal;
  }
  .ant-card-meta-description {
    height: 5.5em;
  }
  .ant-tag-has-color {
    margin: 0.2em;
    font-size: 0.9em;
    border-radius: 1em;
  }
  .ant-card-meta-description {
    display: table-cell;
    vertical-align: middle;
  }
  .ant-card-actions {
    border-radius: 0 0 1.5em 1.5em;
  }
  .ant-card-bordered {
    border-radius: 1.5em;
  }
`

class Example extends Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Wrapper className={store.theme}>
              <Row style={{ width: '80%' }} className="ex">
                <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ margin: '2em 0' }} />
                <Col span={24}>
                  <Row style={{ textAlign: "center", marginTop: '1em' }} gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                      <Card
                        cover={<h1><Language text="NetflixExTitle" /></h1>}
                        actions={[
                          <a rel="noopener noreferrer" href="https://github.com/kdilot/react-emptybox/tree/master/client/src/components/netflix" target="_blank"><Icon type="github" theme="filled" style={{ fontSize: 30 }} /></a>,
                          <Link to="/netflix" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language text="NetflixExInfo" />}
                          description={<div>
                            <Tag color=" ">react-context</Tag>
                            <Tag color=" ">react-slick</Tag>
                            <Tag color=" ">ant-design</Tag>
                            <Tag color=" ">styled-components</Tag>
                          </div>}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                      <Card
                        cover={<h1><Language text="VtcExTitle" /></h1>}
                        actions={[
                          <a rel="noopener noreferrer" href="https://github.com/kdilot/react-emptybox/tree/master/client/src/components/vtc" target="_blank"><Icon type="github" theme="filled" style={{ fontSize: 30 }} /></a>,
                          <Link to="/vtc" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language text="VtcExInfo" />}
                          description={<div>
                            <Tag color=" ">redux</Tag>
                            <Tag color=" ">redux-saga</Tag>
                            <Tag color=" ">immutable</Tag>
                            <Tag color=" ">express</Tag>
                            <Tag color=" ">mongoDb</Tag>
                            <Tag color=" ">websocket</Tag>
                            <Tag color=" ">axios</Tag>
                            <Tag color=" ">echarts</Tag>
                            <Tag color=" ">ant-design</Tag>
                            <Tag color=" ">styled-components</Tag>
                          </div>}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                      <Card
                        cover={<h1><Language text="ProductExTitle" /></h1>}
                        actions={[
                          <a rel="noopener noreferrer" href="https://github.com/kdilot/react-emptybox/tree/master/client/src/components/product" target="_blank"><Icon type="github" theme="filled" style={{ fontSize: 30 }} /></a>,
                          <Link to="/product" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language text="ProductExInfo" />}
                          description={<div>
                            <Tag color=" ">redux</Tag>
                            <Tag color=" ">immutable</Tag>
                            <Tag color=" ">ant-design</Tag>
                            <Tag color=" ">styled-components</Tag>
                          </div>}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                      <Card
                        cover={<h1><Language text="DashboardExTitle" /></h1>}
                        actions={[
                          <a rel="noopener noreferrer" href="https://github.com/kdilot/react-emptybox/tree/master/client/src/components/dashboard" target="_blank"><Icon type="github" theme="filled" style={{ fontSize: 30 }} /></a>,
                          <Link to="/dashboard/member" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language text="DashboardExInfo" />}
                          description={<div>
                            <Tag color=" ">react HOC(widget function)</Tag>
                            <Tag color=" ">echarts</Tag>
                            <Tag color=" ">react-onclickoutside</Tag>
                            <Tag color=" ">ant-design</Tag>
                            <Tag color=" ">styled-components</Tag>
                          </div>}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Wrapper>
          )
        }}
      </Store.Consumer>
    )
  }
}

export default Example;