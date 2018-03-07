import React from 'react';
import { List, Button } from 'antd';

/** Example custom component */
export default () => (
  <React.Fragment>
    <List.Item><Button type="primary">Primary</Button></List.Item>
    <List.Item><Button>Default</Button></List.Item>
    <List.Item><Button type="dashed">Dashed</Button></List.Item>
    <List.Item><Button type="danger">Danger</Button></List.Item>
  </React.Fragment>
);
