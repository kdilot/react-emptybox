import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Avatar } from 'antd';
import { Language } from 'common';
import { Netflix } from 'context';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: black;

  h1 {
    color: white;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  .group {
    display: flex;
  }
`
const ProfileBadge = styled.div`
  :hover p {
    opacity: 1
  }
  :hover .icon {
    border: 5px solid white;
  }
  .icon {
    font-size: 100px;
  }
  p {
    margin-top: 0.3em;
    padding: 0;
    text-align: center;
    font-size: 1.2em;
    opacity: 0.3;
  }
`

class Profile extends Component {
  render() {
    return (
      <Netflix.Consumer>
        {net => {
          const web = net.web
          return (
            <Wrapper>
              <Row style={{ textAlign: 'center', width: '100%' }}>
                <Col span={24}>
                  <h1><Language value="WhosWatching" /></h1>
                </Col>
                <Col span={24}>
                  <Row type="flex" justify="center">
                    {net.user.map((list, index) =>
                      <Col span={web ? 2 : 6} key={list.name}>
                        <ProfileBadge onClick={() => { net.changeProfile(index) }}>
                          <Avatar shape="square" size={web ? 100 : 50} className="icon" icon="user" style={{ backgroundColor: list.color }} />
                          <p>{list.name}</p>
                        </ProfileBadge>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Wrapper>
          )
        }}
      </Netflix.Consumer>

    );
  }
}

export default Profile;