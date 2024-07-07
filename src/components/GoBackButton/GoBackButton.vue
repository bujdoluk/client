<template>
    <v-btn 
        class="bg-btn-black"
        variant="text"
        size="small"
        :prepend-icon="mdiChevronLeft"
        @click="router.back()"
    >
        {{ t('buttons.goBack') }}
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

</script>

