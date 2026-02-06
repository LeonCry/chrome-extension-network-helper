<script setup lang="ts"></script>

<template>
  <div class="input-container">
    <slot />
  </div>
</template>

<style scoped>
.input-container {
  background: white;
  border-radius: 12px;
  background: linear-gradient(173deg, var(--container_bg) 0%, var(--container_bg) 100%);
  box-shadow:
    4px 4px 10px var(--btn_shadow_r),
    -4px -4px 10px var(--btn_shadow_l);
  padding: 4px;
  gap: 12px;
}
</style>
