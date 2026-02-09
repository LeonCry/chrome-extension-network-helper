<script setup lang="ts"></script>

<template>
  <div class="bar w-1 h-full" />
</template>

<style scoped>
.bar {
  background-color: var(--btn_bg);
  border-radius: 8px;
  box-shadow:
    1px 1px 1px var(--btn_shadow_r),
    -1px -1px 1px var(--btn_shadow_l);
}
</style>
