import React from 'react';
import { Language } from 'common';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class Step1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    const { confirm } = this.state
    this.setState({ confirm: confirm || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(<Language value='PlsCPassword' />)
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    const { confirm } = this.state
    if (value && confirm) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  state = {
    confirm: false,
    autoCompleteResult: [],
    handleSubmit: this.handleSubmit,
    handleConfirmBlur: this.handleConfirmBlur,
    compareToFirstPassword: this.compareToFirstPassword,
    validateToNextPassword: this.validateToNextPassword,
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      handleSubmit,
      handleConfirmBlur,
      compareToFirstPassword,
      validateToNextPassword,
    } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 12 },
        lg: { span: 10 },
        xl: { span: 8 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
      },
    }

    return (
      <Form onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={<Language value='Email' />}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: <Language value='InvalidEmail' />,
            }, {
              required: true, message: <Language value='PlsIEmail' />,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<Language value='Password' />}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: <Language value='PlsIPassword' />,
            }, {
              validator: validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<Language value='ConfirmPassword' />}
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: <Language value='PlsCPassword' />,
            }, {
              validator: compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<Language value='PhoneNumber' />}
        >
          {getFieldDecorator('number', {
            rules: [{ required: true, message: <Language value='PlsINumber' />, whitespace: true }],
          })(
            <Input type="Number" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"><Language value='Check' /></Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Step1);