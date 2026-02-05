<script setup lang="ts">
defineProps<{ placeHolder?: string }>();
</script>

<template>
  <input class="input" type="text" :placeholder="placeHolder">
</template>

<style scoped>
.input {
  border-radius: 12px;
  background: var(--btn_bg);
  box-shadow:
    inset 5px 5px 10px var(--btn_shadow_r),
    inset -5px -5px 10px var(--btn_shadow_l),
    0px 0px 100px var(--btn_shadow_r),
    0px 0px 100px var(--btn_shadow_l);
  width: 100%;
  padding: 0 24px;
  border: none;
  color: var(--color-foreground);
}

.input:focus {
  outline: none;
}
</style>
