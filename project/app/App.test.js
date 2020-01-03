import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axiosMock from 'axios';
import slotmachineResponse from '../data/slotmachine.json';
import App from './App';
import { StoreProvider } from './stores';

jest.mock('axios');

delete global.window.location;
global.window.location = { href: 'http://localhost/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04' };

const renderSso = async () => {
  axiosMock.mockResolvedValue({
    config: { polling: false },
    data: slotmachineResponse,
    status: 202,
    statusText: 'Ok',
  });

  const { getByTestId, ...rest } = render(
    <StoreProvider>
      <Router>
        <Route path="/">
          <App />
        </Route>
      </Router>
    </StoreProvider>
  );

  await waitForElement(() => getByTestId('sso-container'));

  return { getByTestId, ...rest };
};

afterEach(() => {
  cleanup();
});

describe('ID Card Viewer', () => {
  test('renders', async () => {
    const { getByText } = await renderSso();

    await waitForElement(() => getByText('My Health Plan'));
  });
});
