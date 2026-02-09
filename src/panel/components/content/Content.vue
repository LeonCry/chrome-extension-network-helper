<script setup lang="ts">
import type { EventHook } from '@vueuse/core';
import { IconTableFilled } from '@tabler/icons-vue';
import { useApp } from '@/panel/stores/app';
import { CLEAR_HOOK_KEY } from '@/panel/symbols';
import sizeTransfer from '@/panel/utils/size-transfer';
import timeTransfer from '@/panel/utils/time-transfer';

defineProps<{ height: number, checkDetail: (row: chrome.devtools.network.Request) => void, contTrans: string }>();
const appStore = useApp();
const columns = [
  { field: 'response.status', label: 'STATUS', minWidth: '12%' },
  { field: 'request.method', label: 'TYPE', minWidth: '10%' },
  { field: 'response.content.size', label: 'SIZE', minWidth: '10%', formatter: sizeTransfer },
  { field: 'time', label: 'TIME', minWidth: '10%', formatter: timeTransfer },
];
const tableData = ref<chrome.devtools.network.Request[]>([]);
const clearHook = inject<EventHook<void>>(CLEAR_HOOK_KEY)!;
clearHook.on(() => {
  tableData.value = [];
});
function onRequestFinished(request: chrome.devtools.network.Request) {
  tableData.value.push(request);
  // console.log(request);
}
chrome.devtools.network.onRequestFinished.addListener(onRequestFinished);
// 页面刷新
function onNavigated() {
  if (appStore.isKeepLog) return;
  tableData.value = [];
}
chrome.devtools.network.onNavigated.addListener(onNavigated);
onBeforeUnmount(() => {
  chrome.devtools.network.onRequestFinished.removeListener(onRequestFinished);
  chrome.devtools.network.onNavigated.removeListener(onNavigated);
});
// 右键菜单
const showContextMenu = ref(false);
const contextInfo = ref<{ event: MouseEvent, row: chrome.devtools.network.Request }>();
function handleContextMenu(event: MouseEvent, row: chrome.devtools.network.Request) {
  showContextMenu.value = true;
  contextInfo.value = { event, row };
  event.preventDefault();
}
function closeContextMenu() {
  showContextMenu.value = false;
}
</script>

<template>
  <section
    class="table-container relative transition-all duration-500 delay-200 mt-2"
    :style="{ height: `${height}px`, transform: contTrans }"
  >
    <RoundButton class="absolute -top-2 -right-2 z-10">
      <ElTooltip content="Custom your table fields" placement="left">
        <IconTableFilled :size="18" />
      </ElTooltip>
    </RoundButton>
    <ElTable
      v-if="height"
      :data="tableData"
      height="100%"
      class="neumorph-table"
      style="width: 100%;height: 100%;"
    >
      <ElTableColumn
        prop="request.url"
        label="NAME"
        min-width="30%"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <div
            class="cursor-pointer text-text_primary_blue! hover:text-text_primary_red! py-[2px] truncate"
            @contextmenu="(e) => handleContextMenu(e, row)"
            @click="checkDetail(row)"
          >
            {{ row.request.url }}
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.label"
        :min-width="column.minWidth"
        :formatter="column.formatter"
        show-overflow-tooltip
      />
    </ElTable>
  </section>
  <ContextMenu v-if="showContextMenu" :context-info="contextInfo" :close="closeContextMenu" />
</template>

<style scoped>
.table-container {
  border-radius: 10px;
  box-shadow:
    4px 4px 8px var(--btn_shadow_r),
    -4px -4px 8px var(--btn_shadow_l);
}
.neumorph-table {
  border-radius: 12px;
  font-size: 12px;
  background: var(--container_bg);
  overflow: hidden;
}

:deep(.neumorph-table .el-table__inner-wrapper) {
  background: transparent;
}
:deep(.neumorph-table .el-table__header-wrapper),
:deep(.neumorph-table .el-table__body-wrapper) {
  background: transparent;
}

:deep(.neumorph-table .el-table__header .el-table__cell) {
  background: var(--btn_bg);
  border-right: 1px solid var(--gray_300);
  border-bottom: 1px solid var(--gray_300);
}

:deep(.neumorph-table .el-table__row .el-table__cell) {
  background: var(--btn_bg);
  border-bottom: 1px solid var(--gray_300);
  padding: 0;
}

:deep(.neumorph-table .el-table__row:hover .el-table__cell) {
  background: var(--table_hover_bg);
}
</style>
