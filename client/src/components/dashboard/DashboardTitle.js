import React from 'react';
import { Col } from 'antd';
import { Language } from 'common';
import styled from 'styled-components';

const Wrapper = styled.div`
  h3 {
    padding: 1em;
    padding-bottom: 0;
  }
`

const DashboardTitle = ({ title, col = 24 }) => {
  return (
    <Col span={col}>
      <Wrapper>
        <h3>
          <Language value={title} />
        </h3>
      </Wrapper>
    </Col>
  );
};

export default DashboardTitle;