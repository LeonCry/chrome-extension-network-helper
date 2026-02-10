import type { ConfigEnv, UserConfig } from 'vite';
import path from 'node:path';
import process from 'node:process';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import legacy from '@vitejs/plugin-legacy';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import manifest from './manifest.json';

const dateTime = new Date().toISOString();
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    define: { __APP_VERSION__: JSON.stringify(dateTime) },
    resolve: { alias: { '@': `${path.resolve(__dirname, 'src')}` } },
    plugins: [
      Vue(),
      vueJsx(),
      tailwindcss(),
      crx({ manifest }),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: true,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: true,
        dirs: ['src/panel/components', 'src/panel/pages'],
        resolvers: [ElementPlusResolver()],
      }),
      legacy({
        modernPolyfills: true,
        renderLegacyChunks: false,
        modernTargets: browserslist(),
      }),
    ],
    css: {
      transformer: 'lightningcss',
      lightningcss: { targets: browserslistToTargets(browserslist()) },
    },
    build: {
      outDir: env.VITE_APP_OUTPUT,
      cssMinify: 'lightningcss',
      sourcemap: Boolean(env.VITE_APP_SOURCEMAP),
      rollupOptions: { input: { panel: 'src/panel/index.html', popup: 'src/popup/index.html' } },
    },
    server: {
      host: 'localhost',
      port: 3333,
      strictPort: true,
      cors: true,
    },
  };
});
