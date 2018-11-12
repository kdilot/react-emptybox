import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { DashboardWidget, Visitor } from 'components/dashboard';
import { Row, Col, Menu, Icon, Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Wrapper = styled.div`
  width: 100%;
  h1,h2,h3,h4,h5,h6 {
    color: black;
  }
  .ant-layout-sider-zero-width-trigger {
    z-index: 1;
  }
  .ant-menu-item > a, .ant-menu-item {
    color: rgba(255, 255, 255, 1);
    margin: 0;
  }
`
const BreadcrumbWrapper = styled.div`
  padding: 1em;
  background: white;
  a { color : black;}
`
const Widget1 = DashboardWidget('TEST', 'widget1', 24)
const Widget2 = DashboardWidget('TEST widget2', 'widget2', 8)

const Today = DashboardWidget(<Visitor number={290} />, 'today', 6, false)
const Weekly = DashboardWidget(<Visitor number={1300} />, 'weekly', 6, false)
const Monthly = DashboardWidget(<Visitor number={10490} />, 'monthly', 6, false)
const Total = DashboardWidget(<Visitor number={48300} />, 'total', 6, false)
const VisitorGroup = () => {
  return (
    [
      <Today />,
      <Weekly />,
      <Monthly />,
      <Total />,
    ]
  )
}

class DashboardContainer extends Component {
  render() {
    const pathname = this.props.location.pathname.split('/')
    return (
      <Wrapper>
        <Layout style={{ height: '100%' }}>
          <Sider
            breakpoint="sm"
            collapsedWidth="0"
          >
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={'menu-unfold'}
            >
              <Menu.Item key="1">
                <Link to={'/dashboard'}>
                  <Icon type="notification" />
                  <span>Intro</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/dashboard/widget2'}>
                  <Icon type="team" />
                  <span>Widget2</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="inbox" />
                <span>Option 3</span>
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
          <Layout>
            <Content>
              <Row type="flex" align="top">
                <Col span={24}>
                  <BreadcrumbWrapper>
                    <Breadcrumb>
                      <Breadcrumb.Item ><Link to={'/dashboard'}>Home</Link></Breadcrumb.Item>
                      {pathname.filter((list, index) => index > 1).map((list, index) => {
                        return (
                          <Breadcrumb.Item key={index}><Link to={list}>{list}</Link></Breadcrumb.Item>
                        )
                      })}
                    </Breadcrumb>
                  </BreadcrumbWrapper>
                </Col>
                <Route exact path='/dashboard' component={VisitorGroup} />
                <Route path='/dashboard/widget1' component={Widget1} />
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Wrapper >
    )
  }
}

export default DashboardContainer;