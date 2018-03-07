import React from 'react';
import { configure, addDecorator, action } from '@storybook/react';
import { Router } from '../src/routing';
import createMemoryHistory from 'history/createMemoryHistory'

function bindRouting() {
    const history = createMemoryHistory();

    history.push = action('history.push');
    history.replace = action('history.replace');
    history.go = action('history.go');
    history.goBack = action('history.goBack');
    history.goForward = action('history.goForward');

    addDecorator(story => <Router historyFactory={() => history}>{story()}</Router>)
}

function loadStories() {
    require('../stories/index');
}

bindRouting();
configure(loadStories, module);