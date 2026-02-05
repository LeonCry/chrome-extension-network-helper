<script setup lang="ts">
defineProps<{ activated?: boolean }>();
</script>

<template>
  <button class="px-4 py-1 btn" :class="{ 'btn-activated': activated }">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--btn_bg);
  cursor: pointer;
  border: 1px solid var(--btn_bg);
  transition: all 0.3s;
  border-radius: 8px;
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
}
.btn:hover {
  color: var(--btn_hover);
  font-weight: 1000;
  box-shadow:
    6px 6px 12px var(--btn_shadow_r),
    -6px -6px 12px var(--btn_shadow_l);
}
.btn:active {
  box-shadow:
    inset 4px 4px 12px var(--btn_shadow_r),
    inset -4px -4px 12px var(--btn_shadow_l);
}
.btn-activated {
  color: var(--btn_activated);
  font-weight: 1000;
}
</style>
