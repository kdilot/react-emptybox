import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import { Store } from 'context';
const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5em;

  h1 {
    margin-top: 1em;
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
                <Col span={24}>
                  <Row style={{ textAlign: "center" }} gutter={20}>
                    <Col span={6}>
                      <Card
                        cover={<h1><Language value="NetflixExTitle" /></h1>}
                        actions={[
                          <Icon type="github" theme="filled" style={{ fontSize: 30 }} />,
                          <Link to="/netflix" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language value="NetflixExInfo" />}
                          description="react-context, react-slick, react-onclickoutside, ant-design, styled-components"
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card
                        cover={<h1><Language value="VtcExTitle" /></h1>}
                        actions={[
                          <Icon type="github" theme="filled" style={{ fontSize: 30 }} />,
                          <Link to="/vtc" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title={<Language value="VtcExInfo" />}
                          description="redux, express, mongoDb, websocket, axios, recharts, ant-design, styled-components"
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
    );
  }
}

export default Example;