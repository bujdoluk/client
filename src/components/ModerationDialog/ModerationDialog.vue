<template>
    <v-card>
        <v-card-title>
            {{ t('components.ModerationDialog.title') }}
        </v-card-title>
        <v-card-text>
            {{ t('components.ModerationDialog.preview') }}
        </v-card-text>
        <v-card-text>
            Feedback / comment info
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file Reply card component.
 */
import { useAppStore } from '@/stores/useAppStore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const appStore = useAppStore();

</script>