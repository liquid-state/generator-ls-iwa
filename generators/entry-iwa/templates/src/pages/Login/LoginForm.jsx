import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Icon, Alert,
} from 'antd';
import { Button } from '@liquid-state/ui-kit';
import {
  PinnedToBottom,
  Link,
} from '@project/common';

const FormItem = Form.Item;

class LoginForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    error: undefined,
    loading: false,
  }

  getError() {
    const { error } = this.props;
    return error ? <Alert message={error} type="error" showIcon /> : null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        onSubmit(Object.assign({}, values));
      }
    });
  };

  render() {
    const { loading, form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={loading ? 'loading' : ''}>
        {
          this.getError()
        }

        <FormItem hasFeedback>
          {
            getFieldDecorator('username', {
              rules: [
                { required: true, message: 'An email address is required.' },
                { type: 'email', message: 'Please enter a valid email address' },
              ],
            })(<Input placeholder="Enter your email" prefix={<Icon type="user" />} type="email" />)
          }
        </FormItem>

        <FormItem hasFeedback>
          {
            getFieldDecorator('password', {
              rules: [
                { required: true, message: 'A password is required!' },
              ],
            })(<Input placeholder="Enter your password" prefix={<Icon type="lock" />} type="password" />)
          }
        </FormItem>
        <p>
          Haven&apos;t signed up yet?
          {' '}
          <Link to="/registration">Register here</Link>
        </p>
        <p>
          Can&apos;t remember your password?
          {' '}
          <Link to="/recovery">Reset your password here</Link>
        </p>
        <PinnedToBottom>
          <Button stretched type="primary" htmlType="submit" loading={loading}>Sign In</Button>
        </PinnedToBottom>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
