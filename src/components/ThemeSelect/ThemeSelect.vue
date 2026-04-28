<template>
    <v-btn
        :icon="isDark ? mdiLightbulb : mdiBrightness2"
        variant="text"
        class="mr-3"
        @click="toggleTheme"
    />
</template>

<script setup lang="ts">
/**
 * @file ThemeSelect.
 * @description Allows selecting light or dark theme.
 */
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { mdiBrightness2, mdiLightbulb } from '@mdi/js';

const theme = useTheme();
const isDark = computed(() => theme.global.name.value === 'dark');

const toggleTheme = (): void => {
    const next = isDark.value ? 'light' : 'dark';
    theme.global.name.value = next;
    localStorage.setItem('theme', next);
};
</script>