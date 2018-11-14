import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import { Col, Breadcrumb } from 'antd';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.div`
  padding: 1em;
  background: white;
  a { color : black;}
`

const DashboardHeader = ({ pathname }) => {
  return (
    <Col span={24}>
      <BreadcrumbWrapper>
        <Breadcrumb>
          <Breadcrumb.Item ><Link to={'/dashboard'}>Home</Link></Breadcrumb.Item>
          {pathname.filter((list, index) => index > 1).map((list, index) => {
            return (
              <Breadcrumb.Item key={index}><Link to={list}><Language value={list.charAt(0).toUpperCase() + list.slice(1)} /></Link></Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </BreadcrumbWrapper>
    </Col>
  );
};

export default DashboardHeader;