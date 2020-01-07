import { StoreContext } from '@/stores';
import useStore from './useStore';

const useAppStore = dataSelector => useStore(StoreContext, (contextData = {}) => contextData.appStore, dataSelector);

export const useMemberInfo = () => useAppStore(store => [store.memberInfo, store.setMemberInfo]);

export default useAppStore;
