import React from 'react';
import { storiesOf } from '@storybook/react';

import Home from '../src/pages/Home';
import Buttons from '../src/pages/Buttons';
import ButtonList from '../src/components/ButtonList';

import './style.css';

storiesOf('Components', module)
    .add('Button List', () => <ButtonList />);

storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Buttons', () => <Buttons />);
