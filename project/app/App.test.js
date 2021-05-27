import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axiosMock from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import slotmachineResponse from '../data/slotmachine.json';
import App from './App';
import { ContextProvider } from './context';

jest.mock('axios');

// delete global.window.location;
global.window.location = { href: 'http://localhost/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04' };

const queryClient = new QueryClient();

const renderSso = async () => {
  axiosMock.mockResolvedValue({
    config: { polling: false },
    data: slotmachineResponse,
    status: 202,
    statusText: 'Ok',
  });

  const { getByTestId, ...rest } = render(
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route path="/">
            <App />
          </Route>
        </Router>
      </QueryClientProvider>
    </ContextProvider>
  );

  expect(getByTestId('sso-container')).toBeDefined();

  return { getByTestId, ...rest };
};

afterEach(() => {
  cleanup();
});

describe('ID Card Viewer', () => {
  test('renders', async () => {
    const { getAllByText } = await renderSso();

    expect(getAllByText('ID Card Viewer')).toBeDefined();
  });
});
