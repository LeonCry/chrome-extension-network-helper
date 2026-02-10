<script setup lang="ts">
import { IconTableFilled } from '@tabler/icons-vue';
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
const columns = [
  { field: 'response.status', label: 'STATUS', minWidth: '12%' },
  { field: 'request.method', label: 'TYPE', minWidth: '10%' },
  { field: 'response.content.size', label: 'SIZE', minWidth: '10%', formatter: sizeTransfer },
  { field: 'time', label: 'TIME', minWidth: '10%', formatter: timeTransfer },
];
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

function onRequestFinished(request: chrome.devtools.network.Request) {
  request._miniUrl = urlTransfer(request.request.url);
  tableData.value.push(request as ChromeRequest);
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
    <ElTable
      v-if="height"
      :data="filteredTableData"
      height="100%"
      class="neumorph-table"
      style="width: 100%;height: 100%;"
    >
      <ElTableColumn
        prop="_miniUrl"
        label="NAME"
        min-width="30%"
      >
        <template #default="{ row }">
          <div
            class="cursor-pointer text-text_primary_blue! hover:text-text_primary_red! hover:underline py-[2px]"
            @contextmenu="(e) => handleContextMenu(e, row)"
            @mouseenter="(e) => handleTooltipMouseEnter(e, row.request.url)"
            @mouseleave="handleTooltipMouseLeave"
            @click="goDetails(row)"
          >
            <component
              :is="getResourceTypeIcon(row._resourceType)"
              class="absolute left-1 top-1/2 translate-y-[-50%] text-text_slate"
              :size="18"
            />
            <p class="truncate ml-3">
              {{ row._miniUrl }}
            </p>
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
