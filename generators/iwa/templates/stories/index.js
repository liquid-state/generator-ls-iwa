import React from 'react';
import { storiesOf, action } from '@storybook/react';

import Index from '../src/pages';

import '../src/style.less';

storiesOf('<%= title %>/Pages', module)
  .add('Index', () => <Index />)
