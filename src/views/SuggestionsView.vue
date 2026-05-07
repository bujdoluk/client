<template>
    <v-container
        fluid
        class="min-height"
    >
        <v-row class="width">
            <v-col
                class="pr-0"
                cols="3"
                xxl="3"
                xl="3"
                lg="3"
                md="12"
                sm="12"
                xs="12"
            >
                <v-container fluid>
                    <v-row>
                        <v-col class="pb-0">
                            <FrontendMentorBox :loading="loading" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pb-0">
                            <TagsBox
                                :active-category="activeCategory"
                                :categories="categories"
                                :loading="loading"
                                @clicked="onTagClicked"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pb-0">
                            <RoadmapBox
                                :feedbacks="feedbacks"
                                :loading="loading"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pb-0">
                            <VotersCard
                                :loading="loading"
                                :users="users"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col
                class="pl-0"
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
                                :loading="loading"
                                @added="onFeedbackAdded"
                                @selected="(value) => onSelected(value)"
                            />
                        </v-col>
                    </v-row>
                    <template v-if="showSkeleton">
                        <v-row
                            v-for="i in 6"
                            :key="i"
                        >
                            <v-col class="pt-0">
                                <v-skeleton-loader
                                    boilerplate
                                    type="list-item-two-line"
                                />
                            </v-col>
                        </v-row>
                    </template>
                    <template v-else-if="!loading">
                        <v-row
                            v-for="feedback in filteredFeedbacks"
                            :key="feedback.docId"
                        >
                            <v-col
                                class="pt-0"
                                @click="onRedirect('feedback-detail', feedback.docId)"
                            >
                                <FeedbackBar
                                    :feedback="feedback"
                                    :loading="pinnedLoading"
                                    @updated="(value) => updateFeedBack(value)"
                                    @pinned="(value) => updatePinnedFeedBack(value)"
                                />
                            </v-col>
                        </v-row>
                        <v-row v-if="feedbacks.length === 0">
                            <v-col>
                                <EmptyFeedback />
                            </v-col>
                        </v-row>
                    </template>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Suggestions View.
 * @description Displays user feedbacks in a list. Its a main view where users can create/edit/delete or sort feedbacks.
 */
import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import type { Feedback, User } from '@/types/index';
import router from '@/router';
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import FeedbackBar from '@/components/FeedbackBar/FeedbackBar.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import SortingPanel from '@/components/SortingPanel/SortingPanel.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedback from '@/components/EmptyFeedback/EmptyFeedback.vue';
import VotersCard from '@/components/VotersCard/VotersCard.vue';
import { db, increment, auth } from '@/firebase/init';

const feedbacks = ref<Array<Feedback>>([]);
const filteredFeedbacks = ref<Array<Feedback>>([]);
const user = ref(auth().currentUser);
const categories = computed(() => ['All', ...new Set(feedbacks.value.map((f) => f.category))]);
const activeCategory = ref<string>('All');
const loading = ref<boolean>(false);
const pinnedLoading = ref<boolean>(false);
const users = ref<Array<User>>([]);

const showSkeleton = ref(false);
let skeletonTimer: ReturnType<typeof setTimeout> | undefined;

watch(loading, (isLoading) => {
    clearTimeout(skeletonTimer);
    if (isLoading) {
        skeletonTimer = setTimeout(() => {
            showSkeleton.value = true; 
        }, 200);
    } else {
        showSkeleton.value = false;
    }
});

onUnmounted(() => {
    clearTimeout(skeletonTimer); 
});

const fetchUsers = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('users').get();
        users.value = res.docs.map((u) => u.data() as User);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

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
        await db.collection('feedbacks').doc(feedback.docId).set({
            category: feedback.category,
            comments: feedback.comments,
            createdAt: feedback.createdAt,
            description: feedback.description,
            docId: feedback.docId,
            pinned: feedback.pinned,
            status: feedback.status,
            title: feedback.title,
            upvotes: increment,
            userId: user.value?.uid
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

const onFeedbackAdded = async (): Promise<void> => {
    await fetchFeedbacks();
};

const fetchPinnedFeedbacks = async (): Promise<void> => {
    try {
        pinnedLoading.value = true;
        const res = await db.collection('feedbacks').orderBy('pinned', 'desc').get();
        filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        pinnedLoading.value = false;
    }
};

const updatePinnedFeedBack = async (feedback: Feedback): Promise<void> => {
    try {
        pinnedLoading.value = true;
        await db.collection('feedbacks').doc(feedback.docId).set({
            category: feedback.category,
            comments: feedback.comments,
            createdAt: feedback.createdAt,
            description: feedback.description,
            docId: feedback.docId,
            pinned: !feedback.pinned,
            status: feedback.status,
            title: feedback.title,
            upvotes: feedback.upvotes,
            userId: user.value?.uid
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        await fetchPinnedFeedbacks();
        pinnedLoading.value = false;
    }
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

const onTagClicked = async (category: string): Promise<void> => {
    activeCategory.value = category;
    if (category === 'All') {
        filteredFeedbacks.value = feedbacks.value;
        return;
    }
    try {
        loading.value = true;
        const res = await db.collection('feedbacks').where('category', '==', category).get();
        filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchFeedbacks();
    await fetchUsers();
});
</script>

<style scoped>
.width {
    width: 70vw;
    margin: 0 auto;
}

.min-height {
    min-height: calc(100vh - 64px);
}
</style>
