<script setup lang="ts">
import {
  IconAlarmSmoke,
  IconAntenna,
  IconBrandGithubFilled,
  IconHistory,
  IconLanguage,
  IconSettingsFilled,
} from '@tabler/icons-vue';
</script>

<template>
  <main class="w-full h-full bg-zinc-700 text-green-100 flex flex-col p-4 gap-4 overflow-auto">
    <header class="flex items-end w-full">
      <h1 class="text-xl font-bold text-amber-100">
        NETWORK DEBUGGER HELPER
      </h1>
      <span class="flex-1" />
      <IconAntenna
        v-for="i in 6"
        :key="i"
        class="border mx-[2px] mb-[6px]"
        :class="`text-amber-${100 * i}`"
        :size="12 + i * 2"
      />
    </header>
    <hr class="w-full h-px bg-zinc-500 border-0">
    <section class="w-full rounded-md bg-zinc-600 p-3 text-sm leading-6 relative">
      <h2>
        Welcome to use Network debugger Helper chrome extension,
        if you like it, please give it a star on GitHub,
        or report bugs.
      </h2>
      <ElButton
        type="primary"
        text
        class="bg-zinc-500/50! hover:bg-zinc-500! w-full! mt-2 h-10!"
      >
        <IconBrandGithubFilled class="w-6 h-6 text-green-400" />
      </ElButton>
    </section>
    <section class="w-full rounded-md bg-zinc-600 p-3 text-sm leading-8">
      <p>Network debugger Helper can help you:</p>
      <ul class="list-disc list-inside">
        <li>One-click copy the request url, payload, response body.</li>
        <li>One-click copy to postman(simple tools) for debugging.</li>
        <li>Filter, listen, custom failed requests.</li>
        <li>Keep historical request data.</li>
        <li>...</li>
      </ul>
    </section>
    <section class="w-full rounded-md bg-zinc-600 text-red-100 p-3 text-sm leading-8">
      <h2 class="flex items-center gap-1">
        <IconSettingsFilled class="animate-spin" :size="18" />
        <span>SETTING</span>
      </h2>
      <div class="w-full bg-zinc-500 px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconLanguage :size="20" />
          <span>language</span>
        </p>
        <select class="w-[120px] bg-zinc-500 px-2 py-1 rounded-md text-right">
          <option value="en">
            English
          </option>
          <option value="zh">
            中文
          </option>
        </select>
      </div>
      <div class="w-full bg-zinc-500 px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconHistory :size="20" />
          <span>keep historical</span>
        </p>
        <select class="w-[120px] bg-zinc-500 px-2 py-1 rounded-md text-right">
          <option value="close">
            close
          </option>
          <option value="3-days">
            3 days
          </option>
          <option value="1000-counts">
            1000 counts
          </option>
        </select>
      </div>
      <div class="w-full bg-zinc-500 px-2 py-1 rounded-md flex items-center justify-between my-4">
        <p class="flex items-center gap-2">
          <IconAlarmSmoke :size="20" />
          <span>clear cache</span>
        </p>
        <ElButton
          type="danger"
          size="small"
          round
        >
          CLEAR
          <IconAlarmSmoke :size="14" />
        </ElButton>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
