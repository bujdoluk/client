<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row class="width"> 
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
                    <v-row>
                        <v-col>
                            <FrontendMentorBox />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <TagsBox
                                v-if="feedbacks.length > 0"
                                :categories="filteredByUniqueTags"
                                :active="active"
                                @clicked="onTagClicked"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
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
                <v-container
                    fluid
                >
                    <v-row>
                        <v-col>
                            <SortingPanel
                                :feedbacks="feedbacks"
                                @added="onFeedbackAdded"
                                @selected="onSelected"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        v-for="feedback in filteredFeedbacks"
                        :key="feedback.docId"
                    >
                        <v-col
                            class="pb-0"
                            @click="onRedirect('feedback-detail', feedback.docId)"
                        >
                            <FeedbackBar 
                                :feedback="feedback"
                                @updated="(value) => updateFeedBack(value)" 
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="feedbacks.length === 0">
                        <v-col>
                            <EmptyFeedback />
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
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import FeedbackBar from '@/components/FeedbackBar/FeedbackBar.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import SortingPanel from '@/components/SortingPanel/SortingPanel.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedback from '@/components/EmptyFeedback/EmptyFeedback.vue';
import { db, increment, auth } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const feedbacks = ref<Array<Feedback>>([]);
const filteredFeedbacks = ref<Array<Feedback>>(feedbacks.value);
const user = ref(auth().currentUser);
const active = ref<boolean>(false);
const categories = computed(() => feedbacks.value.map((feedback) => feedback.category));
const filteredByUniqueTags = computed(() => categories.value.filter((value, index, array) => array.indexOf(value) === index));

const fetchFeedbacks = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = await db.collection('feedbacks').get();
        feedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        filteredFeedbacks.value = feedbacks.value;
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const updateFeedBack = async (feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = db.collection('feedbacks').doc(feedback.docId);
        await res.set({
            category: feedback.category,
            comments: feedback.comments,
            description: feedback.description,
            docId: feedback.docId,
            status: feedback.status,
            title: feedback.title,
            upvotes: increment,
            userId: user.value?.uid
        });
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

const onSelected = (selectedItem: any): void => {
    console.log('selected', selectedItem);
    // feedbacks.value.sort((a, b) => a.comments - b.comments);

    // feedbacks.value.sort((a, b) => a.upvotes - b.upvotes);
};

const onTagClicked = (selectedItem: any): void => {
    console.log('tag clicked', selectedItem);
    active.value = !active.value;
    if (active.value) {
        filteredFeedbacks.value = feedbacks.value.filter((feedback) => feedback.category === selectedItem);
    } else { 
        filteredFeedbacks.value = feedbacks.value;
    }
};

onMounted(async () => {
    await fetchFeedbacks();
    console.log(categories);
    console.log(filteredByUniqueTags);
});

</script>

<style scoped>
.width {
    width: 70vw;
    height: calc(100vh - 90px);
    margin: 0 auto;
}
</style>