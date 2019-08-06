import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Alert } from 'antd';
import { Button } from '@liquid-state/ui-kit';
import { Container, ContentPadding, PinnedToBottom } from '@project/common';
import { registrationValidationSubmitted } from '../redux/actions/registration';
import { register } from '../assets';

const handleSubmit = (validateFieldsAndScroll, onSubmit) => e => {
  e.preventDefault();
  validateFieldsAndScroll((err, values) => {
    if (!err) {
      onSubmit(values);
    }
  });
};

const Verification = ({
  form: { validateFieldsAndScroll, getFieldDecorator, getFieldError, getFieldValue },
  onSubmit,
  loading,
  error
}) => {
  const disableSubmit =
    typeof getFieldError('code') !== 'undefined' || !getFieldValue('code');
  return (
    <Container fixed noPadding className="onboarding">
      <img src={register} alt="" />
      <ContentPadding>
        <h1>Verification</h1>
        <p>
          We&apos;ve sent a verification code to the email you entered in the previous
          step. Please check your email for the code and enter it here once you have it.
        </p>
        <Form onSubmit={handleSubmit(validateFieldsAndScroll, onSubmit)}>
          {error ? <Alert type="error" message={error} showIcon /> : null}
          <Form.Item label="Verification code">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: 'Your verification code is required to continue'
                },
                {
                  len: 6,
                  pattern: /^[0-9]*$/, // 0-9 only
                  message: 'Your verification code should be 6 digits in length.'
                }
              ]
            })(
              <Input
                maxLength={6}
                placeholder="Enter your verification code"
                pattern="\d*"
                inputMode="numeric"
              />
            )}
          </Form.Item>
          <PinnedToBottom>
            <Button
              className={disableSubmit ? 'disabled' : ''}
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
};

Verification.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

Verification.defaultProps = {
  loading: false,
  error: null
};

const WrappedVerification = Form.create()(Verification);

export { WrappedVerification as Verification };

const mapState = ({ registration }) => ({
  loading: registration.submitting,
  error: registration.error
});

export default connect(
  mapState,
  {
    onSubmit: registrationValidationSubmitted
  }
)(WrappedVerification);
