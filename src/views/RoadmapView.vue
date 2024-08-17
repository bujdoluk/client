<template>
    <v-container
        fluid
        class="bg-background height"
    >
        <v-row class="grid">
            <v-col class="pb-0">
                <v-card class="bg-dark-blue">
                    <v-container class="bg-dark-blue">
                        <v-row align="center">
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <GoBackButton />
                                    </v-col>
                                </v-row>
                                <v-row class="font-weight-bold ml-2 mt-0">
                                    <v-col>
                                        {{ t('views.roadmap.title') }}
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-spacer />
                            <v-col cols="auto mr-3">
                                <AddFeedback @feedback-added="onFeedbackAdded" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col cols="4">
                <v-card class="bg-background">
                    <v-card-title class="font-weight-bold pb-0 text-body-1 text-dark-blue">
                        {{ t('views.roadmap.status.planned') }}
                        {{ `(${filteredPlannedStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-content">
                        {{ t('views.roadmap.status.subtitle.planned') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="bg-background">
                    <v-card-title class="font-weight-bold pb-0 text-body-1 text-dark-blue">
                        {{ t('views.roadmap.status.inProgress') }}
                        {{ `(${filteredInProgressStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-content">
                        {{ t('views.roadmap.status.subtitle.inProgress') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="bg-background">
                    <v-card-title class="font-weight-bold pb-0 text-body-1 text-dark-blue">
                        {{ t('views.roadmap.status.live') }}
                        {{ `(${filteredLiveStatus.length})` }}
                    </v-card-title>
                    <v-card-text class="text-content">
                        {{ t('views.roadmap.status.subtitle.live') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col cols="4">
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredPlannedStatus"
                        :key="feedback.docId"
                    >
                        <FeedbackCard :feedback="feedback" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredInProgressStatus"
                        :key="feedback.docId"
                    >
                        <FeedbackCard :feedback="feedback" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-row class="d-flex flex-column">  
                    <v-col   
                        v-for="feedback in filteredLiveStatus"
                        :key="feedback.docId"
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
import { computed, ref, onMounted } from 'vue';
import AddFeedback from '@/components/Dialogs/AddFeedback.vue';
import { useI18n } from 'vue-i18n';
import { type Feedback } from '@/models/Feedback';
import FeedbackCard from '@/components/FeedbackCard/FeedbackCard.vue';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';
import { db } from '@/firebase/init';
import { Status } from '@/models/Status';

const { t } = useI18n();
const feedbacks = ref<Array<Feedback>>([]);
const filteredPlannedStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.Planned));
const filteredInProgressStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.InProgress));
const filteredLiveStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.Live));
const loading = ref<boolean>(false);

const fetchFeedbacks = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('feedbacks').get();
        feedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const onFeedbackAdded = async (): Promise<void> => {
    await fetchFeedbacks();
};

onMounted(async () => {
    await fetchFeedbacks(); 
});

</script>

<style scoped>
.grid {
    width: 70vw;
    margin: 0 auto;
}

.height {
    height: calc(100vh - 64px);
}
</style>