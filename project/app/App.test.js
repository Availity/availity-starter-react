import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import axiosMock from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

import spaces from '../data/spaces.json';
import App from './App';
import { ContextProvider } from './context';

jest.mock('axios');

const queryClient = new QueryClient();

describe('ID Card Viewer', () => {
  test('renders', async () => {
    axiosMock.mockResolvedValue({
      config: { polling: false },
      data: spaces,
      status: 202,
      statusText: 'Ok',
    });

    render(
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router initialEntries={['/?spaceId=12345']}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ContextProvider>
    );

    await waitFor(() => {
      screen.getByTestId('sso-container');
      screen.getAllByText('ID Card Viewer');
    });
  });
});
