import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import '@availity/yup';
import App from './App';
import { StoreProvider } from './stores';
import './index.scss';
import 'react-block-ui/style.css';

render(
  <StoreProvider>
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </StoreProvider>,
  document.querySelector('#root')
);
