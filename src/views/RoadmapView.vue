<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row class="grid">
            <v-col>
                <v-card class="bg-black">
                    <v-container class="bg-darkBlue">
                        <v-row align="center">
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <v-btn 
                                            class="bg-btn-black"
                                            variant="text"
                                            size="small"
                                            :prepend-icon="mdiChevronLeft"
                                            @click="onRedirect('suggestions')"
                                        >
                                            {{ t('buttons.goBack') }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        {{ t('views.roadmap.title') }}
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-spacer />
                            <v-col cols="auto">
                                <AddFeedback />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1 font-weight-bold">
                        {{ t('views.roadmap.status.planned') }}
                        {{ `(${filteredPlannedStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-grey">
                        {{ t('views.roadmap.status.subtitle.planned') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1 font-weight-bold">
                        {{ t('views.roadmap.status.inProgress') }}
                        {{ `(${filteredInProgressStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-grey">
                        {{ t('views.roadmap.status.subtitle.inProgress') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1 font-weight-bold">
                        {{ t('views.roadmap.status.live') }}
                        {{ `(${filteredLiveStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-grey">
                        {{ t('views.roadmap.status.subtitle.live') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col>
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredPlannedStatus"
                        :key="feedback.id"
                    >
                        <FeedbackCard :feedback="feedback" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredInProgressStatus"
                        :key="feedback.id"
                    >
                        <FeedbackCard :feedback="feedback" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredLiveStatus"
                        :key="feedback.id"
                    >
                        <FeedbackCard :feedback="feedback" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Roadmap View.
 */
import { computed, ref } from 'vue';
import { mdiChevronLeft } from '@mdi/js';
import AddFeedback from '@/components/Dialogs/AddFeedback.vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { type Feedback } from '@/models/Feedback';
import FeedbackCard from '@/components/FeedbackCard/FeedbackCard.vue';
import feeedbacks from '@/database/feedbacks.json';

const { t } = useI18n();
const feedbacks = ref<Array<Feedback>>(feeedbacks);
const filteredPlannedStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Planned'));
const filteredInProgressStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'In Progress'));
const filteredLiveStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Live'));

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

</script>

<style scoped>
.grid {
    width: 70% !important;
    margin: 0 auto;
}
</style>