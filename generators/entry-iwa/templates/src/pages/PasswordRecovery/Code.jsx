import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@liquid-state/ui-kit';
import {
  Form, Input, Icon, Alert,
} from 'antd';
import { Container, PinnedToBottom } from '@project/common';
import { passwordResetCodeSubmitted } from '../../redux/actions/authentication';

const FormItem = Form.Item;

class Code extends Component {
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
        <h1>Password recovery</h1>
        <p>
          Please enter your six digit code below
        </p>
        <Form onSubmit={this.handleSubmit}>
          {
            this.getError()
          }
          <FormItem hasFeedback>
            {
              getFieldDecorator('code', {
                rules: [
                  { required: true, message: 'A code is required to continue.' },
                  { len: 6, message: 'Your code should be exactly 6 digits.' },
                ],
              })(<Input placeholder="Enter your 6 digit code" prefix={<Icon type="lock" />} type="text" />)
            }
          </FormItem>
          <PinnedToBottom>
            <Button type="primary" htmlType="submit" stretched>SUBMIT CODE</Button>
          </PinnedToBottom>
        </Form>
      </Container>
    );
  }
}

const actions = {
  onSubmit: passwordResetCodeSubmitted,
};

const mapStateToProps = state => ({
  error: state.passwordReset.error,
});

export const RecoveryCode = Form.create()(Code);

export default connect(mapStateToProps, actions)(RecoveryCode);
