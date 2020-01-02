import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStore } from 'mobx-react-lite';
import StoreContext from './StoreContext';
import createAppStore from './appStore';

const StoreProvider = ({ children }) => {
  const appStore = useLocalStore(createAppStore);

  return <StoreContext.Provider value={{ appStore }}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default StoreProvider;
