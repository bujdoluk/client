<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card
        v-else
        class="align-end color-background d-flex text-white"
        :min-height="110"
    >
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

const props = defineProps<{
    loading: boolean;
}>();

const { t } = useI18n();

</script>

<style scoped>
.color-background {
    background: rgb(96, 81, 231);
    background: radial-gradient(circle, rgba(96, 81, 231, 1) 10%, rgba(171, 33, 234, 1) 45%, rgba(244, 159, 133, 1) 100%);
}
</style>