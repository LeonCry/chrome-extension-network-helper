<script setup lang="ts">
defineProps<{ activated?: boolean }>();
</script>

<template>
  <button class="btn" :class="{ 'btn-activated': activated }">
    <slot class="inner-slot" />
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--btn_bg);
  cursor: pointer;
  border: 1px solid var(--btn_bg);
  transition: all 0.3s;
  padding: 6px;
  border-radius: 100%;
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
}
.btn:hover {
  font-weight: 1000;
  color: var(--btn_hover);
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
