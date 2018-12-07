import React, { Component } from 'react';
import { VisitorCharts } from 'components/dashboard';
import { DashboardWidget, DashboardTitle } from 'components/dashboard/common';
import { Row, Col, Avatar, Tag } from 'antd';
import { Language } from 'common';
import moment from 'moment';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font-size: 1.1em;
  font-weight: bold;
`
const EmployeeWrapper = styled.div`
  margin: 0.5em 0;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.5em;
  padding: 0.5em;
  .ant-tag {
    background: white;
    padding: 1em;
    line-height: 0;
  }
`
const VisitorForm = ({ number }) => {
  return (
    <Wrapper>
      <h1>{number.toLocaleString('en')}</h1>
    </Wrapper>
  )
}

const EmployeeForm = ({ member, status }) => {
  return (
    member.map((list, index) => {
      return (
        <EmployeeWrapper key={index}>
          <Row type="flex" justify="center" align="middle">
            <Col span={5} style={{ textAlign: 'center' }}><Avatar size={45} icon="user" style={{ color: 'white', backgroundColor: status[index] === 'Working' ? 'green' : 'red' }} /></Col>
            <Col span={13}>
              <h5>{list[0]}</h5>
              <h6>{moment().hour(list[1]).minute(list[2]).format('HH:mm')} - {moment().hour(list[3]).minute(list[4]).format('HH:mm')}</h6>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}><Tag><Language text={status[index]} /></Tag></Col>
          </Row>
        </EmployeeWrapper>
      )
    })
  )
}

class Visitor extends Component {
  render() {
    const {
      employeeList,
      status
    } = this.props
    let number = 1
    const Today = DashboardWidget(<VisitorForm number={290} />, 'Today', 6, false)
    const Weekly = DashboardWidget(<VisitorForm number={1300} />, 'Weekly', 6, false)
    const Monthly = DashboardWidget(<VisitorForm number={10490} />, 'Monthly', 6, false)
    const Total = DashboardWidget(<VisitorForm number={103722} />, 'Total', 6, false)
    const Employee = DashboardWidget(<EmployeeForm member={employeeList} status={status} />, 'EmployeeInfo', 12)
    const BrowserChart = DashboardWidget(<VisitorCharts option={'browser'} />, 'Browser', 8)
    const VisitorChart = DashboardWidget(<VisitorCharts option={'bar'} />, 'ThisWeekVisitors', 8)
    const VisitorComChart = DashboardWidget(<VisitorCharts option={'option'} />, 'VisitorPercentage', 8)
    return (
      [
        <DashboardTitle title={'Visitor'} key={number++} />,
        <Today key={number++} />,
        <Weekly key={number++} />,
        <Monthly key={number++} />,
        <Total key={number++} />,
        <BrowserChart key={number++} />,
        <VisitorChart key={number++} />,
        <VisitorComChart key={number++} />,
        <DashboardTitle title={'Employee'} key={number++} />,
        <Employee key={number++} />,
      ]
    );
  }
}

export default Visitor;
