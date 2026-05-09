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
                                :total="feedbacks.length"
                                :loading="loading"
                                @added="onFeedbackAdded"
                                @selected="(value) => onSelected(value)"
                            />
                        </v-col>
                    </v-row>
                    <template v-if="showSkeleton">
                        <v-row
                            v-for="i in CONSTANTS.SKELETON_SUGGESTIONS_COUNT"
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
                                    @updated="(payload) => updateFeedBack(payload.feedback, payload.isActiveVote)"
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

                    <div
                        v-if="!showSkeleton && !loading && (page > 0 || hasMore)"
                        class="d-flex flex-shrink-0 ga-2 justify-end pt-3"
                    >
                        <v-btn
                            v-if="page > 0"
                            variant="tonal"
                            color="purple"
                            @click="prevPage"
                        >
                            {{ t('buttons.prev') }}
                        </v-btn>
                        <v-btn
                            v-if="hasMore"
                            variant="flat"
                            color="purple"
                            @click="nextPage"
                        >
                            {{ t('buttons.next') }}
                        </v-btn>
                    </div>
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
import { useI18n } from 'vue-i18n';
import { handleError } from '@/plugins/error';
import { CONSTANTS } from '@/constants/index';
import type { Feedback, User } from '@/types/index';
import router from '@/router';
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import FeedbackBar from '@/components/FeedbackBar/FeedbackBar.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import SortingPanel from '@/components/SortingPanel/SortingPanel.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedback from '@/components/EmptyFeedback/EmptyFeedback.vue';
import VotersCard from '@/components/VotersCard/VotersCard.vue';
import { db, increment, decrement, auth, firebase } from '@/firebase/init';

type QueryDocSnap = firebase.firestore.QueryDocumentSnapshot;

const { t } = useI18n();
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

// Pagination
const currentSort = ref<string>('descU');
const page = ref<number>(0);
const hasMore = ref<boolean>(false);
let pageCursors: Array<QueryDocSnap | null> = [null];

const sortMap: Record<string, { dir: 'asc' | 'desc'; field: string }> = {
    ascC: { dir: 'asc', field: 'comments' },
    ascU: { dir: 'asc', field: 'upvotes' },
    descC: { dir: 'desc', field: 'comments' },
    descU: { dir: 'desc', field: 'upvotes' }
};

const buildQuery = (): firebase.firestore.Query => {
    const { field, dir } = sortMap[currentSort.value];
    return db.collection('feedbacks').orderBy(field, dir);
};

const resetPagination = (): void => {
    page.value = 0;
    pageCursors = [null];
    hasMore.value = false;
};

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

const fetchFeedbacks = async (): Promise<void> => {
    try {
        const res = await db.collection('feedbacks').get();
        feedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        handleError(error);
    }
};

const fetchUsers = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('users').get();
        users.value = res.docs.map((u) => u.data() as User);
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const fetchPage = async (targetPage: number): Promise<void> => {
    try {
        loading.value = true;
        const cursor = pageCursors[targetPage] ?? null;
        let q = buildQuery().limit(CONSTANTS.PAGE_SIZE + 1);
        if (cursor) q = q.startAfter(cursor);

        const res = await q.get();
        const { docs } = res;

        hasMore.value = docs.length > CONSTANTS.PAGE_SIZE;
        filteredFeedbacks.value = docs.slice(0, CONSTANTS.PAGE_SIZE).map((doc) => doc.data() as Feedback);

        if (hasMore.value) {
            pageCursors[targetPage + 1] = docs[CONSTANTS.PAGE_SIZE - 1];
        }

        page.value = targetPage;
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const updateFeedBack = async (feedback: Feedback, isActiveVote: boolean): Promise<void> => {
    try {
        await db.collection('feedbacks').doc(feedback.docId).update({
            upvotes: isActiveVote ? increment : decrement
        });
        const delta = isActiveVote ? 1 : -1;
        const inAll = feedbacks.value.find((f) => f.docId === feedback.docId);
        if (inAll) inAll.upvotes += delta;
        const inPage = filteredFeedbacks.value.find((f) => f.docId === feedback.docId);
        if (inPage) inPage.upvotes += delta;
    } catch (error: unknown) {
        handleError(error);
    }
};

const onRedirect = async (name: string, id?: string): Promise<void> => {
    await router.push({ name, params: { id } });
};

const onFeedbackAdded = async (): Promise<void> => {
    await fetchFeedbacks();
    await fetchPage(0);
};

const fetchPinnedFeedbacks = async (): Promise<void> => {
    try {
        pinnedLoading.value = true;
        const res = await db.collection('feedbacks').orderBy('pinned', 'desc').get();
        filteredFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        handleError(error);
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
        handleError(error);
    } finally {
        await fetchPinnedFeedbacks();
        pinnedLoading.value = false;
    }
};

const onSelected = async (selectedValue: string): Promise<void> => {
    currentSort.value = selectedValue;
    activeCategory.value = 'All';
    resetPagination();
    await fetchPage(0);
};

const applyTagPage = (targetPage: number): void => {
    const all = feedbacks.value.filter((f) => f.category === activeCategory.value);
    const start = targetPage * CONSTANTS.PAGE_SIZE;
    filteredFeedbacks.value = all.slice(start, start + CONSTANTS.PAGE_SIZE);
    hasMore.value = start + CONSTANTS.PAGE_SIZE < all.length;
    page.value = targetPage;
};

const onTagClicked = async (category: string): Promise<void> => {
    activeCategory.value = category;
    resetPagination();
    if (category === 'All') {
        await fetchPage(0);
    } else {
        applyTagPage(0);
    }
};

const nextPage = async (): Promise<void> => {
    if (activeCategory.value === 'All') {
        await fetchPage(page.value + 1);
    } else {
        applyTagPage(page.value + 1);
    }
};

const prevPage = async (): Promise<void> => {
    if (activeCategory.value === 'All') {
        await fetchPage(page.value - 1);
    } else {
        applyTagPage(page.value - 1);
    }
};

onMounted(async () => {
    await fetchFeedbacks();
    await fetchUsers();
    await fetchPage(0);
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
