import { configure } from '@storybook/react';
import setupRouting from './routing';

function loadStories() {}

setupRouting();
configure(loadStories, module);
