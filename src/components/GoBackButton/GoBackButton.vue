<template>
    <v-btn
        variant="text"
        size="small"
        :color="buttonColor"
        :prepend-icon="mdiChevronLeft"
        @click="onRedirect"
    >
        {{ t('buttons.back') }}
    </v-btn>
</template>

<script setup lang="ts">
/**
 * @file GoBackButton component.
 * @description Redirect user back to the page where he/she came from.
 */
import { computed } from 'vue';
import { mdiChevronLeft } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import router from '@/router';

const props = defineProps<{
    color?: string;
}>();

const { t } = useI18n();
const buttonColor = computed<string>(() => props.color ?? 'dark-blue');

const onRedirect = (): void => {
    router.back();
};
</script>
