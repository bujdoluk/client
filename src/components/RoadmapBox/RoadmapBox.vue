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
        <div
            class="align-center d-flex"
            :class="{ 'mb-4': hasStatuses }"
        >
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

        <div class="mb-2 separator" />

        <apexchart
            type="donut"
            height="220"
            :options="chartOptions"
            :series="chartSeries"
        />

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
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';
import { type Feedback, Status } from '@/types/index.ts';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    feedbacks: Array<Feedback>;
    loading: boolean;
}>();

const apexchart = VueApexCharts;

const { t } = useI18n();
const theme = useTheme();
const textColor = computed(() => (theme.current.value.dark ? '#ffffff' : '#373d3f'));

const plannedCount = computed(() => props.feedbacks.filter((f) => f.status === Status.Planned).length);
const inProgressCount = computed(() => props.feedbacks.filter((f) => f.status === Status.InProgress).length);
const liveCount = computed(() => props.feedbacks.filter((f) => f.status === Status.Live).length);

const statuses = computed(() => [
    { count: plannedCount.value, dotClass: 'dot--orange', label: t('views.suggestions.roadmap.planned') },
    { count: inProgressCount.value, dotClass: 'dot--pink', label: t('views.suggestions.roadmap.inProgress') },
    { count: liveCount.value, dotClass: 'dot--teal', label: t('views.suggestions.roadmap.live') }
]);

const hasStatuses = computed<boolean>(() => statuses.value.length > 0);

const chartSeries = computed(() => [plannedCount.value, inProgressCount.value, liveCount.value]);

const totalCount = computed(() => plannedCount.value + inProgressCount.value + liveCount.value);
const livePercentage = computed(() => (totalCount.value > 0
    ? Math.round((liveCount.value / totalCount.value) * 100)
    : 0));

const chartOptions = computed(() => ({
    chart: { foreColor: textColor.value, toolbar: { show: false }, type: 'donut' as const },
    colors: ['#F49F85', '#AD1FEA', '#62BCFA'],
    dataLabels: { enabled: false },
    labels: [
        t('views.suggestions.roadmap.planned'),
        t('views.suggestions.roadmap.inProgress'),
        t('views.suggestions.roadmap.live')
    ],
    legend: { show: false },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    name: {
                        color: textColor.value,
                        fontSize: '14px',
                        fontWeight: 500,
                        offsetY: 28,
                        show: true
                    },
                    show: true,
                    total: {
                        formatter: (): string => `${livePercentage.value}%`,
                        label: t('views.suggestions.roadmap.live'),
                        show: true,
                        showAlways: true
                    },
                    value: {
                        color: textColor.value,
                        fontSize: '42px',
                        fontWeight: 700,
                        offsetY: -12,
                        show: true
                    }
                }
            }
        }
    },
    stroke: { width: 0 },
    tooltip: { y: { formatter: (val: number): string => String(val) } }
}));

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
