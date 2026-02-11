<script setup lang="ts">
import type { TableColumn } from '@/panel/components/content/table-columns';
import { IconArrowBigUpFilled, IconSettingsFilled, IconSunHighFilled } from '@tabler/icons-vue';
// 默认详情高度
const DEFAULT_DETAIL_HEIGHT = 400;
// 搜索框高度
const TOOL_BAR_HEIGHT = 130;
// gap高度
const GAP_HEIGHT = 8;
function toggleTheme() {
  document.documentElement.classList.add('blend-dark');
}
// 是否展示工具栏
const showBar = ref(true);
function handleShowBar() {
  showBar.value = !showBar.value;
}
// 查看详情
const detailRow = ref<string | null>(null);
function checkDetail(row: TableColumn) {
  row.getContent((content) => {
    detailRow.value = content;
  });
}
const toolBarRef = useTemplateRef('toolBarRef');
const mainRef = useTemplateRef('mainRef');
const headerRef = useTemplateRef('headerRef');
const { height: mainH } = useElementBounding(mainRef);
const { height: headerH } = useElementBounding(headerRef);
const { height: toolBarH } = useElementBounding(toolBarRef);
// detail高度
const detailH = ref(DEFAULT_DETAIL_HEIGHT);
// 可分配高度
const assignH = computed(() => mainH.value - headerH.value);
// content高度
const contentH = computed(() => {
  const bh = showBar.value ? toolBarH.value : 0;
  const dh = detailRow.value ? detailH.value : 0;
  return assignH.value - bh - dh - GAP_HEIGHT * 2;
});
const transformY = computed(() => {
  let detailTrans = 0;
  if (!showBar.value) detailTrans -= toolBarH.value - TOOL_BAR_HEIGHT / 2;
  if (!detailRow.value) detailTrans += detailH.value;
  return {
    barTrans: `translateY(-${!showBar.value ? toolBarH.value + headerH.value - TOOL_BAR_HEIGHT : 0}px)`,
    contTrans: `translateY(-${!showBar.value ? toolBarH.value - TOOL_BAR_HEIGHT / 2 : 0}px)`,
    detailTrans: `translateY(${detailTrans}px)`,
  };
});
</script>

<template>
  <main
    ref="mainRef"
    class="w-full h-full bg-background text-foreground pb-4 text-sm overflow-hidden"
  >
    <header
      ref="headerRef"
      class="flex items-center gap-2 bg-background py-4 px-4 z-10 border-b border-gray-300 relative"
    >
      <img src="/logo-Q-light.png" alt="logo" class="w-16 absolute">
      <span class="flex-1" />
      <RoundButton @click="handleShowBar">
        <IconArrowBigUpFilled
          :size="20"
          class="transition-all duration-300"
          :class="!showBar ? 'rotate-180 text-text_primary_red' : ''"
        />
      </RoundButton>
      <RoundButton @click="toggleTheme">
        <IconSunHighFilled :size="20" />
      </RoundButton>
      <RoundButton>
        <IconSettingsFilled :size="20" />
      </RoundButton>
    </header>
    <ToolBar
      ref="toolBarRef"
      :class="!showBar ? '' : 'delay-300'"
      :style="{ transform: transformY.barTrans }"
    />
    <Content
      :height="contentH"
      :check-detail="checkDetail"
      :cont-trans="transformY.contTrans"
    />
    <Detail
      v-model:row="detailRow"
      :height="detailH"
      :class="!detailRow ? '' : 'delay-200'"
      :style="{ transform: transformY.detailTrans }"
    />
  </main>
</template>
