<script setup lang="ts">
import {
  IconAccessibleFilled,
  IconAlarmSmoke,
  IconArrowBigUpLinesFilled,
  IconBrandGithubFilled,
  IconBugFilled,
  IconDialpadFilled,
  IconEyeCheck,
  IconEyeOff,
  IconEyeSpark,
  IconFileOrientation,
  IconHistory,
  IconHomeEco,
  IconLanguage,
  IconSettingsFilled,
  IconStarFilled,
} from '@tabler/icons-vue';

const eyeShow = ref(false);
</script>

<template>
  <main class="w-full h-full bg-[#f2f0f4] text-[#3f3f47] flex flex-col p-4 gap-4 overflow-auto">
    <header class="flex items-center justify-center flex-col gap-2 relative">
      <img src="/logo.png" alt="logo" class="h-36 z-10">
      <figure class="absolute w-50 h-50 bg-[#BDE6FA] rounded-full blur-lg -top-6" />
      <h1 class="font-bold text-2xl z-10 header-clip">
        NETWORK DEBUGGER TOOL
      </h1>
    </header>
    <hr class="w-full h-px bg-zinc-500">
    <section class="w-full rounded-md bg-primary p-3 text-sm leading-8 relative">
      <h2 class="flex items-center gap-1 text-red-300 font-bold">
        <IconBrandGithubFilled class=" animate-bounce" :size="18" />
        <span>WELCOME</span>
      </h2>
      <p>
        Welcome to use Network debugger Helper chrome extension,
        if you like it, please give it a star on GitHub,
        or report bugs.
      </p>
      <div class="flex items-center">
        <ElButton
          type="primary"
          text
          class="bg-pink-500/80! hover:bg-pink-500! flex-1 mt-2 h-10!"
        >
          <IconStarFilled class="text-red-50 mr-2" :size="18" />
          <span class="text-red-50">Give a star</span>
        </ElButton>
        <ElButton
          type="primary"
          text
          class="bg-pink-500/80! hover:bg-pink-500! flex-1 mt-2 h-10!"
        >
          <IconBugFilled class="text-red-50 mr-2" :size="22" />
          <span class="text-red-50">Report bugs</span>
        </ElButton>
      </div>
    </section>
    <section class="w-full rounded-md bg-primary p-3 text-sm leading-8">
      <h2 class="flex items-center gap-1 text-red-300">
        <IconAccessibleFilled class=" animate-bounce" :size="18" />
        <span>INTRODUCE</span>
      </h2>
      <p>Network debugger Helper can help you:</p>
      <ul class="list-disc list-inside">
        <li>One-click copy the request url, payload, response body.</li>
        <li>One-click copy to postman(simple tools) for debugging.</li>
        <li>Filter, listen, custom failed requests.</li>
        <li>Keep historical request data.</li>
        <li>...</li>
      </ul>
    </section>
    <section class="w-full rounded-md bg-primary p-3 text-sm leading-8">
      <h2 class="flex items-center gap-1 text-red-300">
        <IconSettingsFilled class="animate-spin" :size="18" />
        <span>SETTING</span>
      </h2>
      <div class="w-full bg-[#f2f0ff] px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconLanguage :size="20" />
          <span>language</span>
        </p>
        <select class="w-[120px] px-2 py-1 rounded-md text-right">
          <option value="en">
            English
          </option>
          <option value="zh">
            中文
          </option>
        </select>
      </div>
      <div class="w-full bg-[#f2f0ff] px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconHistory :size="20" />
          <span>keep historical</span>
        </p>
        <span class="flex-1" />
        <ElButton size="small" color="#FB61AF" class="text-white!">
          OFF
        </ElButton>
        <ElButton size="small" color="#FFFFFF">
          3 DAYS
        </ElButton>
        <ElButton size="small" color="#FFFFFF">
          1000 COUNTS
        </ElButton>
      </div>
      <div class="w-full bg-[#f2f0ff] px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconAlarmSmoke :size="20" />
          <span>clear cache</span>
        </p>
        <span class="flex-1" />
        <ElButton
          type="danger"
          size="small"
          class="flex-1"
        >
          CLEAR
        </ElButton>
      </div>
      <div class="w-full bg-[#f2f0ff] px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconEyeSpark :size="20" />
          <span>show eyes</span>
        </p>
        <ElSwitch
          v-model="eyeShow"
          width="50"
          style="--el-switch-on-color: #FB61AF"
          inline-prompt
        >
          <template #active>
            <IconEyeCheck :size="20" />
          </template>
          <template #inactive>
            <IconEyeOff :size="20" />
          </template>
        </ElSwitch>
      </div>
    </section>
    <section class="w-full rounded-md bg-primary p-3 text-sm leading-8">
      <h2 class="flex items-center gap-1 text-red-300">
        <IconDialpadFilled class="animate-bounce" :size="18" />
        <span>EXPAND</span>
      </h2>
      <div class="flex items-center justify-between mt-2">
        <ElButton color="#FB61AF" class="text-white!">
          <IconFileOrientation :size="18" />
          <span class="ml-1">CHANGE LOG</span>
        </ElButton>
        <ElButton color="#FB61AF" class="text-white!">
          <IconHomeEco :size="18" />
          <span class="ml-1">HOME PAGE</span>
        </ElButton>
        <ElButton color="#FB61AF" class="text-white!">
          <IconArrowBigUpLinesFilled :size="18" />
          <span class="ml-1">VERSION 1.0</span>
        </ElButton>
      </div>
    </section>
    <p class="text-center text-sm text-gray-300 mt-2">
      copy right @ 2026-present Network debugger Helper
    </p>
  </main>
</template>

<style scoped>
.header-clip {
  background: linear-gradient(-30deg, #62cff4, #ff71f3);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
