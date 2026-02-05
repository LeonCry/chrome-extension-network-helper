<script setup lang="ts">
const columns = [
  { field: 'name', label: 'NAME', minWidth: '30%' },
  { field: 'status', label: 'STATUS', minWidth: '10%' },
  { field: 'type', label: 'TYPE', minWidth: '10%' },
  { field: 'size', label: 'SIZE', minWidth: '10%' },
  { field: 'time', label: 'TIME', minWidth: '20%' },
  { field: 'operation', label: 'OPERATION', minWidth: '20%' },
];
const tableData = [
  {
    name: 'file1.txt',
    status: 'success',
    type: 'text',
    size: '100KB',
    time: '2023-01-01 12:00:00',
    operation: 'download',
  },
  {
    name: 'file2.jpg',
    status: 'failed',
    type: 'image',
    size: '200KB',
    time: '2023-01-02 12:00:00',
    operation: 'upload',
  },
];
</script>

<template>
  <section class="w-full h-full">
    <ElTable :data="tableData" style="width: 100%">
      <ElTableColumn
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.label"
        :min-width="column.minWidth"
      />
    </ElTable>
  </section>
</template>

<style scoped></style>
