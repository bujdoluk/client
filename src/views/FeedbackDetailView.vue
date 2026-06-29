<template>
    <v-container
        fluid
        class="min-height"
    >
        <v-row class="width">
            <v-col cols="auto">
                <GoBackButton />
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <FeedbackDialog
                    v-if="feedback"
                    :feedback="feedback"
                    @edited="onEdited"
                    @deleted="onDeleted"
                />
            </v-col>
            <v-col cols="12">
                <v-skeleton-loader
                    v-if="loading"
                    boilerplate
                    type="list-item-two-line"
                />
                <FeedbackBar
                    v-else-if="feedback"
                    :feedback="feedback"
                    :loading="loading"
                />
            </v-col>
            <v-col
                cols="12"
                class="pb-6"
            >
                <template v-if="loading">
                    <v-skeleton-loader
                        v-for="i in CONSTANTS.SKELETON_COUNT"
                        :key="i"
                        boilerplate
                        type="list-item-avatar-three-line"
                        class="mb-2"
                    />
                </template>
                <v-card
                    v-else-if="hasCommentsOrReplies"
                    data-cy="comments-card"
                >
                    <v-container fluid>
                        <v-row v-if="hasCommentsOrReplies">
                            <v-col class="font-weight-bold pl-10 text-dark-blue">
                                {{ commentsAndRepliesCount }}
                                {{ commentsAndRepliesCountLabel }}
                            </v-col>
                        </v-row>
                        <v-row
                            v-for="comment in filteredComments"
                            :key="comment.docId"
                            class="d-flex flex-column"
                        >
                            <v-col v-if="feedback">
                                <CommentCard
                                    :comment="comment"
                                    :feedback="feedback"
                                    :replies="replies"
                                    :loading="loading"
                                    @reply-created="(reply, commentEmail, commentId) => onReplyCreated(reply, commentEmail, commentId)"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-container fluid>
                    <v-row>
                        <v-col class="pa-0">
                            <v-form
                                ref="form"
                                validate-on="submit"
                            >
                                <v-card
                                    class="pa-6"
                                    data-cy="add-comment-card"
                                >
                                    <v-card-text class="font-weight-bold py-3 text-dark-blue text-h6">
                                        {{ t('components.comment.addComment') }}
                                    </v-card-text>
                                    <v-card-text>
                                        <v-textarea
                                            v-model="text"
                                            :placeholder="t('components.comment.typeComment')"
                                            :counter="CONSTANTS.TEXT_MAX_LENGTH"
                                            :rows="CONSTANTS.COMMENT_TEXTAREA_ROWS"
                                            class="px-3"
                                            variant="plain"
                                            flat
                                            clearable
                                            hide-details="auto"
                                            :rules="[required, maxCharacters]"
                                            data-cy="comment-textarea"
                                        />
                                    </v-card-text>
                                    <v-card-actions class="pr-0 pt-3">
                                        <v-spacer />
                                        <v-btn
                                            variant="flat"
                                            color="purple"
                                            data-cy="post-comment-btn"
                                            @click="createComment"
                                        >
                                            {{ t('buttons.postComment') }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>  

<script setup lang="ts">
/**
 * @file Feedback Detail View.
 * @description Full detail page for a single feedback item showing comments, replies and vote count.
 */
import { useI18n } from 'vue-i18n';
import { handleError } from '@/plugins/error';
import router from '@/router';
import type { Reply, Comment, Feedback } from '@/types/index';
import CommentCard from '@/components/CommentCard/CommentCard.vue';
import FeedbackDialog from '@/components/Dialogs/FeedbackDialog.vue';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';
import { ref, shallowRef, onMounted, computed } from 'vue';
import type { VForm } from 'vuetify/components';
import { CONSTANTS } from '@/constants/index';
import { useRoute } from 'vue-router';
import { db, auth, timestamp } from '@/firebase/init';
import { useSnackBarStore } from '@/stores/useSnackBarStore';

const route = useRoute();
const { t } = useI18n();
const { show } = useSnackBarStore();
const comments = ref<Array<Comment>>([]);
const feedback = ref<Feedback>();
const form = shallowRef<InstanceType<typeof VForm>>();
const text = ref<string>('');
const user = ref(auth().currentUser);
const replies = ref<Array<Reply>>([]);
const filteredComments = computed(() => comments.value.filter((comment) => comment.feedbackId === feedback.value?.docId));
const filteredReplies = computed(() => replies.value.filter((reply) => reply.feedbackId === feedback.value?.docId));
const loading = ref<boolean>(false);
const commentsAndRepliesCount = computed<number>(() => filteredComments.value.length + filteredReplies.value.length);
const hasCommentsOrReplies = computed<boolean>(() => commentsAndRepliesCount.value > 0);
const commentsAndRepliesCountLabel = computed<string>(() => (commentsAndRepliesCount.value === 1
    ? t('components.comment.oneComment')
    : t('components.comment.multipleComments')));

const fetchFeedback = async (feedbackID: string): Promise<void> => {
    try {
        loading.value = true;
        const res = await db
            .collection('feedbacks')
            .doc(feedbackID)
            .get();
        
        feedback.value = res.data() as Feedback;
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const updateFeedback = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = db.collection('feedbacks').doc(feedback.value?.docId);
        await res.update({
            comments: filteredComments.value.length + filteredReplies.value.length
        });
    } catch(error: unknown) {
        handleError(error);
    } finally {
        await fetchFeedback(String(route.params.id));
        loading.value = false; 
    }
};

const fetchReplies = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('replies').get();
        replies.value = res.docs.map((doc) => doc.data() as Reply);
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const fetchComments = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('comments').get();
        comments.value = res.docs.map((doc) => doc.data() as Comment);
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const createReply = async (reply: string, commentEmail: string, commentId: string): Promise<void> => {
    try {
        loading.value = true;
        const docId = db.collection('replies').doc().id;
        await db.collection('replies').doc(docId).set({
            commentEmail: commentEmail || null,
            commentId,
            createdAt: timestamp,
            docId,
            email: user.value?.email,
            feedbackId: feedback.value?.docId,
            picture: '',
            text: reply,
            userId: user.value?.uid,
            userName: user.value?.displayName
        });
    } catch (error: unknown) {
        handleError(error);
    } finally {
        await fetchReplies();
        await fetchComments();
        await updateFeedback();
        loading.value = false;
    }
};

const createComment = async (): Promise<void> => {
    const { valid } = await form.value!.validate();
    if (!valid) return;
    const commentText = text.value;
    text.value = '';
    form.value?.resetValidation();
    try {
        loading.value = true;
        const docId = db.collection('comments').doc().id;
        await db.collection('comments').doc(docId).set({
            createdAt: timestamp,
            docId,
            email: user.value?.email,
            feedbackId: feedback.value?.docId,
            picture: '',
            text: commentText,
            userId: user.value?.uid,
            userName: user.value?.displayName
        });
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
        await fetchComments();
        await updateFeedback();
    }
};

const deleteReplies = async (feedback: Feedback): Promise<void> => {
    try {
        loading.value = true;
        replies.value.forEach(async (reply) => {
            if (reply.feedbackId === feedback.docId) {
                await db.collection('replies').doc(reply.docId).delete();
            }
        });
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const deleteComments = async (feedback: Feedback): Promise<void> => {
    try {
        loading.value = true;
        comments.value.forEach(async (comment) => {
            if (comment.feedbackId === feedback.docId) {
                await db.collection('comments').doc(comment.docId).delete();
            }
        });
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const deleteFeedback = async (feedback: Feedback): Promise<void> => {
    try {
        loading.value = true;
        if (user.value?.uid === feedback.userId) {
            await db.collection('feedbacks').doc(feedback.docId).delete();
        } else {
            show(t('errors.deleteOtherUserFeedback'));
        }
    } catch (error: unknown) {
        handleError(error);
    } finally {
        loading.value = false;
    }
};

const onEdited = (): void => {
    fetchFeedback(String(route.params.id)); 
};

const onReplyCreated = async (reply: string, commentEmail: string, commentId: string): Promise<void> => {
    await createReply(reply, commentEmail, commentId);
};

const onDeleted = async (feedback: Feedback): Promise<void> => {
    await Promise.allSettled([
        deleteFeedback(feedback),
        deleteComments(feedback),
        deleteReplies(feedback)
    ]);
    await router.push({ name: 'suggestions' });
};

onMounted(async () => {
    await fetchFeedback(String(route.params.id));
    await fetchComments();
    await fetchReplies();
});

const required = (value: string): string | true => !!value.trim() || t('validations.required');
const maxCharacters = (value: string): string | true => value.length <= CONSTANTS.TEXT_MAX_LENGTH || t('validations.maxCharacters');

</script>

<style scoped>
.width {
    width: 50vw;
    margin: 0 auto;
}

.min-height {
    min-height: calc(100vh - 64px);
}

:deep(.v-field--variant-plain) {
    background-color: rgb(var(--v-theme-background-secondary));
}
</style>