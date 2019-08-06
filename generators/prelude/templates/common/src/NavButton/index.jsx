import React from 'react';
import { Button } from '@liquid-state/ui-kit';
import { Icon } from 'antd';

import './style.less';

// eslint-disable-next-line react/prop-types
export default ({ children, ...props }) => (
  <Button {...props} className="nav-button">
    {children}
    <Icon type="right" className="accessory" />
  </Button>
);
