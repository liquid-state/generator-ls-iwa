import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@liquid-state/ui-kit';
import {
  Form, Input, Icon, Alert,
} from 'antd';
import { Container, PinnedToBottom } from '@project/common';
import { passwordResetStarted } from '../../redux/actions/authentication';

const FormItem = Form.Item;

class Email extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  static defaultProps = {
    error: undefined,
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
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Container fixed className="onboarding">
        <h1>Password Recovery</h1>
        <p>
          Please enter your email below to receive your recovery code.
        </p>
        <Form onSubmit={this.handleSubmit}>
          {
            this.getError()
          }
          <FormItem hasFeedback>
            {
              getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email', message: 'Please enter a valid email address',
                  },
                  {
                    required: true, message: 'Your email is required to continue',
                  },
                ],
              })(<Input placeholder="Enter your email address" prefix={<Icon type="user" />} type="email" />)
            }
          </FormItem>
          <PinnedToBottom>
            <Button stretched type="primary" htmlType="submit">SEND CODE</Button>
          </PinnedToBottom>
        </Form>
      </Container>
    );
  }
}

const actions = {
  onSubmit: passwordResetStarted,
};

export const RecoveryEmail = Form.create()(Email);

export default connect(null, actions)(RecoveryEmail);
