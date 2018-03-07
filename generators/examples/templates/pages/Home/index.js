import React from 'react';
import { List } from 'antd';
import { Link } from '../../routing';

export default () => (
  <React.Fragment>
    <List header={<h2>General</h2>}>
      <List.Item><Link to="/buttons">Buttons</Link></List.Item>
    </List>
  </React.Fragment>
);
