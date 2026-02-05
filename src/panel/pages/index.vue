<script setup lang="ts">
import { IconSettingsFilled, IconSunHighFilled } from '@tabler/icons-vue';

function toggleTheme() {
  document.documentElement.classList.add('blend-dark');
}
</script>

<template>
  <main class="w-full h-full bg-background text-foreground p-4 flex flex-col text-sm gap-2">
    <header class="flex items-center gap-2">
      <img src="/logo.png" alt="logo" class="w-8">
      <p class="font-bold text-lg">
        NETWORK DEBUGGER TOOL
      </p>
      <span class="flex-1" />
      <RoundButton @click="toggleTheme">
        <IconSunHighFilled :size="20" />
      </RoundButton>
      <RoundButton>
        <IconSettingsFilled :size="20" />
      </RoundButton>
    </header>
    <div class="w-full h-2 border-b border-gray-300" />
    <ToolBar />
    <Content class="flex-1" />
  </main>
</template>
