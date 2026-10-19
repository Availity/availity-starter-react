import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { avUserApi } from '@availity/api-axios';

import { useCurrentUser } from './useCurrentUser';

vi.mock('@availity/api-axios', () => ({
  avUserApi: { me: vi.fn() },
}));

/** @param {{ children: import('react').ReactNode }} props */
const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

describe('useCurrentUser', () => {
  test('returns the user from avUserApi.me', async () => {
    vi.mocked(avUserApi.me).mockResolvedValue({ firstName: 'Jane', lastName: 'Smith' });
    const { result } = renderHook(() => useCurrentUser(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ firstName: 'Jane', lastName: 'Smith' });
  });
});
