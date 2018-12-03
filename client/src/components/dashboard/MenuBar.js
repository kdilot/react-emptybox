import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import { Menu, Icon, Layout } from 'antd';
import onClickOutside from "react-onclickoutside";
import PropTypes from 'prop-types';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
class MenuBar extends Component {

  handleClickOutside = evt => {
    if (window.innerWidth <= 576) {
      this.setState(
        { visibility: true },
        this.props.changeMenuVisibility(false)
      )
    }
  }

  onCollapse = (flag) => {
    const { visibility } = this.state
    this.setState(
      { visibility: flag },
      this.props.changeMenuVisibility(visibility)
    )
  }

  state = {
    visibility: false,
    handleClickOutside: this.handleClickOutside,
    onCollapse: this.onCollapse,
  }

  render() {
    const {
      visibility,
      onCollapse
    } = this.state
    const pathname = this.props.location.pathname.split('/')
    const key = pathname[pathname.length - 1]
    return (
      <Sider
        style={{ zIndex: 2 }}
        breakpoint="sm"
        collapsedWidth="0"
        collapsed={visibility}
        onCollapse={onCollapse}
      >
        <Menu
          defaultSelectedKeys={[key]}
          defaultOpenKeys={[pathname.length === 4 ? 'shopping' : '']}
          mode="inline"
          theme="dark"
          inlineCollapsed={'menu-unfold'}
        >
          <Menu.Item key="member">
            <Link to={'/dashboard/member'}>
              <Icon type="team" />
              <span><Language value="Member" /></span>
            </Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to={'/dashboard/account'}>
              <Icon type="bank" />
              <span><Language value="Account" /></span>
            </Link>
          </Menu.Item>
          <Menu.Item key="schedule">
            <Link to={'/dashboard/schedule'}>
              <Icon type="calendar" />
              <span><Language value="Schedule" /></span>
            </Link>
          </Menu.Item>
          <SubMenu key="shopping" title={<span><Icon type="shopping-cart" /><span><Language value="Shopping" /></span></span>}>
            <Menu.Item key="product">
              <Link to={'/dashboard/shopping/product'}>
                <Icon type="skin" />
                <span><Language value="Product" /></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="shipping">
              <Link to={'/dashboard/shopping/shipping'}>
                <Icon type="rocket" />
                <span><Language value="Shipping" /></span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="login">
            <Link to={'/dashboard/login'}>
              <Icon type="calendar" />
              <span><Language value="Login" /></span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default onClickOutside(MenuBar);

MenuBar.propTypes = {
  visibility: PropTypes.bool,
  onCollapse: PropTypes.func,
  handleClickOutside: PropTypes.func,
}