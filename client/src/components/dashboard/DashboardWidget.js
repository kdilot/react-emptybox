import React, { Component } from 'react';
import { Row, Col, Divider, Switch, Icon } from 'antd';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Wrapper = styled.div`
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
  background: white;
  div {
    color: black;
  }

  .fade-enter {
    opacity: 0.01;
    transform: translateY(0%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 400ms ease-out;
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-exit-active {
    opacity: 0.01;
    transform: translateY(0%);
    transition: all 400ms ease-out;
}
`

function DashboardWidget(Comp, name, col = 24, hide = true) {
  return (
    class DashboardWidget extends Component {
      handleChangeView = () => {
        const { view } = this.state
        this.setState({
          view: !view
        })
      }
      state = {
        view: true,
        handleChangeView: this.handleChangeView
      }
      render() {
        const {
          view,
          handleChangeView
        } = this.state
        return (
          <Col xs={24} sm={24} md={col === 24 ? col : 12} lg={col} xl={col}>
            <Wrapper>
              <Row>
                <Col span={20}>
                  <h2>{name}</h2>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  {hide ?
                    <h2><Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={() => { handleChangeView() }} /></h2>
                    : ''}
                </Col>
              </Row>
              <CSSTransition
                in={view}
                classNames="fade"
                timeout={400}
                appear
                mountOnEnter
                unmountOnExit
              >
                <Row>
                  <Divider style={{ margin: '10px 0' }} />
                  <h4>{Comp}</h4>
                </Row>
              </CSSTransition>
            </Wrapper>
          </Col>
        )
      }
    }
  )
}


export default DashboardWidget;