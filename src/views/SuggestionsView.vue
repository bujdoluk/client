<template>
    <v-container
        class="bg-background"
        fluid
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
                        class="cursor"
                    >
                        <FeedbackComponent
                            v-if="feedbacks.length > 0"
                            :feedback="feedback"
                            @click="onRedirect('feedback-detail', feedback.id)"
                        />
                        <EmptyFeedbackComponent v-else />
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
import FeedbackComponent from '@/components/Feedback/FeedbackComponent.vue';
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