<script setup lang="tsx">
import type { Column, TableV2Instance } from 'element-plus';
import type { TableColumn } from './table-columns';
import { IconTableFilled } from '@tabler/icons-vue';
import { TableV2FixedDir } from 'element-plus';
import { useEvents } from '@/panel/hooks/useEvent';
import { useApp } from '@/panel/stores/app';
import { sizeTransfer } from '@/panel/utils/size-transfer';
import { timeTransfer } from '@/panel/utils/time-transfer';
import { urlTransfer } from '@/panel/utils/ulr-transfer';
import { createRequestPool } from './request-pool';
import { getResourceTypeIcon } from './resource-type-icons';
import { baseColumn } from './table-columns';

const props = defineProps<{
  height: number
  checkDetail: (row: TableColumn) => void
  contTrans: string
}>();
const { isKeepLog, typeFilters, statusFilters, searchValue, isSearchByKey } = storeToRefs(useApp());
const { onClear } = useEvents();
const customColumns = ref<(Column & { key: keyof TableColumn })[]>([
  {
    key: 'miniUrl',
    dataKey: 'miniUrl',
    title: 'NAME',
    width: 160,
    fixed: TableV2FixedDir.LEFT,
    cellRenderer: ({ rowData }: { rowData: TableColumn }) => {
      const IconComponent = getResourceTypeIcon(rowData.type, rowData.status === 'PENDING');
      return (
        <div
          class="w-full cursor-pointer text-text_primary_blue! hover:text-text_primary_red! hover:underline py-[2px]"
          onContextmenu={e => handleContextMenu(e, rowData)}
          onMouseenter={e => handleTooltipMouseEnter(e, rowData.url)}
          onMouseleave={() => handleTooltipMouseLeave()}
          onClick={() => goDetails(rowData)}
        >
          <IconComponent
            class={`absolute left-1 top-1/2 translate-y-[-50%] text-text_slate ${rowData.status === 'PENDING' ? 'animate-spin' : ''}`}
            size={18}
          />
          <p class="truncate ml-4" style="letter-spacing: 0.5px;">
            {rowData.miniUrl}
          </p>
        </div>
      );
    },
  },
  { key: 'status', dataKey: 'status', title: 'STATUS', width: 60 },
  { key: 'method', dataKey: 'method', title: 'METHOD', width: 80 },
  { key: 'type', dataKey: 'type', title: 'TYPE', width: 60 },
  { key: 'size', dataKey: 'size', title: 'SIZE', width: 80 },
  { key: 'time', dataKey: 'time', title: 'TIME', width: 80 },
  { key: '_requestId', dataKey: '_requestId', title: '_requestId', width: 80 },
]);
const tableRef = useTemplateRef<TableV2Instance>('tableRef');
const tableData = ref<TableColumn[]>([]);
const filteredTableData = computed(() => {
  return tableData.value.filter((item) => {
    const getSearchResult = () => isSearchByKey.value
      ? item.miniUrl.includes(searchValue.value)
      : item.url.includes(searchValue.value);
    const searchEffect = searchValue.value.length > 0 ? getSearchResult() : true;
    const getTypeFilterResult = () => {
      const typeFilter = [...typeFilters.value];
      if (typeFilter.includes('fetch')) typeFilter.push('xhr');
      return typeFilter.includes(item.type);
    };
    const typeEffect = typeFilters.value.length > 0 ? getTypeFilterResult() : true;
    const getStatusFilterResult = () => statusFilters.value.includes(String(item.status)[0]!);
    const statusEffect = statusFilters.value.length > 0 ? getStatusFilterResult() : true;
    return typeEffect && statusEffect && searchEffect;
  });
});
onClear(() => {
  tableData.value = [];
});
const { addPool, getRequestIdInPool, releasePool } = createRequestPool();
// 请求开始
function onBeforeRequest(details: chrome.webRequest.OnBeforeRequestDetails) {
  // console.log('before', details.url);
  addPool(details.requestId, details.url, details.timeStamp);
  const req: TableColumn = {
    ...baseColumn,
    _requestId: details.requestId,
    miniUrl: urlTransfer(details.url),
    url: details.url,
    method: details.method,
  };
  tableData.value.push(req);
  return void 0;
}
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ['<all_urls>'] },
);
// 请求中止
chrome.webRequest.onErrorOccurred.addListener((details) => {
  // console.log('请求被取消或失败:', details);
  return void 0;
}, { urls: ['<all_urls>'] });
// 请求结束
async function onCompletedRequest(request: chrome.devtools.network.Request) {
  // console.log('details', request);
  const requestId = getRequestIdInPool(request.request.url, request.startedDateTime);
  const data: TableColumn = {
    _requestId: requestId || '',
    _loading: false,
    _error: request.response.status === 0,
    miniUrl: urlTransfer(request.request.url),
    url: request.request.url,
    status: request.response.status === 0 ? 'ERROR' : request.response.status,
    type: request._resourceType,
    method: request.request.method,
    size: sizeTransfer(request.response.content.size),
    time: timeTransfer(request.time),
    getContent: request.getContent,
  };
  const index = tableData.value.findIndex(item => item._requestId === requestId);
  if (index === -1) return tableData.value.push(data);
  tableData.value[index] = data;
  await nextTick();
  tableRef.value?.scrollToRow(tableData.value.length);
}
chrome.devtools.network.onRequestFinished.addListener(onCompletedRequest);
// 页面刷新
function onNavigated() {
  if (isKeepLog.value) return;
  tableData.value = [];
}
chrome.devtools.network.onNavigated.addListener(onNavigated);
onBeforeUnmount(() => {
  chrome.devtools.network.onRequestFinished.removeListener(onCompletedRequest);
  chrome.devtools.network.onNavigated.removeListener(onNavigated);
  chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequest);
  releasePool();
});
// 右键菜单
const showContextMenu = ref(false);
const contextInfo = ref<{ event: MouseEvent, row: TableColumn }>();
function handleContextMenu(event: MouseEvent, row: TableColumn) {
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
function goDetails(row: TableColumn) {
  tooltipVisible.value = false;
  props.checkDetail(row);
}
const { height: containerH, width: containerW } = useElementBounding(containerRef);
function customRowClass({ rowData}: { rowData: TableColumn }) {
  if (rowData?._error) return 'v2-error-row';
  return '';
}
function handleCustomField() {
  // console.log(tableData.value);
}
</script>

<template>
  <section
    ref="containerRef"
    class="table-container relative transition-all duration-500 delay-200 mt-2 z-0 mx-4"
    :style="{ height: `${height}px`, transform: contTrans }"
  >
    <RoundButton class="absolute -top-2 -right-2 z-10" @click="handleCustomField">
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
      :row-height="30"
      fixed
      :row-class="customRowClass"
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
  border-bottom: 1px solid var(--gray_300);
}
:deep(.v2table-class .el-table-v2__header-cell) {
  background: var(--btn_bg);
  border-right: 1px solid var(--gray_300);
}
:deep(.v2table-class .el-table-v2__row) {
  border-bottom: 1px solid var(--gray_300);
  transition: 0s;
}
:deep(.v2table-class .el-table-v2__row:hover) {
  background: var(--table_hover_bg);
}
:deep(.v2table-class .el-table-v2__row-cell) {
  background: var(--btn_bg);
  border: none;
  transition: 0s;
}
:deep(.v2table-class .el-table-v2__row:hover .el-table-v2__row-cell) {
  background: var(--table_hover_bg);
}
</style>

<style>
.v2-error-row {
  color: var(--error_color) !important;
}
.v2-cache-row {
  color: var(--color_green) !important;
}
</style>
