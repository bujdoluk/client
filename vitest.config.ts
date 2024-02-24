/**
 * @file Vitest config file.
 * @see https://vitest.dev/config/
 */
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { default as viteConfig } from './vite.config';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig((configEnv) => mergeConfig(
    viteConfig(configEnv),
    defineConfig({
        plugins: [
            VueI18nPlugin({
                include: [resolve(__dirname, './src/locales/**')]
            }),
            // vue({ template: { transformAssetUrls } }), // TODO https://stackoverflow.com/questions/76883361/
            vuetify({ autoImport: true }),
            Components({ dts: true })
        ],
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
        test: {
            ...configDefaults,
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
            coverage: {
                enabled: String(process.env.VITE_COVERAGE) === 'true',
                provider: 'istanbul',
                reporter: ['text', 'text-summary', 'cobertura']
            },
            environment: 'jsdom',
            globals: true,
            include: ['tests/unit/**/*'],
            outputFile: './reports/junit.xml',
            reporters: ['junit', 'default'],
            root: fileURLToPath(new URL('./', import.meta.url))
        }
    })
));
