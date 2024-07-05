import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const context = createContext(null);

export const useAppContext = () => {
  const ctx = useContext(context);
  if (!ctx) throw new Error('Context must be used inside a provider');
  return ctx;
};

export const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [hasMemberInfo, setHasMemberInfo] = useState(false);
  const [form, setForm] = useState({ memberId: '', zipCode: '' });

  const globalContext = useMemo(() => ({
    form, setForm, loading, setLoading, hasMemberInfo, setHasMemberInfo,
  }), [form, loading, hasMemberInfo])

  return (
    <context.Provider value={globalContext}>
      {children}
    </context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
