import { StoreContext } from '@/stores';
import useStore from './useStore';

const useAppStore = dataSelector => useStore(StoreContext, (contextData = {}) => contextData.appStore, dataSelector);

export default useAppStore;
