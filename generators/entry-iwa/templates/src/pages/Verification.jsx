import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { Button } from '@liquid-state/ui-kit';
import {
  Container,
  ContentPadding,
  PinnedToBottom,
} from '@project/common';
import { registrationValidationSubmitted } from '../redux/actions/registration';
import { register } from '../assets';

const handleSubmit = (validateFieldsAndScroll, onSubmit) => (e) => {
  e.preventDefault();
  validateFieldsAndScroll((err, values) => {
    if (!err) {
      onSubmit(values);
    }
  });
};

const Verification = ({
  form: {
    validateFieldsAndScroll,
    getFieldDecorator,
  },
  onSubmit,
  loading,
}) => (
  <Container
    fixed
    noPadding
    className="onboarding"
  >
    <img src={register} alt="" />
    <ContentPadding>
      <h1>Verification</h1>
      <p>
          We&apos;ve sent a verification code to the email you entered in the previous step.
          Please check your email for the code and enter it here once you have it.
      </p>
      <Form onSubmit={handleSubmit(validateFieldsAndScroll, onSubmit)}>
        <Form.Item label="Verification code">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: 'Your verification code is required to continue',
              },
              {
                len: 6,
                message: 'Your verification code should be 6 digits in length.',
              },
            ],
          })(
            <Input
              placeholder="Enter your verification code"
              pattern="\d*"
              inputMode="numeric"
            />,
          )}
        </Form.Item>
        <PinnedToBottom>
          <Button stretched type="primary" htmlType="submit" loading={loading}>Register</Button>
        </PinnedToBottom>
      </Form>
    </ContentPadding>
  </Container>
);

Verification.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Verification.defaultProps = {
  loading: false,
};

const WrappedVerification = Form.create()(Verification);

export {
  WrappedVerification as Verification,
};

const mapState = ({ registration }) => ({
  loading: registration.submitting,
});

export default connect(mapState, {
  onSubmit: registrationValidationSubmitted,
})(WrappedVerification);
