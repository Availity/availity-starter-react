import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { ContextProvider } from './context';
import './index.scss';
import 'react-block-ui/style.css';

const queryClient = new QueryClient();

render(
  <ContextProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  </ContextProvider>,
  document.querySelector('#root')
);
