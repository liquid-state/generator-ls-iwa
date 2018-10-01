import React from 'react';
import { configure, addDecorator, action } from '@storybook/react';
import { Router } from 'react-router';
import createMemoryHistory from 'history/createMemoryHistory';
// Paths to stories are stored in a json array to make it easier for the generator to add and remove them
// without having to worry about breaking any customisations you make to loadStories()

function bindRouting() {
  const history = createMemoryHistory();

  // Use set inside the storybook to load the correct route for pages which are route dependent.
  history.set = history.replace;

  history.push = action('history.push');
  history.replace = action('history.replace');
  history.go = action('history.go');
  history.goBack = action('history.goBack');
  history.goForward = action('history.goForward');

  addDecorator(story => <Router history={history}>{story()}</Router>);

  return (route) => history.set(route);
}

function loadStories() {}

const setRoute = bindRouting();
configure(loadStories, module);

export {
  setRoute
};
