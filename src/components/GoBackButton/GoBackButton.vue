<template>
    <v-btn 
        variant="text"
        size="small"
        :prepend-icon="mdiChevronLeft"
        @click="onRedirect"
    >
        {{ t('buttons.back') }}
    </v-btn>
</template>

<script setup lang="ts">
/**
 * @file GoBackButton component.
 */
import { mdiChevronLeft } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import router from '@/router';

const { t } = useI18n();

const onRedirect = (): void => {
    router.back();
};

</script>

