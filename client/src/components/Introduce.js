import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import Clock from 'react-live-clock';

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
    padding: 1em;
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
      'Express',
      'Mysql',
      'MariaDB',
      'Axios',
      'GraphQL'
    ]
  }
  render() {
    return (
      <Wrapper>
        <Row>
          <Col span={24}>
            <h1>
              <Clock
                format={'HH:mm:ss'}
                ticking={true}
              />
            </h1>
          </Col>
        </Row>
        <Row gutter={5} style={{ display: 'flex', justifyContent: 'center', width: '80vw' }}>
          {this.state.skills.map((list, index) => <Col span={2} key={index} className="nameTag">{list}</Col>)}
        </Row>
        <Row>
          <Col span={24}>
            <h2>
              <Icon type="github" theme="outlined" />
              <a rel="noopener noreferrer" href="https://github.com/kdilot" target="_blank">https://github.com/kdilot</a>
            </h2>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Introduce;