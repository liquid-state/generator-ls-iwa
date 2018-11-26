import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Checkbox,
} from 'antd';
import { Button } from '@liquid-state/ui-kit';
import {
  Container,
  ContentPadding,
  PinnedToBottom,
  Link,
} from '@project/common';
import { registrationSubmitted } from '../../redux/actions/registration';
import { register } from '../../assets';

class Register extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    const { form: { validateFieldsAndScroll }, onSubmit } = this.props;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  }

  validateWithConfirmPassword = (rule, value, callback) => {
    const {
      props: { form },
      state: { confirmDirty },
    } = this;
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

  termsAndConditionsAccepted = (_, value, callback) => (value ? callback() : callback('Invalid'))

  render() {
    const {
      form: {
        getFieldDecorator,
      },
      termsAndConditionsAccepted,
      loading,
    } = this.props;

    return (
      <Container
        fixed
        noPadding
        className="onboarding"
      >
        <img src={register} alt="" />
        <ContentPadding>
          <h1>Registration</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'An email address is required, this will be your username for the app.',
                  },
                  {
                    type: 'email',
                    message: 'A valid email address is required.',
                  },
                ],
              })(
                <Input type="email" placeholder="Enter your email address" />,
              )}
            </Form.Item>
            <Form.Item label="Password">
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'A password is required',
                    },
                    { validator: this.validateComplexity },
                    { validator: this.validateWithConfirmPassword },
                  ],
                })(
                  <Input type="password" placeholder="Enter your password" />,
                )
              }
            </Form.Item>
            <Form.Item label="Confirm password">
              {
                getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'You need to confirm your password to continue',
                    },
                    { validator: this.compareToFirstPassword },
                  ],
                })(
                  <Input type="password" placeholder="Re-Enter your password" onBlur={this.handleConfirmBlur} />,
                )
              }
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('terms-and-conditions', {
                valuePropName: 'checked',
                initialValue: termsAndConditionsAccepted,
                rules: [
                  {
                    required: true,
                    message: 'You must agree to the terms and conditions to continue',
                  },
                  {
                    validator: this.termsAndConditionsAccepted,
                    message: 'You must agree to the terms and conditions to continue',
                  },
                ],
              })(
                <Checkbox>
                  I agree to the
                  {' '}
                  <Link to="/registration/tou">terms and conditions</Link>
                </Checkbox>,
              )}
            </Form.Item>
            <PinnedToBottom>
              <Button
                stretched
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Register
              </Button>
            </PinnedToBottom>
          </Form>
        </ContentPadding>
      </Container>
    );
  }
}

export const RegisterForm = Form.create()(Register);

Register.propTypes = {
  termsAndConditionsAccepted: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  form: PropTypes.object.isRequired,
};

Register.defaultProps = {
  termsAndConditionsAccepted: false,
  loading: false,
};

const mapState = ({ registration }) => ({
  termsAndConditionsAccepted: registration.touAccepted,
  loading: registration.submitting,
});

export default connect(mapState, { onSubmit: registrationSubmitted })(RegisterForm);
