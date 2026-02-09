<script setup lang="ts">
import type { EventHook } from '@vueuse/core';
import { IconFileSettingsFilled, IconForbid2Filled } from '@tabler/icons-vue';
import { useApp } from '@/panel/stores/app';
import { CLEAR_HOOK_KEY } from '@/panel/symbols';
import { disableDisableCache, enableDisableCache } from '@/panel/utils/cache-control';
import { NETWORK_PRESETS, setNetworkThrottling } from '@/panel/utils/throttling';

const clearHook = inject<EventHook<void>>(CLEAR_HOOK_KEY)!;

const { isKeepLog, isStopCache, throttlingType, typeFilters, statusFilters } = storeToRefs(useApp());
const isThrottling = ref(!!throttlingType.value);
watch(isThrottling, () => {
  if (!isThrottling.value) {
    throttlingType.value = null;
  }
});
const showThrottlingPopover = computed(() => isThrottling.value && throttlingType.value === null);
const typeList = [
  'FETCH/XHR',
  'DOCUMENT',
  'CSS',
  'JS',
  'FONT',
  'PICTURE',
  'MEDIA',
  'LIST',
  'WASM',
  'OTHER',
];
const statusList = [
  '2xx',
  '3xx',
  '4xx',
  '5xx',
  'CUSTOM',
];
const throttlingLabel = computed(() => {
  return `THROTTLING (${Object.keys(NETWORK_PRESETS).find(t => t === throttlingType.value) || 'OFF'})`;
});
function handleThrottlingChange(value: string | null) {
  throttlingType.value = value;
  setNetworkThrottling(value);
}
function filterChange(t: Ref<string[]>, value: string) {
  if (t.value.includes(value)) {
    t.value = t.value.filter(s => s !== value);
  }
  else {
    t.value.push(value);
  }
}
function handleStatusChange(status: string) {
  filterChange(statusFilters, status);
}
function handleTypeChange(type: string) {
  filterChange(typeFilters, type);
}
function keepLogChange(value: boolean) {
  isKeepLog.value = value;
}
function stopCacheChange(value: boolean) {
  value ? enableDisableCache() : disableDisableCache();
}
</script>

<template>
  <section class="py-2 flex flex-col gap-4 transition-all duration-500 mt-2">
    <div class="flex flex-wrap gap-2 gap-y-4">
      <QuasiSwitch
        v-model:value="isKeepLog"
        text="KEEP LOG"
        @change="keepLogChange"
      />
      <QuasiSwitch
        v-model:value="isStopCache"
        text="STOP CACHE"
        @change="stopCacheChange"
      />
      <ElPopover placement="top" :width="400" :visible="showThrottlingPopover">
        <div class="flex gap-2 p-2!">
          <QuasiButton v-for="t in Object.keys(NETWORK_PRESETS)" :key="t" @click="handleThrottlingChange(t)">
            {{ t }}
          </QuasiButton>
        </div>
        <template #reference>
          <QuasiSwitch
            v-model:value="isThrottling"
            :text="throttlingLabel"
            @change="handleThrottlingChange(null)"
          />
        </template>
      </ElPopover>
    </div>
    <QuasiContainer class="py-3! px-4!">
      <h1 class="font-bold text-lg text-text_primary_blue title">
        TYPES FILTER:
      </h1>
      <article class="flex gap-2 mt-2">
        <div class="flex gap-3 pr-2">
          <QuasiButton class="h-full px-6" :activated="typeFilters.length === 0" @click="() => typeFilters = []">
            ALL
          </QuasiButton>
          <QuasiBar class="h-full" />
        </div>
        <div class=" flex flex-wrap gap-2 gap-y-4">
          <QuasiButton
            v-for="type in typeList"
            :key="type"
            :activated="typeFilters.includes(type)"
            @click="handleTypeChange(type)"
          >
            {{ type }}
          </QuasiButton>
        </div>
      </article>
    </QuasiContainer>
    <QuasiContainer class="py-3! px-4! relative">
      <h1 class="font-bold text-lg text-text_primary_blue title">
        STATUS FILTER:
      </h1>
      <RoundButton class="absolute -top-2 -right-2">
        <ElTooltip content="Custom your status filter" placement="left">
          <IconFileSettingsFilled :size="18" />
        </ElTooltip>
      </RoundButton>
      <article class="flex flex-wrap gap-2 mt-2">
        <div class="flex gap-2">
          <div class="flex gap-3 pr-2">
            <QuasiButton class="h-full px-6" :activated="statusFilters.length === 0" @click="() => statusFilters = []">
              ALL
            </QuasiButton>
            <QuasiBar class="h-full" />
          </div>
          <div class="flex flex-wrap gap-2 gap-y-4">
            <QuasiButton
              v-for="status in statusList"
              :key="status"
              :activated="statusFilters.includes(status)"
              @click="handleStatusChange(status)"
            >
              {{ status }}
            </QuasiButton>
          </div>
        </div>
      </article>
    </QuasiContainer>
    <QuasiContainer class="flex px-2! justify-between!">
      <RoundButton @click="clearHook.trigger">
        <ElTooltip content="Clear network logs" placement="top">
          <IconForbid2Filled :size="18" />
        </ElTooltip>
      </RoundButton>
      <QuasiBar class="h-8!" />
      <QuasiInput place-holder="Filter..." />
    </QuasiContainer>
  </section>
</template>

<style scoped>
</style>
