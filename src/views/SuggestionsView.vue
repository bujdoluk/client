<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row class="grid">
            <v-col
                cols="3"
                xxl="3"
                xl="3"
                lg="3"
                md="3"
                sm="12"
            >
                <v-container>
                    <v-row align="center">
                        <v-col>
                            <FrontendMentorBox />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <TagsBox :categories="categories" />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <RoadmapBox
                                v-if="feedbacks"
                                :feedbacks="feedbacks"
                            />
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
                            <SortingPanel :feedbacks="feedbacks" />
                        </v-col>
                    </v-row>
                    <v-row
                        v-for="feedback in feedbacks"
                        :key="feedback.id"
                    >
                        <v-col 
                            v-if="feedbacks.length > 0"  
                            @click="onRedirect('feedback-detail', feedback.id)"
                        >
                            <v-card :min-height="90" class="cursor">
                                <v-container>
                                    <v-row class="pa-2">
                                        <v-col
                                            class="align-top d-flex justify-center"
                                            cols="auto"
                                        >
                                            <v-btn
                                                stacked
                                                class="text-caption font-weight-bold"
                                                color="darkBlue"
                                                density="compact"
                                                variant="tonal"
                                                flat
                                                size="40"
                                            >
                                                <v-icon :icon="mdiChevronUp">
                                                </v-icon>
                                                {{ feedback.upvotes }}
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-card>
                                                <v-card-text class="font-weight-bold">
                                                    {{ feedback.title }}
                                                </v-card-text>
                                                <v-card-text class="text-truncate width text-grey">
                                                    {{ feedback.description }}
                                                </v-card-text>
                                                <v-card-actions>
                                                    <Tag :category="feedback.category"/>
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col
                                            class="align-center d-flex font-weight-bold"
                                            cols="auto"
                                        >
                                            <v-icon 
                                                :icon="mdiChat" 
                                                color="background-primary"
                                                class="mr-2"
                                            />
                                            {{ feedback.comments }}
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                        <v-col v-else>
                            <EmptyFeedbackComponent />
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
import { type Feedback } from '@/models/Feedback';
import router from '@/router';
import Tag from '@/components/Tag/Tag.vue';
import { mdiChat, mdiChevronUp } from '@mdi/js';
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import SortingPanel from '@/components/SortingPanel/SortingPanel.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedbackComponent from '@/components/Feedback/EmptyFeedbackComponent.vue';
import feeedbacks from '@/database/feedbacks.json';

const feedbacks = ref<Array<Feedback>>(feeedbacks);
const categories = computed(() => feedbacks.value.map((feedback) => feedback.category));

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