import React, { Component } from 'react';
import { DashboardWidget } from 'components/dashboard/common';
import { Language } from 'common';
import { Calendar, Row, Col, Input, Tooltip, Button, List, Tag, DatePicker, Icon } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Search = Input.Search
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 2em;
  .ant-tag,
  .ant-calendar-picker-icon,
  .ant-select-selection-selected-value {
    color: white;
  }
  .ant-radio-group-default, .ant-radio-group-small {
    display: none;
  }
  p {
    display: inline;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`
let time = moment().hour(0).minute(0)
const CalendarForm = ({ selectedDate, onPanelChange, dateCellRender }) => {
  return (
    <Calendar value={selectedDate ? selectedDate : moment()} dateCellRender={dateCellRender} onChange={onPanelChange} onPanelChange={onPanelChange} />
  )
}

const SearchForm = ({ timeChange, addSchedule }) => {
  return (
    <Col span={24}>
      <Col xs={12} sm={12} md={12} lg={6} xl={4}>
        <DatePicker
          format="MM/DD/YYYY HH:mm"
          placeholder="Select Time"
          showTime={{ format: 'HH:mm' }}
          onChange={timeChange}
          defaultValue={time ? time : moment()}
        />
      </Col>
      <Col xs={24} sm={24} md={20} lg={16} xl={16}>
        <Search
          onSearch={value => addSchedule(value)}
          defaultValue=""
          enterButton={<Icon type="check" style={{ fontSize: '20px' }} />}
        />
      </Col>
    </Col >
  )
}

const ScheduleForm = ({ selectedDate, dateCellRender, deleteSchedule }) => {
  let list = dateCellRender(selectedDate, false)
  list = list.sort((a, b) => { return (a.time.diff(b.time)) })
  return (
    list.length ?
      <div>
        <h5 style={{ marginBottom: '0.5em' }}>{selectedDate.format('MM/DD/YYYY')}</h5>
        <List
          size="small"
          bordered
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <Row type="flex" align="middle" style={{ width: '100%' }}>
                <Col xs={18} sm={18} md={18} lg={18} xl={18}><Tag>{item.time.format('HH:mm')}</Tag><p>{item.content}</p></Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'right' }}><p><Button type="primary" onClick={() => { deleteSchedule(item) }}><Language text={'Delete'} /></Button></p></Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
      :
      <div>
        <h5 style={{ marginBottom: '0.5em' }}>{selectedDate.format('MM/DD/YYYY')}</h5>
        <div style={{ fontSize: '0.8em' }}><Language text={'ScheduleNot'} /></div>
      </div>
  )
}

class Schedule extends Component {

  addSchedule = (content) => {
    if (content) {
      const { scheduleList } = this.state
      this.setState({
        scheduleList: [
          ...scheduleList,
          { date: time, time: time, content: content }
        ]
      })
    }
  }

  deleteSchedule = (schedule) => {
    const { scheduleList } = this.state
    this.setState({ scheduleList: scheduleList.filter(list => list !== schedule) })
  }

  dateCellRender = (value, calendar = true) => {
    const { scheduleList } = this.state
    const date = value.date()
    const month = value.month()
    const year = value.year()
    const list = scheduleList.filter(schedule => schedule.date.date() === date && schedule.date.month() === month && schedule.date.year() === year)
    return (
      list.map((item, index) =>
        calendar ?
          <Tooltip key={index} placement="top" title={`${item.time.format('HH:mm')} ${item.content}`}>
            <div>{item.time.format('HH:mm')} {item.content}</div>
          </Tooltip>
          : item
      )
    )
  }

  onPanelChange = (value) => {
    if (value)
      this.setState({ selectedDate: value })
  }

  timeChange = (value) => {
    if (value)
      time = value
  }

  state = {
    scheduleList: [
      { date: moment('2018-11-18'), time: moment().hour(15).minute(49), content: 'This is warning event.' },
      { date: moment('2018-11-17'), time: moment().hour(12).minute(22), content: 'This is usual event.' },
    ],
    selectedDate: moment(),
    addSchedule: this.addSchedule,
    onPanelChange: this.onPanelChange,
    dateCellRender: this.dateCellRender,
    timeChange: this.timeChange,
    deleteSchedule: this.deleteSchedule,
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState, this.state) {
  //     // if(nextState.time.hour() === this.state.time.hour() && nextState.time.minute() === this.state.time.minute()) return false
  //     return true
  //   }
  //   return false
  // }

  render() {
    const {
      selectedDate,
      addSchedule,
      onPanelChange,
      dateCellRender,
      deleteSchedule,
      timeChange
    } = this.state
    const ScheduleView = DashboardWidget(<ScheduleForm selectedDate={selectedDate} dateCellRender={dateCellRender} deleteSchedule={deleteSchedule} />, 'ScheduleList', 24)
    const CalendarView = DashboardWidget(<CalendarForm selectedDate={selectedDate} dateCellRender={dateCellRender} onPanelChange={onPanelChange} />, 'Calendar', 24)
    const CalendarMView = DashboardWidget(<Calendar value={selectedDate} onSelect={onPanelChange} onPanelChange={onPanelChange} fullscreen={false} />, 'Calendar', 24)
    const SearchBox = DashboardWidget(<SearchForm time={time} timeChange={timeChange} addSchedule={addSchedule} />, 'ScheduleInputBox', 24)
    return (
      <Wrapper>
        <ScheduleView />
        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
          <CalendarView />
        </Col>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <CalendarMView />
        </Col>
        <SearchBox />
      </Wrapper>
    );
  }
}

export default Schedule;

Schedule.propTypes = {
  scheduleList: PropTypes.array,
  time: PropTypes.string,
  selectedDate: PropTypes.string,
  addSchedule: PropTypes.func,
  onPanelChange: PropTypes.func,
  dateCellRender: PropTypes.func,
  timeChange: PropTypes.func,
}