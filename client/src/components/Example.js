import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Store from 'context/store';
const { Meta } = Card;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5em;

  h1 {
    color: black;
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
                        cover={<h1>Netflix Clone</h1>}
                        actions={[
                          <Icon type="github" theme="filled" style={{ fontSize: 30 }} />,
                          <Link to="/netflix" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title="Clone Coding"
                          description="react-context, react-slick, react-onclickoutside, ant-design, styled-components"
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card
                        cover={<h1>Income Management</h1>}
                        actions={[
                          <Icon type="github" theme="filled" style={{ fontSize: 30 }} />,
                          <Link to="#" style={{ textDecoration: 'none' }}><Icon type="play-circle" theme="filled" style={{ fontSize: 30 }} /></Link>
                        ]}
                      >
                        <Meta
                          title="Income management with category and chart"
                          description="react-context, axios, recharts, ant-design, styled-components"
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