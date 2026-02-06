<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';

const props = defineProps<{
  row: string | null
  height: number
}>();
const emits = defineEmits<{ 'update:row': [string | null] }>();
const row = useVModel(props, 'row', emits);
function close() {
  row.value = null;
}
</script>

<template>
  <section class="detail-container transition-all duration-500 mt-2" :style="{ height: `${height}px` }">
    <RoundButton class="p-1! -top-2 -right-2 absolute z-10" @click="close">
      <IconX :size="18" />
    </RoundButton>
    <QuasiTab />
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
</style>
