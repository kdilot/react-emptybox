import React, { Component } from 'react';
import { Row, Col, Divider, Switch, Icon } from 'antd';
import { Language } from 'common';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

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
//  component / title of component / col size / show & hide
function DashboardWidget(Comp, title, col = 24, show = true) {
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
      shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state
      }


      render() {
        const {
          view,
          handleChangeView
        } = this.state
        return (
          <Col xs={24} sm={24} md={col === 24 ? col : 12} lg={col} xl={col}>
            <Wrapper>
              {title ?
                <Row>
                  <Row>
                    <Col span={20}>
                      <h3><Language text={title} /></h3>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                      {show ?
                        <h3><Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked onChange={() => { handleChangeView() }} /></h3>
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
                      <h2>{Comp}</h2>
                    </Row>
                  </CSSTransition>
                </Row>
                :
                <Row>
                  <Col span={24}>
                    <h2>{Comp}</h2>
                  </Col>
                </Row>
              }
            </Wrapper>
          </Col>
        )
      }
    }
  )
}


export default DashboardWidget;