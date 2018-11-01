import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vtcActions from 'modules/vtc';
import { CurrencyList, CurrencyChart } from 'components/vtc';
import { Language } from 'common';
import { LinkButton } from 'common/ButtonType';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

let socket = ''
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
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

  constructor(props) {
    super(props)

    this.state = {
      handleCurrencyType: this.handleCurrencyType,
      currencyChartData: this.currencyChartData,
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
          <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ marginTop: '5em' }} />
          <Col xs={1} sm={1} md={0} lg={0} xl={0} />
          <Col xs={22} sm={22} md={24} lg={24} xl={24} style={{marginBottom: '5em'}}>
            {this.props.location.pathname.split('/')[2]
              ?
              <Row>
                <Col span={24}>
                  <LinkButton LinkTo={`/vtc`} ButtonName={<Language value="Back" />} />
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
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
            <CurrencyList
              list={vtc.get('list').toJS()}
              currencyNameList={vtc.get('currencyNameList').toJS()}
              selectedCurrencyType={vtc.get('selectedCurrencyType')}
              handleCurrencyType={handleCurrencyType}
              currencyChartData={currencyChartData}
            />
          </Col>
          <Col xs={1} sm={1} md={0} lg={0} xl={0} />
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
)(VtcContainer)

VtcContainer.propTypes = {
  handleCurrencyType: PropTypes.func,
  handleSocket: PropTypes.func,
  currencyNameData: PropTypes.func,
  currencyChartData: PropTypes.func,
  currencyData: PropTypes.func,
  fetchData: PropTypes.func,

}


