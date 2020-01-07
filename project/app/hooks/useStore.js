import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';

const useStore = (context, storeSelector, dataSelector) => {
  const value = useContext(context);
  if (!value) throw new Error('Provider is required when using context');
  const store = storeSelector(value);
  return useObserver(() => dataSelector(store));
};

export default useStore;
