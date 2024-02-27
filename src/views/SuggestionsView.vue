<template>
    <v-container
        fluid
        class="bg-background"
        width="100vw"
    >
        <v-row class="mx-auto row">
            <v-col
                cols="3"
                xxl="3"
                xl="3"
                lg="3"
                md="3"
                sm="12"
            >
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card 
                                class="special-background text-white"
                                :min-height="110"
                            >
                                <v-card-title class="font-weight-bold">
                                    {{ t('views.suggestions.sidebar.title') }}
                                </v-card-title>
                                <v-card-subtitle>
                                    {{ t('views.suggestions.sidebar.subtitle') }}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-container fluid>
                                    <v-row>
                                        <v-col
                                            v-for="category in allCategories"
                                            :key="category"
                                            class="pa-2"
                                        >
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-blue"
                                                density="default"
                                                size="small"
                                            >
                                                {{ category }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-container fluid>
                                    <v-row>
                                        <v-col>
                                            {{ t('views.suggestions.roadmap.title') }}
                                        </v-col>
                                        <v-spacer />
                                        <v-col>
                                            <span class="cursor text-decoration-underline">
                                                {{ t('views.suggestions.roadmap.view') }}
                                            </span>
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
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col
                cols="9"
                xxl="9"
                xl="9"
                lg="9"
                md="9"
                sm="12"
            >
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card class="bg-darkBlue">
                                <v-container>
                                    <v-row align="center">
                                        <v-col cols="1">
                                            <v-icon :icon="mdiLightbulbOnOutline" />
                                        </v-col>
                                        <v-col cols="2">
                                            {{ feedbacks.length }} {{ t('views.suggestions.topbar.suggestions') }}
                                        </v-col>
                                        <v-col cols="4">
                                            <span class="text-caption">
                                                {{ t('views.suggestions.topbar.sortBy') }} 
                                            </span>
                                            <v-select
                                                :items="items"
                                                variant="solo"
                                                density="compact"
                                            />
                                        </v-col>
                                        <v-spacer />
                                        <v-col>
                                            <AddFeedbackDialog />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row
                        v-for="feedback in feedbacks"
                        :key="feedback.id"
                        class="cursor"
                        @click="onRedirect(feedback.id)"
                    >
                        <v-col v-if="feedbacks.length !== 0">
                            <v-card :min-height="130">
                                <v-container>
                                    <v-row>
                                        <v-col
                                            class="align-top d-flex justify-center"
                                            cols="2"
                                        >
                                            <v-btn
                                                stacked
                                                class="bg-btn-default text-caption"
                                                :prepend-icon="mdiChevronUp"
                                                density="compact"
                                                variant="tonal"
                                                flat
                                                size="40"
                                            >
                                                {{ feedback.upvotes }}
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                            class="pt-0"
                                            cols="8"
                                        >
                                            <v-card>
                                                <v-card-title>
                                                    {{ feedback.title }}
                                                </v-card-title>
                                                <v-card-text class="text-truncate width">
                                                    {{ feedback.description }}
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn 
                                                        density="compact"
                                                        variant="tonal"
                                                        flat
                                                    >
                                                        {{ feedback.category }}
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                        <v-col
                                            class="align-center d-flex"
                                            cols="2"
                                        >
                                            <v-icon :icon="mdiChat" />
                                            {{ feedback.comments }}
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
             
                        <v-col v-else>
                            <v-card>
                                <v-container
                                    fluid
                                    class="align-center d-flex flex-column height"
                                >
                                    <v-row align="end">
                                        <v-col class="text-h5">
                                            {{ t('views.suggestions.emptyFeedback.title') }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-caption">
                                            {{ t('views.suggestions.emptyFeedback.subtitle') }}
                                        </v-col>
                                    </v-row>
                                    <v-row align="start">
                                        <v-col>
                                            <v-btn 
                                                class="bg-purple"
                                                :prepend-icon="mdiPlus"
                                            >
                                                {{ t('buttons.addFeedback') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Suggestions View.
 */
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiChat, mdiPlus, mdiChevronUp, mdiLightbulbOnOutline } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import router from '@/router';
import AddFeedbackDialog from '@/components/Dialogs/AddFeedbackDialog.vue';

const { t } = useI18n();

const isActive = ref<boolean>(false);
const feedbacks = ref<Array<Feedback>>([{
    category: 'Feature',
    color: 'orange',
    comments: 5,
    description: 'Description 1',
    id: '1',
    status: 'Planned',
    title: 'Feedback 1',
    upvotes: 10
}, {
    category: 'All',
    color: 'orange',
    comments: 5,
    description: 'Description 2 LDSKLKASD LDSKALDK SDADASDAS DASDASD DSADAS',
    id: '2',
    status: 'Planned',
    title: 'Feedback 2',
    upvotes: 10
}, {
    category: 'UX',
    color: 'pink',
    comments: 5,
    description: 'Description 2 LDSKLKASD LDSKALDK SDADASDAS DASDASD DSADAS',
    id: '3',
    status: 'In-Progress',
    title: 'Feedback 3',
    upvotes: 10
}, {
    category: 'UI',
    color: 'pink',
    comments: 5,
    description: 'Description 4',
    id: '4',
    status: 'In-Progress',
    title: 'Feedback 4',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 5',
    id: '5',
    status: 'In-Progress',
    title: 'Feedback 5',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'teal',
    comments: 5,
    description: 'Description 6',
    id: '6',
    status: 'Live',
    title: 'Feedback 6',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 7',
    id: '7',
    status: 'In-Progress',
    title: 'Feedback 7',
    upvotes: 10
}]);

const allCategories = computed(() => feedbacks.value.map((feedback) => feedback.category));
const plannedFeedbacks = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Planned'));
const inProgressFeedbacks = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'In-Progress'));
const liveFeedbacks = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Live'));
const items = [
    { title: t('views.suggestions.topbar.mostUpvotes') },
    { title: t('views.suggestions.topbar.leastUpvotes') },
    { title: t('views.suggestions.topbar.mostComments') },
    { title: t('views.suggestions.topbar.leastComments') }
];

const onRedirect = (id: string): void => {
    router.push({ name: 'feedback-detail', params: { id } });
};
</script>

<style scoped>
.row {
    min-height: 113px;
    width: 60%;
}
.special-background {
    background: rgb(96,81,231);
    background: radial-gradient(circle, rgba(96,81,231,1) 10%, rgba(171,33,234,1) 45%, rgba(244,159,133,1) 100%); 
}

.height{
    height: 70vh;
}

.width {
    max-width: 95%;
}

.dot-orange {
  height: 10px;
  width: 10px;
  background-color: #F49F85;
  border-radius: 50%;
  display: inline-flex;
}

.dot-pink {
  height: 10px;
  width: 10px;
  background-color: #AD1FEA;
  border-radius: 50%;
  display: inline-flex;
}

.dot-teal {
  height: 10px;
  width: 10px;
  background-color: #62BCFA;
  border-radius: 50%;
  display: inline-flex;
}
.cursor {
    cursor: pointer;
}
</style>