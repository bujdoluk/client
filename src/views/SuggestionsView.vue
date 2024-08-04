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
                            <SortingPanel
                                :feedbacks="feedbacks"
                                @feedback-added="onFeedbackAdded"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        v-for="feedback in feedbacks"
                        :key="feedback.docId"
                    >
                        <v-col 
                            v-if="feedbacks.length > 0"  
                            @click="onRedirect('feedback-detail', feedback.docId)"
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
                                                @click.stop="updateFeedBack(feedback.docId, feedback)"
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
import { db, increment, auth } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const feedbacks = ref<Array<Feedback>>([]);
const categories = computed(() => feedbacks.value.map((feedback) => feedback.category));
const user = ref(auth().currentUser);

const fetchFeedbacks = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (user.value) {
            const snapshot = await db.collection('feedbacks').get();
            feedbacks.value = (snapshot.docs.map((doc) => ({
                docId: db.collection('feedbacks').id,
                userId: user.value?.uid,
                ...doc.data()
            } as Feedback)));
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const updateFeedBack = async (id: string, feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (user.value) {
            const res = db.collection('feedbacks').doc(id);
            await res.set({
                category: feedback.category,
                comments: feedback.comments,
                description: feedback.description,
                docId: feedback.docId,
                status: feedback.status,
                title: feedback.title,
                upvotes: increment,
                userId: user.value.uid
            });
        }
    } catch(error: unknown) {
        console.log(error);
    } finally {
        fetchFeedbacks();
        appStore.isLoading = false;
    }
};

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

const onFeedbackAdded = (): void => {
    fetchFeedbacks();
};

onMounted(() => {
    fetchFeedbacks(); 
});

</script>