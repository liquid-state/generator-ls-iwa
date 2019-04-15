import React from 'react';
import Hammer from 'hammerjs';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-p"
    defaultIsVisible={false}
    defaultPosition="bottom"
    defaultSize={0.8}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

// Enable pentatap to show and hide
const mc = new Hammer.Manager(window);
mc.add(new Hammer.Tap({ event: 'pentatap', taps: 5 }));
mc.on('pentatap', () => window.toggleDock());
window.toggleDock = () => window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, keyCode: 72 }));
window.moveDock = () => window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, keyCode: 80 }));

export default DevTools;
