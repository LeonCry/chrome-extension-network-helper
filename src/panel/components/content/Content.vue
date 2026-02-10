<script setup lang="tsx">
import type { Column, TableV2Instance } from 'element-plus';
import { IconTableFilled } from '@tabler/icons-vue';
import { TableV2FixedDir } from 'element-plus';
import { useEvents } from '@/panel/hooks/useEvent';
import { useApp } from '@/panel/stores/app';
import { sizeTransfer } from '@/panel/utils/size-transfer';
import { timeTransfer } from '@/panel/utils/time-transfer';
import { urlTransfer } from '@/panel/utils/ulr-transfer';
import { getResourceTypeIcon } from './resource-type-icons';

const props = defineProps<{
  height: number
  checkDetail: (row: ChromeRequest) => void
  contTrans: string
}>();
const { isKeepLog, typeFilters, statusFilters, searchValue, isSearchByKey } = storeToRefs(useApp());
const { onClear } = useEvents();
const customColumns = ref<Column[]>([
  {
    key: '_miniUrl',
    dataKey: '_miniUrl',
    title: 'NAME',
    width: 180,
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ rowData }: { rowData: ChromeRequest }) => {
      const IconComponent = getResourceTypeIcon(rowData._resourceType);
      return (
        <div
          class="w-full cursor-pointer text-text_primary_blue! hover:text-text_primary_red! hover:underline py-[2px]"
          onContextmenu={e => handleContextMenu(e, rowData)}
          onMouseenter={e => handleTooltipMouseEnter(e, rowData.request.url)}
          onMouseleave={() => handleTooltipMouseLeave()}
          onClick={() => goDetails(rowData)}
        >
          <IconComponent
            class="absolute left-1 top-1/2 translate-y-[-50%] text-text_slate"
            size={18}
          />
          <p class="truncate ml-4">
            {rowData._miniUrl}
          </p>
        </div>
      );
    },
  },
  { key: 'response.status', dataKey: 'response.status', title: 'STATUS', width: 60 },
  { key: 'request.method', dataKey: 'request.method', title: 'TYPE', width: 60 },
  { key: '_size', dataKey: '_size', title: 'SIZE', width: 100 },
  { key: '_time', dataKey: '_time', title: 'TIME', width: 100 },
]);
const tableRef = useTemplateRef<TableV2Instance>('tableRef');
const tableData = ref<ChromeRequest[]>([]);
const filteredTableData = computed(() => {
  return tableData.value.filter((item) => {
    const searchResult = isSearchByKey.value
      ? item._miniUrl.includes(searchValue.value)
      : item.request.url.includes(searchValue.value);
    const searchEffect = searchValue.value.length > 0 ? searchResult : true;
    const typeFilter = [...typeFilters.value];
    if (typeFilter.includes('fetch')) typeFilter.push('xhr');
    const typeResult = typeFilter.includes(item._resourceType);
    const typeEffect = typeFilter.length > 0 ? typeResult : true;
    const statusResult = statusFilters.value.includes(String(item.response.status)[0] || 'pending');
    const statusEffect = statusFilters.value.length > 0 ? statusResult : true;
    return typeEffect && statusEffect && searchEffect;
  });
});
onClear(() => {
  tableData.value = [];
});

async function onRequestFinished(request: chrome.devtools.network.Request) {
  // formatter
  request._miniUrl = urlTransfer(request.request.url);
  request._size = sizeTransfer(request.response.content.size);
  request._time = timeTransfer(request.time);
  tableData.value.push(request as ChromeRequest);
  await nextTick();
  tableRef.value?.scrollToRow(tableData.value.length);
  // console.log(request);
}
chrome.devtools.network.onRequestFinished.addListener(onRequestFinished);
// 页面刷新
function onNavigated() {
  if (isKeepLog.value) return;
  tableData.value = [];
}
chrome.devtools.network.onNavigated.addListener(onNavigated);
onBeforeUnmount(() => {
  chrome.devtools.network.onRequestFinished.removeListener(onRequestFinished);
  chrome.devtools.network.onNavigated.removeListener(onNavigated);
});
// 右键菜单
const showContextMenu = ref(false);
const contextInfo = ref<{ event: MouseEvent, row: ChromeRequest }>();
function handleContextMenu(event: MouseEvent, row: ChromeRequest) {
  showContextMenu.value = true;
  contextInfo.value = { event, row };
  event.preventDefault();
}
function closeContextMenu() {
  showContextMenu.value = false;
}
const tooltipVisible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipContent = ref('');
function handleTooltipMouseEnter(e: MouseEvent, content: string) {
  triggerRef.value = e.currentTarget as HTMLDivElement;
  tooltipContent.value = content;
  tooltipVisible.value = true;
}
function handleTooltipMouseLeave() {
  tooltipVisible.value = false;
}
const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
function goDetails(row: ChromeRequest) {
  tooltipVisible.value = false;
  props.checkDetail(row);
}
const { height: containerH, width: containerW } = useElementBounding(containerRef);
</script>

<template>
  <section
    ref="containerRef"
    class="table-container relative transition-all duration-500 delay-200 mt-2 z-0 mx-4"
    :style="{ height: `${height}px`, transform: contTrans }"
  >
    <RoundButton class="absolute -top-2 -right-2 z-10">
      <ElTooltip content="Custom your table fields" placement="left">
        <IconTableFilled :size="18" />
      </ElTooltip>
    </RoundButton>
    <ElTableV2
      v-if="containerH"
      ref="tableRef"
      :data="filteredTableData"
      :height="containerH"
      :columns="customColumns"
      :width="containerW"
      fixed
      class="v2table-class"
    />
    <ElTooltip
      v-if="containerRef"
      :append-to="containerRef!"
      :visible="tooltipVisible"
      :virtual-ref="triggerRef!"
      virtual-triggering
      :content="tooltipContent"
      placement="top"
    />
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
.v2table-class {
  border-radius: 12px;
  font-size: 12px;
}
:deep(.v2table-class .el-table-v2__main) {
  background-color: var(--container_bg);
}

:deep(.v2table-class .el-table-v2__header) {
  background: transparent;
}
:deep(.v2table-class .el-table-v2__header-cell) {
  background: var(--btn_bg);
  border-right: 1px solid var(--gray_300);
  border-bottom: 1px solid var(--gray_300);
}
:deep(.v2table-class .el-table-v2__row-cell) {
  background: var(--btn_bg);
  border: none;
  border-bottom: 1px solid var(--gray_300);
}
:deep(.v2table-class .el-table-v2__row:hover .el-table-v2__row-cell) {
  background: var(--table_hover_bg);
}
</style>
