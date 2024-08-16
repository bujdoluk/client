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
                            <FrontendMentorBox :loading="loading" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <TagsBox
                                v-if="feedbacks.length > 0"
                                :categories="filteredByUniqueTags"
                                :active="active"
                                :loading="loading"
                                @clicked="onTagClicked"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <RoadmapBox
                                v-if="feedbacks"
                                :feedbacks="feedbacks"
                                :loading="loading"
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
                                :loading="loading"
                                @added="onFeedbackAdded"
                                @selected="(value) => onSelected(value)"
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
                                :loading="loading"
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

const feedbacks = ref<Array<Feedback>>([]);
const filteredFeedbacks = ref<Array<Feedback>>([]);
const user = ref(auth().currentUser);
const active = ref<boolean>(false);
const categories = computed(() => filteredFeedbacks.value.map((feedback) => feedback.category));
const filteredByUniqueTags = computed(() => categories.value.filter((value, index, array) => array.indexOf(value) === index));
const loading = ref<boolean>(false);

const fetchFeedbacks = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('feedbacks').get();
        feedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        filteredFeedbacks.value = feedbacks.value;
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const updateFeedBack = async (feedback: Feedback): Promise<void> => {
    try {
        loading.value = true;
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
        loading.value = false;
    }
};

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

const onFeedbackAdded = async (): Promise<void> => {
    await fetchFeedbacks();
};

const onSelected = async (selectedValue: string): Promise<void> => {
    try {
        loading.value = true;
        if (selectedValue === 'descC') {
            const res = await db.collection('feedbacks').orderBy('comments', 'desc').get();
            filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        } else if (selectedValue === 'ascC') {
            const res = await db.collection('feedbacks').orderBy('comments', 'asc').get();
            filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        } else if (selectedValue === 'descU') {
            const res = await db.collection('feedbacks').orderBy('upvotes', 'desc').get();
            filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        } else if (selectedValue === 'ascU') {
            const res = await db.collection('feedbacks').orderBy('upvotes', 'asc').get();
            filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const onTagClicked = async (selectedItem: any): Promise<void> => {
    active.value = !active.value;
    loading.value = true;
    if (active.value) {
        try {
            const res = await db.collection('feedbacks').where('category', '==', selectedItem).get();
            filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
        } catch (error: unknown) {
            console.log(error);
        } 
    } else { 
        filteredFeedbacks.value = feedbacks.value;
    }
    loading.value = false;
};

onMounted(async () => {
    await fetchFeedbacks();
});

</script>

<style scoped>
.width {
    width: 70vw;
    height: calc(100vh - 90px);
    margin: 0 auto;
}
</style>