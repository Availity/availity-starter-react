import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </ContextProvider>,
  document.querySelector('#root')
);
