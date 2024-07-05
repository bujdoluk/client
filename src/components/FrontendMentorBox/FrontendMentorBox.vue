<template>
    <v-card class="align-end d-flex special-background text-white" :min-height="110">
        <v-card-item>
            <v-card-title class="font-weight-bold">
                {{ t('views.suggestions.sidebar.title') }}
            </v-card-title>
            <v-card-subtitle>
                {{ t('views.suggestions.sidebar.subtitle') }}
            </v-card-subtitle>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file FrontendMentoBox component.
 */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>