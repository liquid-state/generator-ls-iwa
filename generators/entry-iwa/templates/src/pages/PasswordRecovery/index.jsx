import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Route } from '@project/common';

import Email from './Email';
import Code from './Code';
import Password from './Password';

const Recovery = () => (
  <Switch>
    <Route exact path="/recovery" render={() => <Redirect to="/recovery/1" />} />
    <Route path="/recovery/1" component={Email} />
    <Route path="/recovery/2" component={Code} />
    <Route path="/recovery/3" component={Password} />
  </Switch>
);

export default Recovery;
