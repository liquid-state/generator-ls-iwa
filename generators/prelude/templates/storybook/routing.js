import React from 'react';
import { addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Router } from '@project/common';
import createMemoryHistory from 'history/createMemoryHistory';

let setRoute;

const setup = () => {
    const history = createMemoryHistory();
    // Capture the real replace function to use when we
    // need to set a route to display a story correctly.
    setRoute = history.replace;

    history.push = action('history.push');
    history.replace = action('history.replace');
    history.go = action('history.go');
    history.goBack = action('history.goBack');
    history.goForward = action('history.goForward');

    const fakeRouter = {
      navigate: action('router.navigate'),
      resolve: f => f
    };

    addDecorator(story => <Router history={history} router={fakeRouter}>{story()}</Router>);
}

export default setup;
export {
    setRoute
};
