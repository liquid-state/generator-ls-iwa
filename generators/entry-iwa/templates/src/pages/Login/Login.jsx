import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from '@project/common';
import { loginSubmitted } from '../../redux/actions/authentication';
import Form from './LoginForm';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    inProgress: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
    inProgress: false,
  };

  render() {
    const { error, inProgress, onSubmit } = this.props;
    return (
      <Container fixed className="onboarding">
        <h1>Login</h1>
        <Form onSubmit={onSubmit} error={error} loading={inProgress} />

      </Container>
    );
  }
}

const mapState = state => ({
  error: state.login.error,
  inProgress: state.login.inProgress,
});

const actions = {
  onSubmit: loginSubmitted,
};

export default connect(mapState, actions)(Login);
