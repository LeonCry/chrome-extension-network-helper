<template>
  <button class="btn">
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
  color: var(--btn_activated);
  box-shadow:
    6px 6px 12px var(--btn_shadow_r),
    -6px -6px 12px var(--btn_shadow_l);
}
.btn:active {
  box-shadow:
    inset 4px 4px 12px var(--btn_shadow_r),
    inset -4px -4px 12px var(--btn_shadow_l);
}
</style>
