import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';

import { ContextProvider, useAppContext } from '@/context';

const Component = () => {
  const { form, setForm } = useAppContext();
  useEffect(() => {
    setForm({ name: 'Test Name' });
  }, [setForm]);
  return <div>{form ? form.name : 'none'}</div>;
};

describe('MemberInfo', () => {
  test('renders', () => {
    render(
      <ContextProvider>
        <Component />
      </ContextProvider>
    );

    screen.getByText('Test Name');
  });
});
