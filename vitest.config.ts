/**
 * @file Vitest config file.
 * @see https://vitest.dev/config/
 */
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { default as viteConfig } from './vite.config';

export default defineConfig((configEnv) => mergeConfig(
    viteConfig(configEnv),
    defineConfig({
        test: {
            coverage: {
                enabled: String(process.env.VITE_COVERAGE) === 'true',
                provider: 'v8',
                reporter: ['text', 'text-summary', 'cobertura']
            },
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'tests/e2e/**'],
            include: ['tests/unit/**/*'],
            root: fileURLToPath(new URL('./', import.meta.url))
        }
    })

));
