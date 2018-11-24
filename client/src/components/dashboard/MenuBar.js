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
    return (
      <Sider
        style={{ zIndex: 2 }}
        breakpoint="sm"
        collapsedWidth="0"
        collapsed={visibility}
        onCollapse={onCollapse}
      >
        <Menu
          defaultSelectedKeys={[this.props.location.pathname.split('/')[2]]}
          defaultOpenKeys={[this.props.location.pathname.split('/')[2]]}
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
          <Menu.Item key="product">
            <Link to={'/dashboard/product'}>
              <Icon type="shopping-cart" />
              <span><Language value="Product" /></span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
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