<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row class="grid">
            <v-col>
                <v-card class="bg-black">
                    <v-container class="bg-darkBlue">
                        <v-row>
                            <v-col>
                                <v-btn 
                                    class="bg-btn-black"
                                    variant="tonal"
                                    density="default"
                                    size="small"
                                    @click="onRedirect('suggestions')"
                                >
                                    {{ t('buttons.goBack') }}
                                </v-btn>
                                {{ t('views.roadmap.title') }}
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
                    <v-card-title class="pb-0 text-body-1">
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
                    <v-card-title class="pb-0 text-body-1">
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
                    <v-card-title class="pb-0 text-body-1">
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
import AddFeedback from '@/components/Dialogs/AddFeedback.vue';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { type Feedback } from '@/models/Feedback';
import FeedbackCard from '@/components/FeedbackCard/FeedbackCard.vue';

const { t } = useI18n();

const feedbacks = ref<Array<Feedback>>([{
    category: 'Feature',
    color: 'dot-orange',
    comments: 5,
    description: 'Description 1',
    id: "1",
    status: 'Planned',
    title: 'Feedback 1',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-orange',
    comments: 5,
    description: 'Description 2',
    id: "2",
    status: 'Planned',
    title: 'Feedback 2',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-pink',
    comments: 5,
    description: 'Description 3',
    id: "3",
    status: 'In-Progress',
    title: 'Feedback 3',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-pink',
    comments: 5,
    description: 'Description 4',
    id: "4",
    status: 'In-Progress',
    title: 'Feedback 4',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-pink',
    comments: 5,
    description: 'Description 5',
    id: "5",
    status: 'In-Progress',
    title: 'Feedback 5',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-teal',
    comments: 5,
    description: 'Description 6',
    id: "6",
    status: 'Live',
    title: 'Feedback 6',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'dot-pink',
    comments: 5,
    description: 'Description 7',
    id: "7",
    status: 'In-Progress',
    title: 'Feedback 7',
    upvotes: 10
}]);

const filteredPlannedStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Planned'));
const filteredInProgressStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'In-Progress'));
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