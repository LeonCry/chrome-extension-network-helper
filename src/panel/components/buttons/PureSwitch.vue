<script setup lang="ts">
const props = defineProps<{ value: boolean }>();
const emits = defineEmits<{ 'update:value': [boolean], 'change': [boolean] }>();
interface InputEvent extends Event { target: HTMLInputElement }
const value = useVModel(props, 'value', emits);
const uid = `quasi-switch-${Math.random().toString(36).slice(2)}`;
</script>

<template>
  <div class="switch-toggle">
    <input
      :id="uid"
      v-model="value"
      type="checkbox"
      @change="(e) => emits('change', (e as InputEvent).target.checked ?? false)"
    >
    <label :for="uid" />
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
  transition: all 0.3s;
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
  width: 80px;
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
  content: 'ALL';
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  top: 4px;
  left: 6px;
  width: 48px;
  height: 18px;
  border-radius: 12px;
  color: var(--primary);
  background-color: var(--btn_activated);
  box-shadow:
    -2px -2px 8px var(--btn_activated),
    4px 4px 4px var(--btn_shadow_r);
  transition: 0.3s ease-in-out;
}

.switch-toggle > input[type='checkbox']:checked + label::before {
  left: 33%;
  position: absolute;
  content: 'KEY';
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  top: 4px;
  width: 48px;
  height: 18px;
  border-radius: 12px;
  color: var(--primary);
  background-color: var(--color_green);
  box-shadow:
    -2px -2px 8px var(--color_green),
    4px 4px 4px var(--btn_shadow_r);
  transition: 0.3s ease-in-out;
}
</style>
