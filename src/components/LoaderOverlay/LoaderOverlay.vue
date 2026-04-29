<template>
    <v-overlay
        :model-value="isLoading"
        class="align-center justify-center"
        persistent
    >
        <v-progress-circular
            color="purple"
            indeterminate
            size="64"
        />
    </v-overlay>
</template>

<script setup lang="ts">
/**
 * @file LoaderOverlay Component.
 * @description Full-screen overlay with spinner shown during async operations.
 */
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();

const { isLoading } = storeToRefs(appStore);
</script>
