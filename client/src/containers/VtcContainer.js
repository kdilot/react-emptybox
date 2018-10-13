import React, { Component } from 'react';
// import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vtcActions from 'modules/vtc';
import { CurrencyList, CurrencyChart } from 'components/vtc';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

let socket = ''
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5em;

`

class VtcContainer extends Component {

  fetchData = () => {
    this.currencyNameData()
    this.currencyData()
    this.handleSocket()
  }

  currencyData = async () => {
    const { VtcActions } = this.props
    try {
      await VtcActions.currencyState()
    } catch (e) {
      console.log(e)
    }
  }

  currencyChartData = async (data) => {
    const { VtcActions } = this.props
    try {
      await VtcActions.currencyChart(data)
    } catch (e) {
      console.log(e)
    }
  }

  currencyNameData = async () => {
    const { VtcActions } = this.props
    try {
      await VtcActions.currencyName()
    } catch (e) {
      console.log(e)
    }
  }

  handleSocket = () => {
    const { VtcActions, vtc } = this.props
    socket = new WebSocket(vtc.get('wsUrl'))
    socket.addEventListener('open', () => { })
    socket.addEventListener('message', async function (event) {
      try {
        await VtcActions.updateTicker(event.data)
      } catch (e) {
        console.log(e)
      }
    })
  }

  handleCurrencyType = (type) => {
    const { VtcActions } = this.props
    VtcActions.currencyType(type)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    socket.close()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState)
  //   return true
  // }

  constructor(props) {
    super(props)

    this.state = {
      handleCurrencyType: this.handleCurrencyType,
      currencyChartData: this.currencyChartData,
      test: false
    }
  }
  render() {
    const { vtc } = this.props
    const {
      handleCurrencyType,
      currencyChartData
    } = this.state
    return (
      <Wrapper>
        <Row style={{ width: '96vw' }}>
          {this.props.location.pathname.split('/')[2]
            ?
            <Row>
              <Col span={24} style={{textAlign: 'center'}}>
                <h1>{this.props.location.pathname.split('/')[2]}</h1>
              </Col>
              <Col span={24}>
                <CurrencyChart
                  chart={vtc.get('chart').toJS()}
                  currencyChartData={currencyChartData}
                  pathname={this.props.location.pathname}
                />
              </Col>
            </Row>
            :
            ''
          }
          <Col span={24}>
            <CurrencyList
              list={vtc.get('list').toJS()}
              currencyNameList={vtc.get('currencyNameList').toJS()}
              selectedCurrencyType={vtc.get('selectedCurrencyType')}
              handleCurrencyType={handleCurrencyType}
              currencyChartData={currencyChartData}
            />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default connect(
  (state) => ({
    vtc: state.vtc,
  }),
  (dispatch) => ({
    VtcActions: bindActionCreators(vtcActions, dispatch),
  })
)(VtcContainer);

VtcContainer.propTypes = {
  handleCurrencyType: PropTypes.func,
};


