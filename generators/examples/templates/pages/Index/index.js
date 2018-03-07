import React from 'react';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import { Route } from '../../routing';
import './style.css';

import HomePage from '../Home';
import ButtonPage from '../Buttons';

export default () => (
  <Layout>
    <Layout.Content>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/buttons" component={ButtonPage} />
      </Switch>
    </Layout.Content>
  </Layout>
);
