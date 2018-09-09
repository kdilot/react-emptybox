import React, { Component } from 'react';
import { Row, Col, Timeline } from 'antd';
import styled from 'styled-components';
import { AboutFile } from 'files';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5em;

  h1 { 
    margin-left: 0.1em;
    font-weight: bold;
  }
  h3 {
    margin-left: 0.5em;
    font-weight: normal;
  }

  .info {
    width: 80%;
  }
`

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Row style={{ width: '80%' }}>
          <Col span={24}>
            <Row>
              <Col span={6}>
                <h1>EMPLOYMENT</h1>
              </Col>
              <Col span={18}>
                <Row className="info">
                  <Col span={24}>
                    {AboutFile.data.employments.map(list =>
                      <Timeline key={list.title}>
                        <Timeline.Item>
                          <h1>{list.title}</h1>
                          {list.des.map((_list, index) =>
                            <h3 key={index}>{_list}</h3>
                          )}
                        </Timeline.Item>
                        <Timeline.Item>
                          <Row>
                            {list.skills.map((_list, index) =>
                              <Col span={5} key={index}><div className="nameTag">{_list}</div></Col>
                            )}
                          </Row>
                        </Timeline.Item>
                      </Timeline>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={6}>
                <h1>EDUCATION</h1>
              </Col>
              <Col span={18}>
                <h2>{AboutFile.data.education.title}</h2>
                <h3>{AboutFile.data.education.des}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default About;