import React from 'react';
import { Icon } from 'antd';

const commonStyle = {
  display: 'flex',
  background: 'black',
  width: '3%',
  height: '100%',
  zIndex: 2,
  justifyContent: 'center',
  alignItems: 'center',
}

function PrevArrow(props) {
  const { className, onClick } = props
  return (
    <div className={className} style={{
      ...commonStyle,
      marginLeft: '5px'
    }} onClick={onClick}>
    <Icon
      type="left"
      style={{ fontSize: '40px', color: 'white' }}
    />
    </div>
  )
}

function NextArrow(props) {
  const { className, onClick } = props
  return (
    <div className={className} style={{
      ...commonStyle,
      marginRight: '5px'
    }} onClick={onClick}>
      <Icon
        type="right"
        style={{ fontSize: '40px', color: 'white' }}
      />
    </div>
  )
}

export {
  PrevArrow,
  NextArrow,
}