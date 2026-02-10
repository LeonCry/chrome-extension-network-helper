import type { NETWORK_PRESETS } from '@/panel/utils/throttling';

const name = import.meta.env.VITE_APP_ROUTER_PREFIX;
export const useApp = defineStore(`${name}-APP`, () => {
  const isKeepLog = ref(false);
  const isStopCache = ref(false);
  const throttlingType = ref<keyof typeof NETWORK_PRESETS | null>(null);
  const typeFilters = ref<string[]>([]);
  const statusFilters = ref<string[]>([]);
  const searchValue = ref('');
  const isSearchByKey = ref(true);
  return {
    isKeepLog,
    isStopCache,
    throttlingType,
    typeFilters,
    statusFilters,
    searchValue,
    isSearchByKey,
  };
}, { persist: true });
