import React, { Component } from 'react';
import { Language } from 'common';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import Clock from 'react-live-clock';
import { Store } from 'context';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-bottom: 4em;

  h1 { 
    font-size: 4.5em; 
    font-weight: bold;
  }
  h2 {
    font-size: 1.3em;
    padding: 1em;
  }
  h3 {
    padding: 0.2em;
  }
  a {
    margin: 0 0.5em;
  }
`

class Introduce extends Component {
  state = {
    skills: [
      'React JS',
      'Node JS',
      'Redux',
      'Express',
      'MariaDB',
      'MongoDB',
      'Axios',
    ]
  }
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Wrapper>
              <Row style={{ textAlign: 'center', width: '100%' }}>
                <Col span={24}>
                  <h1>
                    <Clock
                      format={'HH:mm:ss'}
                      ticking={true}
                    />
                  </h1>
                </Col>
                <Col span={24}>
                  <Row type="flex" justify="center">
                    {this.state.skills.map((list, index) => <Col xs={11} sm={6} md={3} lg={2} xl={2} key={index} className="nameTag">{list}</Col>)}
                  </Row>
                </Col>
                <Col span={24}>
                  <h2>
                    <Icon type="github" theme="outlined" />
                    <a rel="noopener noreferrer" href="https://github.com/kdilot" target="_blank">https://github.com/kdilot</a>
                  </h2>
                  <h3><Language text={'IntroMsg'} /></h3>
                </Col>
              </Row>
            </Wrapper>
          )
        }}
      </Store.Consumer>
    )
  }
}

export default Introduce;