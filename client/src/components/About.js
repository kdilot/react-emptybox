import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import { AboutFile } from 'files';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  /* height: 100vh; */

  h1 { 
    margin-left: 0.1em;
    font-weight: bold;
    margin-bottom: 1em;
  }
  h2 {
    font-weight: bold;
  }
  h3 {
    margin: 0.5em 0;
    margin-left: 0.3em;
    font-weight: normal;
  }
  h4 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }
`
const Box = styled.div`
  padding: 1em;
  margin-bottom: 1em;
`
const Underline = styled.div`
  border: 1px solid white;
`

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Row style={{ width: '85%' }}>
          <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ marginTop: '5em' }} />
          <Col span={24}>
            <Row style={{ marginBottom: '1em' }}>
              <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                <h1>EMPLOYMENT</h1>
              </Col>
              <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                <Row>
                  <Col span={24}>
                    {AboutFile.data.employments.map(list =>
                      <Box key={list.title}>
                        <h2>{list.title}</h2>
                        <h4>{list.period}</h4>
                        {list.des.map((_list, index) =>
                          <h3 key={index}><Icon type="folder-open" theme="outlined" style={{ marginRight: '0.5em' }} />{_list}</h3>
                        )}
                        <Row>
                          {list.skills.map((_list, index) =>
                            <Col xs={12} sm={12} md={8} lg={5} xl={5} key={index}><div className="nameTag">{_list}</div></Col>
                          )}
                        </Row>
                      </Box>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={0} lg={0} xl={0}><Underline /></Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ marginBottom: '1em' }}>
              <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                <h1>EDUCATION</h1>
              </Col>
              <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                <h2>{AboutFile.data.education.title}</h2>
                <h3><Icon type="read" theme="outlined" style={{ marginRight: '0.5em' }} />{AboutFile.data.education.des}</h3>
              </Col>
              <Col xs={24} sm={24} md={0} lg={0} xl={0}><Underline /></Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ marginBottom: '5em' }}>
              <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                <h1>CONTACT</h1>
              </Col>
              <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                <h2>E-mail</h2>
                <h3><Icon type="mail" theme="outlined" style={{ marginRight: '0.5em' }} /><a href={AboutFile.data.contact.mailto}>{AboutFile.data.contact.email}</a></h3>
                <h2>Location</h2>
                <h3><Icon type="home" theme="outlined" style={{ marginRight: '0.5em' }} />{AboutFile.data.contact.location}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default About;