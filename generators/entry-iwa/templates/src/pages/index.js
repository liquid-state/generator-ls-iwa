import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch } from 'react-router';
import { Route } from '@project/common';

import Entry from './Entry';
import Welcome from './Welcome';
import ValueStatement from './ValueStatement';
import PersonalisePage from './Personalise';
import RegisterPage from './Register';
import VerificationPage from './Verification';
import TOUPage from './TermsAndConditions';

import Login from './Login';
import PasswordRecovery from './PasswordRecovery';

import '../style.less';

export default hot(module)(() => (
  <Switch>
    <Route path="/" exact component={Entry} />
    <Route path="/registration" exact component={Welcome} />
    <Route path="/registration/value" component={ValueStatement} />
    <Route path="/registration/personalise" component={PersonalisePage} />
    <Route path="/registration/register" component={RegisterPage} />
    <Route path="/registration/verification" component={VerificationPage} />
    <Route path="/registration/tou" component={TOUPage} />

    <Route path="/login" component={Login} />
    <Route path="/recovery" component={PasswordRecovery} />
  </Switch>
));
