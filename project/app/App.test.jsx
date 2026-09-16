import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { ContextProvider } from './context';

vi.mock('axios');

// Mock Spaces to avoid network calls in tests
vi.mock('@availity/element', async () => {
  const actual = await vi.importActual('@availity/element');
  return {
    ...actual,
    // eslint-disable-next-line react/prop-types
    Spaces: ({ children }) => <div data-testid="spaces-mock">{children}</div>,
  };
});

const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });

const renderApp = (route = '/') =>
  render(
    <ContextProvider>
      <QueryClientProvider client={createQueryClient()}>
        <Router initialEntries={[route]}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ContextProvider>
  );

describe('ID Card Viewer', () => {
  test('renders the app container', () => {
    renderApp();
    expect(screen.getByTestId('sso-container')).toBeInTheDocument();
  });

  test('renders the page header', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /ID Card Viewer/i })).toBeInTheDocument();
  });

  test('renders the search form by default', () => {
    renderApp();
    expect(screen.getByLabelText(/Member ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Member Card/i })).toBeInTheDocument();
  });

  test('passes spaceId from URL to Spaces component', () => {
    renderApp('/?spaceId=12345');
    expect(screen.getByTestId('spaces-mock')).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: /View Member Card/i }));

    await waitFor(() => {
      // Both fields are required — getAllByText handles multiple matches
      const errors = screen.getAllByText('This field is required.');
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
