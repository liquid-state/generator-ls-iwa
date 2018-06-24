import React from 'react';
import { configure, addDecorator, action } from '@storybook/react';
import { Router } from 'react-router';
import createMemoryHistory from 'history/createMemoryHistory'

function bindRouting() {
    const history = createMemoryHistory();

    history.push = action('history.push');
    history.replace = action('history.replace');
    history.go = action('history.go');
    history.goBack = action('history.goBack');
    history.goForward = action('history.goForward');

    addDecorator(story => <Router history={history}>{story()}</Router>);

    return (route) => history.set(route);
}

function loadStories() {
    require('../stories/index');
}

const setRoute = bindRouting();
configure(loadStories, module);

export {
  setRoute
};
