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
                    <v-card-title class="font-weight-bold pb-0 text-body-1">
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
                    <v-card-title class="font-weight-bold pb-0 text-body-1">
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
                    <v-card-title class="font-weight-bold pb-0 text-body-1">
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
import { computed, ref, onMounted } from 'vue';
import AddFeedback from '@/components/Dialogs/AddFeedback.vue';
import { useI18n } from 'vue-i18n';
import { type Feedback } from '@/models/Feedback';
import FeedbackCard from '@/components/FeedbackCard/FeedbackCard.vue';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';
import { projectFireStore } from '@/firebase/init';
import { Status } from '@/models/Status';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const { t } = useI18n();
const feedbacks = ref<Array<Feedback>>([]);
const filteredPlannedStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.Planned));
const filteredInProgressStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.InProgress));
const filteredLiveStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === Status.Live));

const fetchFeedbacks = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const snapshot = await projectFireStore.collection('feedbacks').get();
        feedbacks.value = (snapshot.docs.map((doc) => ({
            id: projectFireStore.collection('feedbacks').id,
            ...doc.data()
        } as Feedback)));
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

onMounted(() => {
    fetchFeedbacks(); 
});

</script>

<style scoped>
.grid {
    width: 70% !important;
    margin: 0 auto;
}
</style>