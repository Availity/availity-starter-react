import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@availity/element';

import App from './App';
import { ContextProvider } from './context';

const container = document.getElementById('root');
if (!container) throw new Error('Unable to find root node');
const root = createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

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
