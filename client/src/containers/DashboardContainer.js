import React, { Component } from 'react';
import { DashboardWidget } from 'components/dashboard';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1em;
`
const Widget1 = DashboardWidget('TEST', 'widget1', 24)
const Widget2 = DashboardWidget('TEST widget2', 'widget2', 8)

class DashboardContainer extends Component {
  render() {
    return (
      <Wrapper>
        <Row>
          <Widget1 />
          <Widget2 />
          <Widget2 />
          <Widget2 />
          <Widget2 />
          <Widget2 />
        </Row>
      </Wrapper>
    )
  }
}

export default DashboardContainer;