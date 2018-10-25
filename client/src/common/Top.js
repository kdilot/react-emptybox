import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Icon } from 'antd';
import { Language, DrawerBox } from 'common';
import { Store } from 'context';
import styled from 'styled-components';

const Wrapper = styled.div`
`

const Lang = styled.div`
  display: inline-flex;
  
  p {
    margin: 0;
    margin-right: 0.5em;
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
  position: relative;
  top: 0px;
  display: inline-flex;
  
  .box, .m-box {
    margin: 0 0.3em;
    width: 2em;
    height: 2em;
    border-radius: 5px;
  }
  .m-box {
    width: 3em;
    height: 3em;
  }
`

class Top extends Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Wrapper>
              <DrawerBox
                className={store.theme}
                title={<Language value="Menu" />}
                placement="right"
                closable={true}
                onClose={() => { store.handleDrawer('menu') }}
                visible={store.drawer.menu.visible}
                children={
                  <Row>
                    <Col span={24}>
                      <ColorBox onClick={() => { store.handleDrawer('menu') }}>
                        <p>
                          {store.color.filter(color => color.name !== store.theme).map(color =>
                            <Avatar className="m-box" key={color.name} style={{ backgroundColor: color.hex, verticalAlign: 'middle' }} size="large" onClick={() => { store.handleTheme(color.name) }} />
                          )}
                        </p>
                      </ColorBox>
                    </Col>
                    <Col span={24} style={{ borderBottom: '1px solid white', marginBottom: '1em' }}>
                    </Col>
                    <Col span={24} onClick={() => { store.handleDrawer('menu') }}>
                      <p><Link to="/?" style={{ textDecoration: 'none' }}>?</Link></p>
                      <p><Link to="/project" style={{ textDecoration: 'none' }}><Language value="Project" /></Link></p>
                      <p><Link to="/about" style={{ textDecoration: 'none' }}>About</Link></p>
                    </Col>
                  </Row>
                }
              />
              <Row style={{ textAlign: 'center' }}>
                <Col xs={5} sm={6} md={2} lg={2} xl={1} style={{ textAlign: 'left' }}>
                  <Lang>
                    <p className={store.currentLanguage === 'EN' ? 'selected' : 'la'} onClick={() => { store.handleLanguage('EN') }}>EN</p>
                    <p className={store.currentLanguage === 'KR' ? 'selected' : 'la'} onClick={() => { store.handleLanguage('KR') }}>KR</p>
                  </Lang>
                </Col>
                <Col xs={0} sm={0} md={8} lg={8} xl={9} style={{ textAlign: 'left' }}>
                  <ColorBox>
                    <p>
                      {store.color.filter(color => color.name !== store.theme).map(color =>
                        <Avatar className="box" key={color.name} style={{ backgroundColor: color.hex, verticalAlign: 'middle' }} size="large" onClick={() => { store.handleTheme(color.name) }} />
                      )}
                    </p>
                  </ColorBox>
                </Col>
                <Col xs={14} sm={12} md={4} lg={4} xl={4}>
                  <Link to="/" style={{ textDecoration: 'none' }}><h2>EmptyBox</h2></Link>
                </Col>
                <Col xs={5} sm={6} md={10} lg={10} xl={10}>
                  <Row>
                    <Col span={14} offset={10}>
                      <Row gutter={24}>
                        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                          <h2><Icon type="appstore" theme="filled" style={{ fontSize: '22px' }} onClick={() => store.handleDrawer('menu', true)} /></h2>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                          <Link to="/?" style={{ textDecoration: 'none' }}>?</Link>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                          <Link to="/project" style={{ textDecoration: 'none' }}><Language value="Project" /></Link>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                          <Link to="/about" style={{ textDecoration: 'none' }}><Language value="About" /></Link>
                        </Col>
                      </Row>
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

export default Top;