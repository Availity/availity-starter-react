import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';

import { ContextProvider, useAppContext } from '@/context';

// Displays current memberId from context
const MemberIdDisplay = () => {
  const { form } = useAppContext();
  return <div>{form.memberId || 'empty'}</div>;
};

// Sets form values immediately on mount
const FormSetter = ({ values }) => {
  const { setForm } = useAppContext();
  useEffect(() => {
    setForm(values);
  }, [setForm, values]);
  return null;
};

FormSetter.propTypes = {
  values: PropTypes.shape({
    memberId: PropTypes.string,
    zipCode: PropTypes.string,
  }),
};

// Renders component that calls useAppContext outside a provider
const BadConsumer = () => {
  useAppContext();
  return null;
};

describe('ContextProvider', () => {
  test('provides initial form state', () => {
    render(
      <ContextProvider>
        <MemberIdDisplay />
      </ContextProvider>
    );

    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  test('setForm updates the form state', () => {
    render(
      <ContextProvider>
        <FormSetter values={{ memberId: '12345678', zipCode: '32099' }} />
        <MemberIdDisplay />
      </ContextProvider>
    );

    expect(screen.getByText('12345678')).toBeInTheDocument();
  });

  test('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<BadConsumer />)).toThrow('Context must be used inside a provider');
    spy.mockRestore();
  });
});
