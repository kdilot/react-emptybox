import React, { Component } from 'react';
// import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vtcActions from 'modules/vtc';
import { CurrencyList } from 'components/vtc';
import styled from 'styled-components';
import PropTypes from 'prop-types';

let socket = ''
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 5em;

  h1 {
    margin-top: 1em;
  }
`

class VtcContainer extends Component {

  fetchData = async () => {
    const { VtcActions } = this.props
    try {
      await VtcActions.currencyState()
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
    this.currencyNameData()
    this.fetchData()
    this.handleSocket()
  }

  componentWillUnmount() {
    socket.close()
  }
  constructor(props) {
    super(props)

    this.state = {
      handleCurrencyType: this.handleCurrencyType,
      test: false
    }
  }
  render() {
    const { vtc } = this.props
    const {
      handleCurrencyType
    } = this.state
    return (
      <Wrapper>
        <CurrencyList
          list={vtc.get('list').toJS()}
          currencyNameList={vtc.get('currencyNameList').toJS()}
          handleCurrencyType={handleCurrencyType}
          selectedCurrencyType={vtc.get('selectedCurrencyType')}
        />
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


