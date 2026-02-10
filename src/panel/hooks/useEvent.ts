import { createEventHook } from '@vueuse/core';

const clearHook = createEventHook<void>();

export function useEvents() {
  return {
    onClear: clearHook.on,
    clearTrigger: clearHook.trigger,
  };
}
