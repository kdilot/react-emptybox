import React, { Component } from 'react';
import { DashboardWidget } from 'components/dashboard';
import { Language } from 'common';
import { Form, Icon, Button, Checkbox, Row, Col, Steps } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Step = Steps.Step;
const Wrapper = styled.div`
  width: 100%;
  a { color: black; }
  .ant-input::placeholder { 
    color: white; 
    opacity: 0.8;
  }
  .ant-input-prefix {
    color: white;
  }
  .steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
`
const LoginForm = ({ handleType }) => {
  return (
    <Form className="login-form">
      <FormItem>
        <Language prefix={<Icon type="user" />} type='default' value='Username' />
      </FormItem>
      <FormItem>
        <Language prefix={<Icon type="lock" />} type='default' value='Password' />
      </FormItem>
      <div>
        <Checkbox><Language value={'RememberMe'} /></Checkbox>
      </div>
      <div style={{ marginTop: '1em' }}>
        <Button type="primary" htmlType="submit" className="login-form-button"><Language value={'Login'} /></Button>
        <Button type="primary" onClick={() => { handleType() }}><Language value={'Register'} /></Button>
      </div>
    </Form>
  )
}

const RegisterForm = ({ steps, current, handleCurrent, handleType }) => {
  return (
    <div>
      <Steps current={current}>
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {
          current < steps.length - 1
          && <Button type="primary" onClick={() => handleCurrent(true)}><Language value={'Next'} /></Button>
        }
        {
          current === steps.length - 1
          && <Button type="primary" ><Language value={'Done'} /></Button>
        }
        {
          current === 0
          && (
            <Button style={{ marginLeft: 8 }} onClick={() => handleType()}>
              <Language value={'Previous'} />
            </Button>
          )
        }
        {
          current > 0
          && (
            <Button style={{ marginLeft: 8 }} onClick={() => handleCurrent()}>
              <Language value={'Previous'} />
            </Button>
          )
        }
      </div>
    </div>
  )
}

class Login extends Component {
  handleType = () => {
    const { type } = this.state
    this.setState({ type: !type })
  }

  handleCurrent = (plus = false) => {
    const current = this.state.current + (plus ? 1 : -1)
    this.setState({ current })
  }

  state = {
    steps: [{
      title: 'First',
      content: 'First-content',
    }, {
      title: 'Second',
      content: 'Second-content',
    }, {
      title: 'Last',
      content: 'Last-content',
    }],
    type: true,
    current: 0,
    handleSubmit: this.handleSubmit,
    handleType: this.handleType,
    handleCurrent: this.handleCurrent,
  }

  render() {
    const {
      steps,
      handleType,
      type,
      current,
      handleCurrent,
    } = this.state
    const Login = DashboardWidget(<LoginForm handleType={handleType} />, false, 8)
    const Regist = DashboardWidget(<RegisterForm handleType={handleType} steps={steps} current={current} handleCurrent={handleCurrent} />, false, 24)
    return (
      <Wrapper>
        <Row type="flex" justify="center" align="middle" style={{ width: '100%' }}>
          {type ? <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{ marginTop: '10em' }} /> : ''}
          {type ?
            <Login />
            :
            <Regist />
          }
        </Row>
      </Wrapper>
    );
  }
}
export default Form.create()(Login);

Login.propTypes = {
  type: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleType: PropTypes.func,
  handleCurrent: PropTypes.func,
}