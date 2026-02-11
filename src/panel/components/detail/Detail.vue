<script setup lang="ts">
import type { JSONDetail } from '@/panel/types/detail';
import { IconX } from '@tabler/icons-vue';
import CookieDetail from './CookieDetail.vue';
import OverViewDetail from './OverViewDetail.vue';
import RequestDetail from './RequestDetail.vue';
import ResponseDetail from './ResponseDetail.vue';
import TimeLineDetail from './TimeLineDetail.vue';

defineProps<{
  detail: JSONDetail | null
  height: number
}>();
const emit = defineEmits<{ close: [] }>();
const menus = [
  { title: 'Overview', component: OverViewDetail },
  { title: 'RequestBody', component: RequestDetail },
  { title: 'ResponseBody', component: ResponseDetail },
  { title: 'Cookie', component: CookieDetail },
  { title: 'TimeLine', component: TimeLineDetail },
];
const activeIndex = ref(0);
</script>

<template>
  <section
    class=" transition-all duration-500 relative z-2 px-4 bg-background"
    :style="{ height: `${height}px` }"
  >
    <div class="detail-container w-full h-[96%] mt-[3%] flex flex-col gap-2">
      <RoundButton class="p-1! -top-2 -right-2 absolute z-10" @click="emit('close')">
        <IconX :size="18" />
      </RoundButton>
      <QuasiTab v-model:active-index="activeIndex" :menus="menus" />
      <article class="flex-1 overflow-hidden content">
        <component :is="menus[activeIndex]!.component" :detail="detail" class="w-full h-full overflow-auto" />
      </article>
      <div />
    </div>
  </section>
</template>

<style scoped>
.detail-container {
  padding: 4px;
  position: relative;
  border-radius: 12px;
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
}
.content {
  border-radius: 8px;
  box-shadow:
    inset 2px 2px 4px var(--btn_shadow_r),
    inset -2px -2px 4px var(--btn_shadow_l);
}
</style>
