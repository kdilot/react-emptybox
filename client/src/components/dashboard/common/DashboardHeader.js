import React, { Component } from 'react';
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
            <Breadcrumb.Item ><Language text='Dashboard' /></Breadcrumb.Item>
            {pathname.filter((_list, index) => index > 1).map((list, index) => {
              return (
                <Breadcrumb.Item key={index}><Language text={list.charAt(0).toUpperCase() + list.slice(1)} /></Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
        </BreadcrumbWrapper>
      </Col>
    );
  };
}
export default DashboardHeader;
