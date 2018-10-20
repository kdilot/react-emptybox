import React, { Component } from 'react';
import { Row, Col, Avatar, Icon } from 'antd';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Language } from 'common';
import { Netflix } from 'context'

const Wrapper = styled.div`
  .fade-enter {
    transform: translateX(50%);
  }
  .fade-enter-active {
    transform: translateX(0%);
    transition: all 200ms ease-out;
  }
  .fade-exit {
    transform: translateX(-30%);
  }
  .fade-exit-active {
    transform: translateX(0%);
    transition: all 200ms ease-out;
  }
  .selected {
    border-left: 0.4em solid red;
    font-weight: bold;
    padding-left: 1.2em;
  }
`
const Content = styled.div`
  padding: 1em 1.5em;
  border-bottom: 2px solid black;
  display: flex;
  color: white;
  vertical-align: center;

  h3 {
    color: white;
    margin: auto 0;
    margin-left: 1em;
    font-size: 1.5em;
  }

  h2 {
    color: white;
    margin: auto 0;
    font-size: 1.3em;
    font-weight: normal;
  }

  h2.h2-lf {
    width: 100vw;
    text-align: center;
  }

  .header-icon {
    position: absolute;
    right: 0.5em;
    margin-top: 0.6em;
  }

  .icon {
    position: absolute;
    right: 0.5em;
    margin-top: 0.3em;
  }
  
  .icon-lf {
    position: absolute;
    left: 0.5em;
    margin-top: 0.3em;
  }
`
const List = styled.div`
  padding: 1em 1.5em;
  color: white;

  p {
    padding: 0;
    margin: 0;
    font-size: 1.3em;
  }

  :hover {
    background: #404040;
  }
`
const OptionList = styled.div`
  padding: 0.5em 1.5em;
  display: flex;

  .img {
    display: flex;
    width: 30%;
    height: 3em;
    background: white;
  }

  p {
    display: flex;
    width: 70%;
    padding: 0;
    margin: 0;
    margin-left: 5px;
    word-break: break-all;  
    white-space: nowrap;
    overflow: hidden;
    font-weight: normal;
    font-size: 1em;
  }
`

class SideMenu extends Component {
  render() {
    return (
      <Netflix.Consumer>
        {net => {
          return (
            <Wrapper>
              <CSSTransition
                in={!net.display.sideMenu}
                classNames="fade"
                timeout={200}>
                <div>
                  <div style={{ display: net.display.sideMenu ? 'block' : 'none' }}>
                    <Content onClick={net.handleProfile}>
                      <Avatar shape="square" size={50} icon="user" style={{ backgroundColor: net.user[net.currentUser].color }} />
                      <h3>{net.user[net.currentUser].name}</h3>
                      <Icon type="swap" className="header-icon" style={{ fontSize: 24 }} />
                    </Content>
                    <Content onClick={net.handleSideMenu}>
                      <h2><Language value="Notifications" /></h2>
                      <Icon type="right" className="icon" style={{ fontSize: 20 }} />
                    </Content>
                    <List className={net.menuSelected === 'Home' ? 'selected' : ''} onClick={() => { net.handleMenu('Home') }}><p><Language value="Home" /></p></List>
                    <List className={net.menuSelected === 'Action' ? 'selected' : ''} onClick={() => { net.handleMenu('Action') }}><p><Language value="Action" /></p></List>
                    <List className={net.menuSelected === 'Adventure' ? 'selected' : ''} onClick={() => { net.handleMenu('Adventure') }}><p><Language value="Adventure" /></p></List>
                    <List className={net.menuSelected === 'Animation' ? 'selected' : ''} onClick={() => { net.handleMenu('Animation') }}><p><Language value="Animation" /></p></List>
                    <List className={net.menuSelected === 'Drama' ? 'selected' : ''} onClick={() => { net.handleMenu('Drama') }}><p><Language value="Drama" /></p></List>
                    <List className={net.menuSelected === 'Horror' ? 'selected' : ''} onClick={() => { net.handleMenu('Horror') }}><p><Language value="Horror" /></p></List>
                  </div>
                  <div style={{ display: !net.display.sideMenu ? 'block' : 'none' }}>
                    <Content onClick={net.handleSideMenu}>
                      <Row type="flex" justify="center" style={{ width: '100%', textAlign: 'center' }}>
                        <Col span={1}>
                          <Icon type="left" style={{ fontSize: '1.3em', marginTop: '0.2em', verticalAlign: 'middle' }} />
                        </Col>
                        <Col span={22}>
                          <h2><Language value="Notifications" /></h2>
                        </Col>
                        <Col span={1}></Col>
                      </Row>
                    </Content>
                    {net.movieList.all.filter(_children => _children.backdrop_path).slice(0, 15).map(children => {
                      return (
                        <OptionList key={children.title} onClick={() => { net.handleMovieModal(children) }}>
                          <div className="img"><img alt={children.title} style={{ width: '100%' }} src={net.imgSize.small + children.backdrop_path} /></div>
                          <p>
                            <Language value="SuggestionForYou" />
                            <br />
                            {children.title}
                          </p>
                        </OptionList>
                      )
                    })}
                  </div>
                </div>
              </CSSTransition>
            </Wrapper>
          )
        }}
      </Netflix.Consumer>
    )
  }
}

export default SideMenu;