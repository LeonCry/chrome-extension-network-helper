<script setup lang="ts">
import { IconFileSettingsFilled } from '@tabler/icons-vue';
import { useApp } from '@/panel/stores/app';
import { disableDisableCache, enableDisableCache } from '@/panel/utils/cache-control';

const { isKeepLog, isStopCache, throttlingType, typeFilters, statusFilters } = storeToRefs(useApp());
const isThrottling = ref(!!throttlingType.value);
watch(isThrottling, () => {
  if (!isThrottling.value) {
    throttlingType.value = 0;
  }
});
const showThrottlingPopover = computed(() => isThrottling.value && throttlingType.value === 0);
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
const throttlingList = [
  { label: 'High 4G', value: 1 },
  { label: 'Low 4G', value: 2 },
  { label: '3G', value: 3 },
  { label: 'OFFLINE', value: 4 },
];
const throttlingLabel = computed(() => {
  return `THROTTLING (${throttlingList.find(t => t.value === throttlingType.value)?.label || 'OFF'})`;
});
function handleThrottlingChange(value: number) {
  throttlingType.value = value;
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
        key="keepLog"
        v-model:value="isKeepLog"
        text="KEEP LOG"
        @change="keepLogChange"
      />
      <QuasiSwitch
        key="stopCache"
        v-model:value="isStopCache"
        text="STOP CACHE"
        @change="stopCacheChange"
      />
      <ElPopover placement="top" :width="400" :visible="showThrottlingPopover">
        <div class="flex gap-2 p-2!">
          <QuasiButton v-for="t in throttlingList" :key="t.value" @click="handleThrottlingChange(t.value)">
            {{ t.label }}
          </QuasiButton>
        </div>
        <template #reference>
          <QuasiSwitch key="throttlingMode" v-model:value="isThrottling" :text="throttlingLabel" />
        </template>
      </ElPopover>
    </div>
    <QuasiContainer class="py-3! px-4!">
      <h1 class="font-bold text-lg text-text_primary_blue title">
        TYPES FILTER:
      </h1>
      <article class="flex gap-2 mt-2">
        <div class="pr-3 border-r-2 border-gray-300">
          <QuasiButton class="h-full px-6" :activated="typeFilters.length === 0" @click="() => typeFilters = []">
            ALL
          </QuasiButton>
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
          <div class="pr-3 border-r-2 border-gray-300">
            <QuasiButton class="h-full px-6" :activated="statusFilters.length === 0" @click="() => statusFilters = []">
              ALL
            </QuasiButton>
          </div>
          <div class=" flex flex-wrap gap-2 gap-y-4">
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
    <QuasiContainer class="flex px-2!">
      <QuasiInput class="w-72" place-holder="Filter..." />
      <QuasiButton>FILTER</QuasiButton>
    </QuasiContainer>
  </section>
</template>

<style scoped>
</style>
