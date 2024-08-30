import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@availity/element';

import App from './App';
import { ContextProvider } from './context';
import './index.scss';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ContextProvider>
  </ThemeProvider>
);
