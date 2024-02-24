<template>
    <v-container fluid class="bg-background">
        <v-row class="row mx-auto">
            <v-col cols="3" xxl="3" xl="3" lg="3" md="3" sm="12">
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card class="special-background">
                                <v-card-title>
                                    {{ t('views.suggestions.sidebar.title') }}
                                </v-card-title>
                                <v-card-subtitle>
                                    {{ t('views.suggestions.sidebar.subtitle') }}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-container fluid>
                                    <v-row>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-blue"
                                                density="default"
                                                size="small"
                                            >
                                                {{ t('all') }}
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                color="bg-btn-default"
                                                density="default"
                                                size="small"
                                            >
                                                UI
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-default"
                                                density="default"
                                                size="small"
                                            >
                                                UX
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-default"
                                                density="default"
                                                size="small"
                                            >
                                                Enhancement
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-default"
                                                density="default"
                                                size="small"
                                            >
                                                Bug
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn 
                                                :active="isActive"
                                                variant="tonal"
                                                class="bg-btn-default"
                                                density="default"
                                                size="small"
                                            >
                                                Feature
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-container fluid>
                                    <v-row>
                                        <v-col>Roadmap</v-col>
                                        <v-spacer></v-spacer>
                                        <v-col>View</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Planned</v-col>
                                        <v-spacer></v-spacer>
                                        <v-col>2</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Planned</v-col>
                                        <v-spacer></v-spacer>
                                        <v-col>2</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>Planned</v-col>
                                        <v-spacer></v-spacer>
                                        <v-col>2</v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="9" xxl="9" xl="9" lg="9" md="9" sm="12">
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card 
                                class="bg-black"
                            >
                                <v-container>
                                    <v-row align="center">
                                        <v-col>Light bulb</v-col>
                                        <v-col>6 Suggestions</v-col>
                                        <v-col>Sort by: Most upvoted</v-col>
                                        <v-spacer></v-spacer>
                                        <v-col>
                                            <FeedbackDialog />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row v-if="feedbacks.length > 0">
                        <v-col  v-for="feedback in 10" :key="feedback">
                            <v-card>
                                <v-container>
                                    <v-row>
                                        <v-col class="d-flex align-top justify-center" cols="2">
                                            <v-btn stacked class="bg-btn-default">
                                                LOL
                                            </v-btn>
                                        </v-col>
                                        <v-col class="pt-0">
                                            <v-card>
                                                <v-card-title>
                                                    FrontEnd Mentor
                                                </v-card-title>
                                                <v-card-subtitle>
                                                    Feedback Board
                                                </v-card-subtitle>
                                                <v-card-actions>
                                                    <v-btn>
                                                        Feature
                                                    </v-btn>
                                                    <v-btn>
                                                        Feature
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                        <v-col class="d-flex align-center" cols="2">
                                            <v-icon :icon="mdiChat"></v-icon>
                                            2
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col>
                            <v-card>
                                <v-container fluid class="height d-flex flex-column align-center">
                                    <v-row align="end">
                                        <v-col class="text-h5">
                                            There is no feedback yet.
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-caption">
                                            Got a suggestion? Found a bug that needs to be squashed? 
                                            We love hearing about new ideas to improve our app.
                                        </v-col>
                                    </v-row>
                                    <v-row align="start">
                                        <v-col>
                                            <v-btn class="bg-btn-pink">
                                                + Add Feedback
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
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
import { mdiChat } from '@mdi/js';
import FeedbackDialog from "@/Components/FeedbackDialog.vue";

const { t } = useI18n();

export interface Feedback {
    id: number;
    title: string;
    description: string;
    category: string;
    upvotes: number;
    comments: number;
    isActive: boolean;
}

const isActive = ref<boolean>(false);
const feedbacks = ref<Array<Feedback>>([]);
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
</style>