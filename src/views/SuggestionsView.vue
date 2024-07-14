<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row> 
            <v-col
                cols="3"
                xxl="3"
                xl="3"
                lg="3"
                md="12"
                sm="12"
                xs="12"
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
                md="12"
                sm="12"
                xs="12"
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
                            <v-card
                                :min-height="90"
                                class="cursor"
                            >
                                <v-container>
                                    <v-row class="pa-2">
                                        <v-col
                                            class="align-top d-flex justify-center"
                                            cols="auto"
                                        >
                                            <v-btn
                                                stacked
                                                class="font-weight-bold text-caption"
                                                color="blue"
                                                density="compact"
                                                variant="tonal"
                                                flat
                                                size="40"
                                                @click.stop="updateFeedBack(feedback.id, feedback)"
                                            >
                                                <v-icon :icon="mdiChevronUp" />
                                                {{ feedback.upvotes }}
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-card>
                                                <v-card-text class="font-weight-bold">
                                                    {{ feedback.title }}
                                                </v-card-text>
                                                <v-card-text class="text-grey text-truncate width">
                                                    {{ feedback.description }}
                                                </v-card-text>
                                                <v-card-actions>
                                                    <Tag :category="feedback.category" />
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                        <v-spacer />
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
import { computed, ref, onMounted } from 'vue';
import { type Feedback } from '@/models/Feedback';
import router from '@/router';
import Tag from '@/components/Tag/Tag.vue';
import { mdiChat, mdiChevronUp } from '@mdi/js';
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import SortingPanel from '@/components/SortingPanel/SortingPanel.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedbackComponent from '@/components/Feedback/EmptyFeedbackComponent.vue';
import { projectFireStore, increment } from '@/firebase/init';

const feedbacks = ref<Array<Feedback>>([]);
const categories = computed(() => feedbacks.value.map((feedback) => feedback.category));

const fetchFeedbacks = async (): Promise<Array<Feedback>> => {
    const snapshot = await projectFireStore.collection('feedbacks').get();
    feedbacks.value = (snapshot.docs.map((doc) => ({
        id: projectFireStore.collection('feedbacks').id,
        ...doc.data()
    } as Feedback)));
    return feedbacks.value;
};

const updateFeedBack = async (id: string, feedback: Feedback): Promise<void> => {
    try {
        const res = projectFireStore.collection('feedbacks').doc(id);
        await res.update({
            category: feedback.category,
            color: feedback.color,
            comments: feedback.comments,
            description: feedback.description,
            id: feedback.id,
            status: feedback.status,
            title: feedback.title,
            upvotes: increment
        });
    } catch(error) {
        console.log(error);
    } finally {
        fetchFeedbacks();
    }
};

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

onMounted(() => {
    fetchFeedbacks(); 
});

</script>