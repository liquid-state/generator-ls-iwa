import React from 'react';
import { List } from 'antd';
import ButtonList from '../../components/ButtonList';

export default () => (
  <React.Fragment>
    <List size="small" header={<h2>Buttons</h2>}>
      <ButtonList />
    </List>
  </React.Fragment>
);
