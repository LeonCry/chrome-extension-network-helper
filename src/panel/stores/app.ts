const name = import.meta.env.VITE_APP_ROUTER_PREFIX;
export const useApp = defineStore(`${name}-APP`, () => {
  const isKeepLog = ref(false);
  const isStopCache = ref(false);
  const throttlingType = ref(0);
  const typeFilters = ref<string[]>([]);
  const statusFilters = ref<string[]>([]);
  return {
    isKeepLog,
    isStopCache,
    throttlingType,
    typeFilters,
    statusFilters,
  };
}, { persist: true });
