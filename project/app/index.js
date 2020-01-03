import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'availity-uikit/scss/_bootstrap.scss';
import '@availity/yup';
import './index.scss';
import App from './App';
import { StoreProvider } from './stores';

render(
  <StoreProvider>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.querySelector('#root')
);
