import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar } from 'antd';
import { Language } from 'common';
import { Store } from 'context';
import styled from 'styled-components';

const Lang = styled.div`
  display: inline-flex;
  
  p {
    margin: 0;
    padding: 0 0.3em;
    cursor: pointer;
  }

  p.title { 
    padding: 0 ;
    cursor: text;
  }
  p.selected { font-weight: bolder }
`
const ColorBox = styled.div`
  display: inline-flex;
  
  .box {
    margin: 0 0.3em;
    width: 2em;
    height: 2em;
    border-radius: 5px;
  }
`

class Top extends Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Row style={{ textAlign: 'center' }}>
              <Col span={8} style={{ textAlign: 'left' }}>
                <Lang>
                  <p className={store.currentLanguage === 'EN' ? 'selected' : 'la'} onClick={() => { store.handleLanguage('EN') }}>EN</p>
                  <p className={store.currentLanguage === 'KR' ? 'selected' : 'la'} onClick={() => { store.handleLanguage('KR') }}>KR</p>
                </Lang>
                <ColorBox>
                  <p>
                    {store.color.filter(color => color.name !== store.theme).map(color =>
                      <Avatar className="box" key={color.name} style={{ backgroundColor: color.hex, verticalAlign: 'middle' }} size="large" onClick={() => { store.handleTheme(color.name) }} />
                    )}
                  </p>
                </ColorBox>
              </Col>
              <Col span={8}>
                <Link to="/" style={{ textDecoration: 'none' }}><h2>Front-end Developer</h2></Link>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={14} offset={10}>
                    <Row gutter={24}>
                      <Col span={8}>
                        <Link to="/?" style={{ textDecoration: 'none' }}>?</Link>
                      </Col>
                      <Col span={8}>
                        <Link to="/example" style={{ textDecoration: 'none' }}><Language value="Example" /></Link>
                      </Col>
                      <Col span={8}>
                        <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }}
      </Store.Consumer>
    );
  }
}

export default Top;