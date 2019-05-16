import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from '@project/common';
import { loginChangePasswordSubmitted } from '../../redux/actions/authentication';
import Form from './ChangePasswordForm';

export const ChangePassword = ({ onSubmit }) => (
  <Container fixed className="onboarding">
    <h1>Sign in</h1>
    <p>
      You must change your password before continuing, change your password below to
      finish logging in.
    </p>
    <Form onSubmit={onSubmit} />
  </Container>
);

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const actions = {
  onSubmit: loginChangePasswordSubmitted
};

export default connect(
  null,
  actions
)(ChangePassword);
