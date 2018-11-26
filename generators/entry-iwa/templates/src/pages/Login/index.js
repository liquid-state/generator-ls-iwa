import React from 'react';
import { Switch } from 'react-router';
import { Route } from '@project/common';
import LoginPage from './Login';
import ChangePasswordPage from './ChangePassword';

// eslint-disable-next-line react/prefer-stateless-function
export class LoginIndex extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login/change-password" component={ChangePasswordPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default LoginIndex;
