<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card v-else>
        <v-container fluid>
            <v-row>
                <v-col cols="auto">
                    <h2 class="text-dark-blue">
                        {{ t('views.suggestions.roadmap.title') }}
                    </h2>
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    <v-btn
                        class="cursor font-weight-bold pr-2 text-decoration-underline"
                        density="compact"
                        variant="text"
                        color="blue"
                        flat
                        @click="onRedirect('roadmap')"
                    >
                        {{ t('views.suggestions.roadmap.view') }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <span class="dot-orange" />
                </v-col>
                <v-col class="text-content">
                    {{ t('views.suggestions.roadmap.planned') }}
                </v-col>
                <v-col
                    cols="auto"
                    class="font-weight-bold text-dark-blue"
                    align="center"
                >
                    <h3 class="text-dark-blue">
                        {{ plannedFeedbacks.length }}
                    </h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <span class="dot-pink" />
                </v-col>
                <v-col class="text-content">
                    {{ t('views.suggestions.roadmap.inProgress') }}
                </v-col>
                <v-col
                    cols="auto"
                    class="font-weight-bold"
                    align="center"
                >
                    <h3 class="text-dark-blue">
                        {{ inProgressFeedbacks.length }}
                    </h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <span class="dot-teal" />
                </v-col>
                <v-col class="text-content">
                    {{ t('views.suggestions.roadmap.live') }}
                </v-col>
                <v-col
                    cols="auto"
                    class="font-weight-bold"
                    align="center"
                >
                    <h3 class="text-dark-blue">
                        {{ liveFeedbacks.length }}
                    </h3>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file RoadmapBox component.
 */
import { computed } from 'vue';
import { type Feedback } from '@/models/Feedback';
import { Status } from '@/models/Status';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    feedbacks: Array<Feedback>;
    loading: boolean;
}>();

const { t } = useI18n();

const plannedFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.Planned));
const inProgressFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.InProgress));
const liveFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.Live));

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};
</script>
