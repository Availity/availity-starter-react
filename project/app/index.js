import React from 'react';
import { render } from 'react-dom';
import 'availity-uikit/scss/_bootstrap.scss';
import '@availity/yup';
import './index.scss';
import App from './App';
import { StoreProvider } from './stores';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.querySelector('#root')
);
