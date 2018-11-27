import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { DashboardHeader, Visitor, Account, Schedule, MenuBar, ShoppingProduct } from 'components/dashboard';
import { Row, Layout } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const { Content } = Layout;
const Wrapper = styled.div`
  width: 100%;
  h1, h2, h3, h4, h5, h6 {
    color: black;
  }
  .ant-layout-sider-zero-width-trigger {
    z-index: 1;
  }
  .ant-menu-item > a, .ant-menu-item {
    color: rgba(255, 255, 255, 1);
    margin: 0;
  }
  .ant-layout-sider-below {
    position: absolute;
    min-width: 200px;
    max-width: 200px;
    z-index: 1;
    height: 100%;
  }
`
const NonClickable = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.65);
  z-index: 1;
  display: ${props => props.menuVisibility ? 'block' : 'none'};
`

class DashboardContainer extends Component {
  checkWorktime = () => {
    this.intervalID = setTimeout(() => {
      const { employeeList } = this.state
      let _status = []
      employeeList.map((list, index) => {
        if (parseInt(moment().diff(moment().hour(list[1]).minute(list[2])), 10) >= 0 &&
          parseInt(moment().diff(moment().hour(list[3]).minute(list[4])), 10) < 0) {
          _status.push('Working')
        }
        else {
          _status.push('Left')
        }
        return _status
      })
      this.setState({
        status: _status
      })
      this.checkWorktime()
    }, 1000)
  }

  changeMenuVisibility = (menuVisibility) => {
    this.setState({ menuVisibility })
  }

  constructor(props) {
    super(props)

    this.state = {
      employeeList: [
        ['Alison Parker', 9, 0, 16, 0], // name / start hour / start minute / finish hour / finish minute 
        ['Peter Parker', 8, 0, 14, 28],
        ['Denny Green', 3, 20, 16, 13],
        ['Wil Castillo', 14, 36, 21, 0],
        ['Caitlan Waters', 7, 0, 17, 5],
        ['Libbie Avila', 9, 14, 13, 10],
        ['Laurence Costa', 20, 56, 23, 9],
        ['Jimmie Russell', 18, 34, 24, 30],
        ['Britany Turner', 10, 0, 19, 0],
      ],
      status: [],
      menuVisibility: false,
      checkWorktime: this.checkWorktime,
      changeMenuVisibility: this.changeMenuVisibility,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = false
    nextState.status.map((list, index) => {
      if (list !== this.state.status[index])
        return flag = true
      return true
    })
    if (nextState.menuVisibility !== this.state.menuVisibility) flag = true
    if (nextProps !== this.props) flag = true
    return flag
  }

  componentDidMount() {
    this.checkWorktime()
  }

  componentDidUpdate() {
    if(window.innerWidth > 576) {
      this.changeMenuVisibility(false)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  render() {
    const {
      menuVisibility,
    } = this.state
    return (
      <Wrapper>
        <Layout style={{ height: '100%' }}>
          <MenuBar {...this.props} {...this.state} />
          <Layout>
            <Content>
              <NonClickable menuVisibility={menuVisibility} />
              <Row type="flex" align="top">
                <DashboardHeader {...this.props} />
                <Route exact path='/dashboard/member' component={() => {
                  return (
                    <Visitor {...this.props} {...this.state} />
                  )
                }} />
                <Route path='/dashboard/account' component={Account} />
                <Route path='/dashboard/schedule' component={Schedule} />
                <Route path='/dashboard/shopping/product' component={ShoppingProduct} />
                <Route path='/dashboard/test' component={() => { return (<div>test</div>) }} />
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Wrapper >
    )
  }
}

export default DashboardContainer;

DashboardContainer.propsType = {
  checkWorktime: PropTypes.func,
  employeeList: PropTypes.array,
  status: PropTypes.array,
  menuVisibility: PropTypes.bool,
  changeMenuVisibility: PropTypes.func,
}