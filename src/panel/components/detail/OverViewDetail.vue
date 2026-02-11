<script setup lang="ts">
import type { JSONDetail } from '@/panel/types/detail';
import { IconFileNeutral } from '@tabler/icons-vue';

defineProps<{ detail: JSONDetail | null }>();
</script>

<template>
  <section>
    <h1 class="font-bold flex items-center border-b border-gray_300 py-2">
      <IconFileNeutral :size="16" />
      <span>BASIC INFO</span>
    </h1>
    <article class="flex flex-col gap-1 px-4 py-2">
      <div v-for="(value, key) in detail?.row" :key="key" class="flex items-start">
        <p class="w-64 font-bold shrink-0">
          {{ key }}
        </p>
        <p class="flex-1 w-0 break-all">
          {{ value }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped></style>
