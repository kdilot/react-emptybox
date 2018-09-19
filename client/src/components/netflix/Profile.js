import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
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
    margin-bottom: 3em;
  }
  .group {
    display: flex;
  }
`
const ProfileBadge = styled.div`
  margin: 2em;
  margin-bottom: 15em;

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
          return (
            <Wrapper >
              <h1><Language value="WhosWatching" /></h1>
              <div className="group">
                {net.user.map((list, index) =>
                  <ProfileBadge key={list.name} onClick={() => { net.changeProfile(index) }}>
                    <Avatar shape="square" size={100} className="icon" icon="user" style={{ backgroundColor: list.color }} />
                    <p>{list.name}</p>
                  </ProfileBadge>
                )}
              </div>
            </Wrapper>
          )
        }}
      </Netflix.Consumer>

    );
  }
}

export default Profile;