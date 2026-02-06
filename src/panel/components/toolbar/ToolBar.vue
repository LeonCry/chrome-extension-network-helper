<script setup lang="ts">
import { IconFileSettingsFilled } from '@tabler/icons-vue';

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
  'High 4G',
  'Low 4G',
  '3G',
  'OFFLINE',
];
const keepLog = ref(false);
const stopCache = ref(false);
const throttlingMode = ref(false);
</script>

<template>
  <section class="py-2 flex flex-col gap-4 transition-all duration-500 mt-2">
    <div class="flex flex-wrap gap-2 gap-y-4">
      <QuasiSwitch key="keepLog" v-model:value="keepLog" text="KEEP LOG" />
      <QuasiSwitch key="stopCache" v-model:value="stopCache" text="STOP CACHE" />
      <ElPopover placement="top" :width="400" :visible="throttlingMode">
        <div class="flex gap-2 p-2!">
          <QuasiButton v-for="t in throttlingList" :key="t">
            {{ t }}
          </QuasiButton>
        </div>
        <template #reference>
          <QuasiSwitch key="throttlingMode" v-model:value="throttlingMode" text="THROTTLING" />
        </template>
      </ElPopover>
    </div>
    <QuasiContainer class="py-3! px-4!">
      <h1 class="font-bold text-lg text-text_primary_blue title">
        TYPES FILTER:
      </h1>
      <article class="flex gap-2 mt-2">
        <div class="pr-3 border-r-2 border-gray-300">
          <QuasiButton class="h-full px-6">
            ALL
          </QuasiButton>
        </div>
        <div class=" flex flex-wrap gap-2 gap-y-4">
          <QuasiButton v-for="type in typeList" :key="type">
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
            <QuasiButton class="h-full px-6">
              ALL
            </QuasiButton>
          </div>
          <div class=" flex flex-wrap gap-2 gap-y-4">
            <QuasiButton v-for="status in statusList" :key="status">
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
