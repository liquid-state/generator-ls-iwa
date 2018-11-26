import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'antd';
import { Button } from '@liquid-state/ui-kit';
import {
  PinnedToBottom,
} from '@project/common';

class ChangePasswordForm extends React.Component {
  state = {
    isDirty: false,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        onSubmit(Object.assign({}, values));
      }
    });
  }

  validateComplexity = (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    if (value.length < 8) {
      callback('Your password should be at least 8 characters in length');
      return;
    }
    // These should be extended with Unicode character classes.
    const numbers = /[0-9]/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const valid = numbers.test(value) && uppercase.test(value) && lowercase.test(value);
    if (!valid) {
      callback('Your password must contain at least '
        + 'one upper-case letter, one lower-case letter, and one number.');
      return;
    }
    callback();
  }

  validateWithConfirmPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { isDirty } = this.state;
    if (value && isDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords that you have entered do not match!');
    } else {
      callback();
    }
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    const { isDirty } = this.state;
    this.setState({ isDirty: isDirty || !!value });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Your new password cannot be empty.' },
              { validator: this.validateWithConfirmPassword },
              { validator: this.validateComplexity },
            ],
          })(<Input
            placeholder="Enter new password"
            prefix={<Icon type="lock" />}
            type="password"
          />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your password.' },
              { validator: this.compareToFirstPassword },
            ],
          })(<Input
            placeholder="Confirm your new password"
            prefix={<Icon type="lock" />}
            type="password"
            onBlur={this.handleConfirmBlur}
          />)}
        </Form.Item>
        <p>
          <small>
            Your password must be at least 8 characters long,
            and must contain at least one upper-case letter, one lower-case letter, and one number.
          </small>
        </p>
        <PinnedToBottom>
          <Button stretched type="primary" htmlType="submit">Continue</Button>
        </PinnedToBottom>
      </Form>
    );
  }
}

ChangePasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(ChangePasswordForm);
