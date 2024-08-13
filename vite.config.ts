import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { resolve } from 'node:path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath } from 'node:url';

const config = (env: ConfigEnv): UserConfig => {
    process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) };
    const base = String(process.env.VITE_APP_BASE);
    const host = String(process.env.VITE_APP_HOST);
    const port = Number(process.env.VITE_APP_PORT);

    const config: UserConfig = {
        base,
        build: {
            sourcemap: 'hidden',
            target: 'esnext'
        },
        define: {
            'process.env': process.env
        },
        plugins: [
            VueI18nPlugin({
                include: [resolve(__dirname, './src/locales/**')]
            }),
            vue({ template: {
                transformAssetUrls
            } }),
            vuetify({ autoImport: { labs: true } }),
            Components({ dts: 'src/@types/components.d.ts' }),
            nodePolyfills()
        ],
        preview: {
            host,
            port,
            strictPort: true
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
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
