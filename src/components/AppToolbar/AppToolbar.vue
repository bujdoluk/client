<template>
    <v-app-bar
        elevation="3"
        class="bg-darkBlue"
        :title="t('components.AppToolbar.title')"
    >
        <v-btn
            variant="flat"
            color="purple"
            :to="{ 'name': 'signup' }"
        >
            {{ t('buttons.signup') }}
        </v-btn>
        <v-btn
            variant="flat"
            color="purple"
            class="ml-3"
            :to="{ 'name': 'login' }"
        >
            {{ t('buttons.login') }}
        </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
/**
 * @file AppToolbar.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
