<script setup lang="ts">
import { IconCopyrightFilled, IconLocationFilled, IconLockFilled } from '@tabler/icons-vue';

const props = defineProps<{
  contextInfo?: { event: MouseEvent, row: chrome.devtools.network.Request }
  close: () => void
}>();
const contextMenuRef = useTemplateRef<HTMLDivElement | null>('contextMenuRef');
onClickOutside(contextMenuRef, props.close);
const contextMenus = [
  { label: 'Copy all', icon: IconCopyrightFilled },
  { label: 'Copy to postman', icon: IconLocationFilled },
  { label: 'Lock', icon: IconLockFilled },
];
function handleOperation(item: (typeof contextMenus)[number]) {
  props.close();
}
</script>

<template>
  <QuasiContainer
    v-if="props.contextInfo"
    ref="contextMenuRef"
    class="absolute z-10 max-h-[200px] overflow-auto rounded! p-4! flex flex-col gap-2"
    :style="{ top: `${props.contextInfo.event.y}px`, left: `${props.contextInfo.event.x}px` }"
  >
    <div v-for="item in contextMenus" :key="item.label">
      <QuasiButton class="px-6 py-1 hover:text-text_primary_red!" @click="handleOperation(item)">
        <ElTooltip :content="item.label" placement="right">
          <component :is="item.icon" :size="24" />
        </ElTooltip>
      </QuasiButton>
    </div>
  </QuasiContainer>
</template>

<style scoped>
</style>
