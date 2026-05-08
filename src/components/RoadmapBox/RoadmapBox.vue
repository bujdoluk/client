<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="heading, divider, list-item, list-item, list-item"
    />
    <v-card
        v-else
        class="pa-5"
    >
        <div class="align-center d-flex" :class="{ 'mb-4': statuses.length > 0 }">
            <span class="font-weight-bold text-dark-blue text-subtitle-1">
                {{ t('views.suggestions.roadmap.title') }}
            </span>
            <v-spacer />
            <v-btn
                color="blue"
                density="compact"
                variant="text"
                class="text-decoration-underline"
                @click="onRedirect"
            >
                {{ t('views.suggestions.roadmap.view') }}
            </v-btn>
        </div>

        <div class="mb-4 separator" />

        <div class="d-flex flex-column ga-3">
            <div
                v-for="status in statuses"
                :key="status.dotClass"
                class="align-center d-flex"
            >
                <span
                    class="dot mr-3"
                    :class="status.dotClass"
                />
                <span class="flex-grow-1 text-body-2 text-content">
                    {{ status.label }}
                </span>
                <span class="font-weight-bold text-body-2 text-dark-blue">
                    {{ status.count }}
                </span>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
/** @file RoadmapBox component. */
import { computed } from 'vue';
import { type Feedback, Status } from '@/types/index.ts';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    feedbacks: Array<Feedback>;
    loading: boolean;
}>();

const { t } = useI18n();

const plannedCount = computed(() => props.feedbacks.filter((f) => f.status === Status.Planned).length);
const inProgressCount = computed(() => props.feedbacks.filter((f) => f.status === Status.InProgress).length);
const liveCount = computed(() => props.feedbacks.filter((f) => f.status === Status.Live).length);

const statuses = computed(() => [
    { count: plannedCount.value, dotClass: 'dot--orange', label: t('views.suggestions.roadmap.planned') },
    { count: inProgressCount.value, dotClass: 'dot--pink', label: t('views.suggestions.roadmap.inProgress') },
    { count: liveCount.value, dotClass: 'dot--teal', label: t('views.suggestions.roadmap.live') }
]);

const onRedirect = async (): Promise<void> => {
    await router.push({ name: 'roadmap' });
};
</script>

<style scoped>
.separator {
    border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.dot {
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
    height: 8px;
    width: 8px;
}

.dot--orange { background-color: #F49F85; }
.dot--pink   { background-color: #AD1FEA; }
.dot--teal   { background-color: #62BCFA; }
</style>
