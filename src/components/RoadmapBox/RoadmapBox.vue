<template>
    <v-card>
        <v-container fluid>
            <v-row>
                <v-col>
                    {{ t('views.suggestions.roadmap.title') }}
                </v-col>
                <v-spacer />
                <v-col>
                    <v-btn
                        class="cursor text-decoration-underline"
                        density="compact"
                        variant="tonal"
                        flat
                        @click="onRedirect('roadmap')"
                    >
                        {{ t('views.suggestions.roadmap.view') }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="1">
                    <span class="dot-orange" />
                </v-col>
                <v-col>
                    {{ t('views.suggestions.roadmap.planned') }}
                </v-col>
                <v-col
                    cols="2"
                    class="font-weight-bold"
                >
                    {{ plannedFeedbacks.length }}
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="1">
                    <span class="dot-pink" />
                </v-col>
                <v-col>
                    {{ t('views.suggestions.roadmap.inProgress') }}
                </v-col>
                <v-col
                    cols="2"
                    class="font-weight-bold"
                >
                    {{ inProgressFeedbacks.length }}
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="1">
                    <span class="dot-teal" />
                </v-col>
                <v-col>
                    {{ t('views.suggestions.roadmap.live') }}
                </v-col>
                <v-col
                    cols="2"
                    class="font-weight-bold"
                >
                    {{ liveFeedbacks.length }}
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
}>();

const { t } = useI18n();

const plannedFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.Planned));
const inProgressFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.InProgress));
const liveFeedbacks = computed(() => props.feedbacks.filter((feedback) => feedback.status === Status.Live));

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};
</script>
