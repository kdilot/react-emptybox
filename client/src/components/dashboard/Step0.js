import React, { Component } from 'react';
import { Language } from 'common';
import { Form, Icon, Button, Checkbox } from 'antd';

const FormItem = Form.Item
class Step0 extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll()
  }

  state = {
    handleSubmit: this.handleSubmit
  }

  render() {
    const { handleSubmit } = this.state
    const { handleType } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: <Language text='PlsIUsername' />,
            }],
          })(
            <Language prefix={<Icon type="user" />} type='default' text='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: <Language text='PlsIPassword' />,
            }],
          })(
            <Language prefix={<Icon type="lock" />} type='default' inputType={'password'} text='Password' />
          )}
        </FormItem>
        <div>
          <Checkbox checked><Language text={'RememberMe'} /></Checkbox>
        </div>
        <div style={{ marginTop: '1em' }}>
          <Button type="primary" htmlType="submit" className="login-form-button"><Language text={'Login'} /></Button>
          <Button type="primary" onClick={() => { handleType() }}><Language text={'Register'} /></Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Step0);