import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

const LinkButton = ({ LinkTo, click, ButtonName }) => {
  return (
    <Link to={LinkTo}>
      <Button type="primary" onClick={click}>{ButtonName}</Button>
    </Link>
  )
}

const AddButton = ({ click }) => {
  return (
    <Button type="dashed" onClick={click} style={{ margin: '0.5em 0' }}>
      <Icon type="plus" /> Add field
    </Button>
  )
}

export {
  LinkButton,
  AddButton
}