import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import { Col, Breadcrumb } from 'antd';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.div`
  padding: 1em;
  background: white;
  a { color : black;}
  span { color : rgba(0, 0, 0, 0.65) }
`

class DashboardHeader extends Component {
  render() {
  const pathname = this.props.location.pathname.split('/')
  return (
    <Col span={24}>
      <BreadcrumbWrapper>
        <Breadcrumb>
          <Breadcrumb.Item >Dashboard</Breadcrumb.Item>
          {pathname.filter((list, index) => index > 1).map((list, index) => {
            return (
              <Breadcrumb.Item key={index}><Link to={list}><Language value={list.charAt(0).toUpperCase() + list.slice(1)} /></Link></Breadcrumb.Item>
              // <Breadcrumb.Item key={index}><Language value={list.charAt(0).toUpperCase() + list.slice(1)} /></Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </BreadcrumbWrapper>
    </Col>
  );
};
}
export default DashboardHeader;
