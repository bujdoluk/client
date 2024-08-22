<template>
    <v-card-text>
        {{ t('components.ModerationToggle.allowModeration') }}
    </v-card-text>
    <v-switch
        v-model="moderationToggle"
        class="d-flex justify-end"
        color="purple"
        @click="onToogled"
    />
</template>

<script setup lang="ts">
/**
 * @file Moderation toggle component.
 */
import { useAppStore } from '@/stores/useAppStore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const appStore = useAppStore();
const moderationToggle = ref<boolean>(false);

const onToogled = (): void => { 
    moderationToggle.value = !moderationToggle.value;
    appStore.isModerationAllowed = !appStore.isModerationAllowed;
};

</script>