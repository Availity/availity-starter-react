import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useMemberInfo } from '@/hooks';
import { StoreProvider } from '@/stores';

const Component = () => {
  const [info, setInfo] = useMemberInfo();
  useEffect(() => {
    setInfo({ name: 'Test Name' });
  }, [setInfo]);
  return <div>{info ? info.name : 'none'}</div>;
};

describe('MemberInfo', () => {
  test('renders', () => {
    const { getByText } = render(
      <StoreProvider>
        <Component />
      </StoreProvider>
    );

    getByText('Test Name');
  });
});
