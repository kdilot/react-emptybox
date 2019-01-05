import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Language } from 'common';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0.7em;
  font-size: 1.15em;

  div {
    margin: 0;
  }
  h2 {
    font-size: 1.35em;
    font-weight: bold;
  }
  h5 {
    margin-top: 0.2em;
    font-size: 0.8em;
    display: inline-flex;
  }
  .plus {
    color:#256f33;
  }
  .effect-plue {
    background:#256f33;
  }
  .minus {
    color:#C10202;
  }
  .effect-minus {
    background:#C10202;
  }
  .frozen {
    background:#91bbbc;
    opacity: 0.5;
  }
`
const FrozenText = styled.div`
  font-size: 2em;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
`

class CurrencyCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      changed: false,
      effect: '',
    }
  }
  timeout = null

  highlight = (effect) => {
    this.setState({
      changed: true,
      effect
    })

    this.timeout = setTimeout(() => {
      this.setState({
        effect: false,
        changed: false
      })
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.price !== this.props.price && prevProps.selected === this.props.selected) {
      this.highlight(this.props.price > prevProps.price)
    } else if (prevProps.volume !== this.props.volume && prevProps.selected === this.props.selected) {
      this.highlight(this.props.volume > prevProps.volume)
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  render() {
    const { name, currency, price, volume, change, frozen } = this.props
    const { changed, effect } = this.state
    return (
      <Wrapper>
        <Link to={frozen ? `/vtc` : `/vtc/${name}`}>
          <Row style={{ padding: '1em' }} className={frozen ? 'currencyCard frozen' : (changed ? effect ? 'currencyCard effect-plue' : 'currencyCard effect-minus' : 'currencyCard')}>
            <Col span={24} style={{ textAlign: 'right', fontWeight: 'bold' }}>{name.split('_')[1]}</Col>
            <Col span={24} style={{ textAlign: 'center' }}><h2>{parseFloat(price).toFixed(8)}</h2></Col>
            <Col span={24} style={{ textAlign: 'center' }} className={change > 0 ? 'plus' : (change === 0 ? '' : 'minus')}>({Math.round(parseFloat(change) * 10000) / 100}%)</Col>
            <Col span={24} style={{ textAlign: 'right' }}><h5>{currency}</h5></Col>
            <Col span={24} style={{ textAlign: 'left' }}><h5>Volume</h5> {Math.round(parseFloat(volume) * 1000) / 1000}</Col>
          </Row>
          {frozen ? <FrozenText><Language text="Frozen" /></FrozenText> : ''}
        </Link>
      </Wrapper>
    );
  }
}

export default CurrencyCard;