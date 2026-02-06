<script setup lang="ts">
const menus = [
  'Overview',
  'Request body',
  'Response body',
  'Cookie',
  'Storage',
];
const tabRefs = useTemplateRefsList<HTMLDivElement>();
const sliderBounding = ref({
  left: 0,
  width: 0,
});
const activeIndex = ref(0);
function tabChange(index: number) {
  activeIndex.value = index;
  const r = tabRefs.value[index];
  sliderBounding.value = {
    left: r?.offsetLeft || 0,
    width: r?.offsetWidth || 0,
  };
}
onMounted(() => {
  tabChange(activeIndex.value);
});
</script>

<template>
  <header class="w-max h-10 tab flex items-center gap-2 px-2 relative">
    <div
      v-for="(menu, index) in menus"
      ref="tabRefs"
      :key="index"
      class="tab-child px-2 py-1 rounded-md text-center cursor-pointer z-10 select-none"
      :class="{ 'tab-child-active': index === activeIndex }"
      @click="tabChange(index)"
    >
      {{ menu }}
    </div>
    <div
      class="tab-slider absolute top-0 left-0 h-7 mt-[7px]"
      :style="{ left: `${sliderBounding.left}px`, width: `${sliderBounding.width}px` }"
    />
  </header>
</template>

<style scoped>
.tab {
  border-radius: 8px;
  box-shadow:
    inset 4px 4px 6px var(--btn_shadow_r),
    inset -4px -4px 6px var(--btn_shadow_l);
}
.tab-child {
  border-radius: 8px;
  transition: all 0.1s;
  box-shadow:
    0.5px 0.5px 0.5px var(--btn_shadow_r),
    -0.5px -0.5px 0.5px var(--btn_shadow_l);
}
.tab-child-active {
  color: var(--text_primary_blue);
  font-weight: bolder;
  box-shadow: none;
}
.tab-slider {
  background-color: var(--btn_bg);
  cursor: pointer;
  border: 1px solid var(--btn_bg);
  transition: all 0.3s;
  border-radius: 8px;
  box-shadow:
    4px 4px 4px var(--btn_shadow_r),
    -4px -4px 4px var(--btn_shadow_l);
}
</style>
