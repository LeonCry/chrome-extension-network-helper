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
  <section
    class=" transition-all duration-500 relative z-2 px-4 bg-background"
    :style="{ height: `${height}px` }"
  >
    <div class="detail-container w-full h-[96%] mt-[3%]">
      <RoundButton class="p-1! -top-2 -right-2 absolute z-10" @click="close">
        <IconX :size="18" />
      </RoundButton>
      <QuasiTab />
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
</style>
