import React from 'react';
import { Drawer } from 'antd';

const DrawerBox = ({ className, title, placement, closable, onClose, visible, children }) => {
  return (
    <Drawer
      className={className}
      title={title}
      placement={placement}
      closable={closable}
      onClose={onClose}
      visible={visible}
    >
      {children}
    </Drawer>
  )
}

export default DrawerBox;