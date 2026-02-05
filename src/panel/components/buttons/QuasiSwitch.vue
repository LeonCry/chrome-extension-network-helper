<script setup lang="ts">
const props = defineProps<{
  value: boolean
  text: string
}>();
const emits = defineEmits<{ 'update:value': [boolean] }>();
const value = useVModel(props, 'value', emits);
const uid = `quasi-switch-${Math.random().toString(36).slice(2)}`;
</script>

<template>
  <div class="switch-holder">
    <p class="px-2">
      {{ text }}
    </p>
    <div class="switch-toggle">
      <input
        :id="uid"
        v-model="value"
        type="checkbox"
      >
      <label :for="uid" />
    </div>
  </div>
</template>

<style scoped>
.switch-holder {
  display: flex;
  padding: 2px 4px;
  border-radius: 8px;
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
  justify-content: space-between;
  align-items: center;
}

.switch-toggle {
  height: 30px;
  margin-right: 4px;
}

.switch-toggle > input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  z-index: -2;
}

.switch-toggle > input[type='checkbox'] + label {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  border-radius: 20px;
  margin-top: 3px;
  cursor: pointer;
  box-shadow:
    inset 4px 4px 8px var(--btn_shadow_r),
    inset -4px -4px 8px var(--btn_shadow_l);
}

.switch-toggle > input[type='checkbox'] + label::before {
  position: absolute;
  content: 'P';
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  top: 4px;
  left: 4px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: var(--btn_bg);
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
  transition: 0.3s ease-in-out;
}

.switch-toggle > input[type='checkbox']:checked + label::before {
  left: 50%;
  content: 'O';
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: var(--primary);
  background-color: var(--btn_activated);
  box-shadow: 0px 0px 6px var(--btn_activated);
}
</style>
