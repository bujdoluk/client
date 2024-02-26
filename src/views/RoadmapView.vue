<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row class="mx-auto row">
            <v-col>
                <v-card class="bg-black">
                    <v-container>
                        <v-row>
                            <v-col class="column d-flex flex">
                                <v-btn 
                                    class="bg-btn-black"
                                    variant="tonal"
                                    density="default"
                                    size="small"
                                >
                                    {{ t('buttons.goBack') }}
                                </v-btn>
                                Roadmap
                            </v-col>
                            <v-col>
                                <v-btn 
                                    class="bg-btn-pink"
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
        <v-row class="d-flex flex-row mx-auto row">
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1">
                        Planned (2)
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                        Lorem
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1">
                        In-Progress (3)
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                        Lorem
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="bg-background">
                    <v-card-title class="pb-0 text-body-1">
                        Live (1)
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                        Lorem
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-column mx-auto row">
            <v-col
                v-for="feedback in filteredPlannedStatus"
                :key="feedback.id"
                cols="4"
            >
                <v-card
                    class="bg-white"
                    :color="feedback.color"
                >
                    <v-card-text>LOL</v-card-text>
                    <v-card-title class="pb-0 text-body-1">
                        Completed (1)
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                        Lorem
                    </v-card-subtitle>
                    <v-card-text>LOL asd  sd dsadasdad sadasasdasd asdasdas asdas</v-card-text>
                    <v-card-text>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Feature
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Upvote
                        </v-btn>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Comment
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-column mx-auto row">
            <v-col
                v-for="feedback in filteredInProgressStatus"
                :key="feedback.id"
            >
                <v-card class="bg-white">
                    <v-card-text>LOL</v-card-text>
                    <v-card-title class="pb-0 text-body-1">
                        Completed (1)
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                        Lorem
                    </v-card-subtitle>
                    <v-card-text>LOL asd  sd dsadasdad sadasasdasd asdasdas asdas</v-card-text>
                    <v-card-text>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Feature
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Upvote
                        </v-btn>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Comment
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-column mx-auto row">
            <v-col
                v-for="feedback in filteredLiveStatus"
                :key="feedback.id"
            >
                <v-card class="bg-white">
                    {{ feedback.status }}
                    
                    <v-card-title>
                        {{ feedback.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ feedback.description }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Feature
                        </v-btn>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Upvote
                        </v-btn>
                        <v-btn 
                            class="bg-btn-default"
                            variant="tonal"
                            density="default"
                            size="small"
                        >
                            Comment
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Roadmap View.
 */
import { computed, ref } from 'vue';
import { mdiPlus } from '@mdi/js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

export interface Feedback {
    category: string;
    color: string;
    comments: number;
    description: string;
    id: number;
    status: string;
    title: string;
    upvotes: number;
}

const feedbacks = ref<Array<Feedback>>([{
    category: 'Feature',
    color: 'orange',
    comments: 5,
    description: 'Description 1',
    id: 1,
    status: 'Planned',
    title: 'Feedback 1',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'orange',
    comments: 5,
    description: 'Description 2',
    id: 2,
    status: 'Planned',
    title: 'Feedback 2',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 3',
    id: 3,
    status: 'In-Progress',
    title: 'Feedback 3',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 4',
    id: 4,
    status: 'In-Progress',
    title: 'Feedback 4',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 5',
    id: 5,
    status: 'In-Progress',
    title: 'Feedback 5',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'teal',
    comments: 5,
    description: 'Description 6',
    id: 6,
    status: 'Live',
    title: 'Feedback 6',
    upvotes: 10
}, {
    category: 'Feature',
    color: 'pink',
    comments: 5,
    description: 'Description 7',
    id: 7,
    status: 'In-Progress',
    title: 'Feedback 7',
    upvotes: 10
}]);

const filteredPlannedStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Planned'));
const filteredInProgressStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'In-Progress'));
const filteredLiveStatus = computed(() => feedbacks.value.filter((feedback) => feedback.status === 'Live'));
</script>

<style scoped>
.row {
    min-height: 113px;
    width: 60%;
}
</style>