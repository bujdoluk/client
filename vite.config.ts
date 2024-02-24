import { type ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { resolve } from 'node:path';

const config = (env: ConfigEnv): UserConfig => {
  process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) };
  const base = String(process.env.VITE_APP_BASE);
  const host = String(process.env.VITE_APP_HOST);
  const port = Number(process.env.VITE_APP_PORT);

  const config: UserConfig = {
    base,
    build: {
      sourcemap: 'hidden',
      target: 'ESNext'
    },
    define: {
      'process.env': process.env
    },
    plugins: [
      VueI18nPlugin({
        include: [resolve(__dirname, './src/locales/**')]
      }),
      vue({ template: { transformAssetUrls } }),
      vuetify({ autoImport: true }),
      Components({ dts: true })
    ],
    preview: {
      host,
      port,
      strictPort: true
    },
    resolve: {
      extensions: [
        '.json',
        '.js',
        '.mjs',
        '.ts',
        '.vue'
      ]
    },
    server: {
      host,
      port,
      strictPort: true
    }
  };
  return config;
};

export default defineConfig((env: ConfigEnv) => config(env));
