import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@liquid-state/ui-kit';
import {
  Form, Input, Icon, Alert,
} from 'antd';
import { Container, PinnedToBottom } from '@project/common';
import { passwordResetPasswordSubmitted } from '../../redux/actions/authentication';

const FormItem = Form.Item;

class Password extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  static defaultProps = {
    error: undefined,
  }

  state = {
    confirmDirty: false,
  };

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

  validateWithConfirmPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Your passwords do not match.');
    } else {
      callback();
    }
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Container fixed className="onboarding">
        <h1>Password recovery</h1>
        <p>
          Please enter your new password below
        </p>

        <Form onSubmit={this.handleSubmit}>
          {
            this.getError()
          }
          <FormItem hasFeedback>
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'New password is required!' },
                  { validator: this.validateComplexity },
                  { validator: this.validateWithConfirmPassword },
                ],
              })(<Input placeholder="Enter new password" prefix={<Icon type="lock" />} type="password" />)
            }
          </FormItem>

          <FormItem hasFeedback>
            {
              getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: 'Please confirm your password' },
                  { validator: this.compareToFirstPassword },
                ],
              })(<Input type="password" placeholder="Repeat your password" prefix={<Icon type="lock" />} onBlur={this.handleConfirmBlur} />)
            }
          </FormItem>
          <p>
            <small>
              Your password must be at least 8 characters long,
              and must contain at least one upper-case letter,
              one lower-case letter, and one number.
            </small>
          </p>
          <PinnedToBottom>
            <Button stretched type="primary" htmlType="submit">RESET PASSWORD</Button>
          </PinnedToBottom>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.passwordReset.error,
});

const actions = {
  onSubmit: passwordResetPasswordSubmitted,
};

export const RecoveryPassword = Form.create()(Password);

export default connect(mapStateToProps, actions)(RecoveryPassword);
