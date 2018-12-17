import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './App';

const mountNode = document.getElementById('React');

const init = RootComponent => {
  render(<RootComponent />, mountNode);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const { App } = require('./App');

    unmountComponentAtNode(mountNode);
    requestAnimationFrame(() => init(App));
  });
}

init(App);
