import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: auto;
  background-color: rgba(0,0,0, 0.9);
`

const Modal = ({ display, children, zIndex }) => {
  return (
    <Wrapper style={{ display: display, zIndex: zIndex ? zIndex : 100 }}>
      {children}
    </Wrapper>
  );
};

export default Modal;