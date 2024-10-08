<template>
    <v-container
        fluid
        class="min-height"
    >
        <v-row class="width">
            <v-col cols="auto">
                <v-btn
                    :prepend-icon="mdiChevronLeft"
                    variant="text"
                    color="blue"
                    density="compact"
                    class="font-weight-bold"
                    @click="onRedirect"
                >
                    {{ t('buttons.back') }}
                </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <EditFeedback 
                    v-if="feedback"
                    :feedback="feedback"
                    @edited="onEdited"
                    @deleted="(feedbackId) => onDeleted(feedbackId)" 
                />
            </v-col>
            <v-col cols="12">
                <FeedbackBar
                    v-if="feedback" 
                    :feedback="feedback"
                    :loading="loading"
                />
            </v-col>
            <v-col cols="12">
                <v-card v-if="filteredComments.length + filteredReplies.length > 0">
                    <v-container fluid>
                        <v-row v-if="filteredComments.length + filteredReplies.length > 0">
                            <v-col class="font-weight-bold pl-10 text-dark-blue">
                                {{ filteredComments.length + filteredReplies.length }} 
                                {{ filteredComments.length === 1 ? t('components.comment.oneComment') : t('components.comment.multipleComments') }}
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
                                    :user="user"
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
                            <v-card class="pa-6">
                                <v-card-text class="font-weight-bold py-3 text-dark-blue text-h6">
                                    {{ t('components.comment.addComment') }}
                                </v-card-text>
                                <v-card-text>
                                    <v-textarea 
                                        v-model="text"
                                        :placeholder="t('components.comment.typeComment')" 
                                        :counter="250"
                                        rows="3"
                                        class="bg-background-secondary"
                                        variant="plain"
                                        flat
                                        clearable
                                        hide-details
                                        :rules="[required, maxCharacters]"
                                    />
                                </v-card-text>
                                <v-card-actions class="pr-0 pt-3">
                                    <v-spacer />
                                    <v-btn 
                                        variant="flat"
                                        color="purple"
                                        @click="createComment"
                                    >
                                        {{ t('buttons.postComment') }}
                                    </v-btn>
                                </v-card-actions>
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
 * @file Feedback Detail View.
 */
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft } from '@mdi/js';
import router from '@/router';
import { type Reply } from '@/models/Reply';
import { type Comment } from '@/models/Comment';
import CommentCard from '@/components/CommentCard/CommentCard.vue';
import EditFeedback from '@/components/Dialogs/EditFeedback.vue';
import { ref, onMounted, computed } from 'vue';
import { type Feedback } from '@/models/Feedback';
import { useRoute } from 'vue-router';
import { db, auth, timestamp } from '@/firebase/init';

const route = useRoute();
const { t } = useI18n();
const comments = ref<Array<Comment>>([]);
const feedback = ref<Feedback>();
const text = ref<string>('');
const user = ref(auth().currentUser);
const replies = ref<Array<Reply>>([]);
const filteredComments = computed(() => comments.value.filter((comment) => comment.feedbackId === feedback.value?.docId));
const filteredReplies = computed(() => replies.value.filter((reply) => reply.feedbackId === feedback.value?.docId));
const loading = ref<boolean>(false);

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

const fetchFeedback = async (feedbackID: string): Promise<void> => {
    try {
        loading.value = true;
        const res = await db
            .collection('feedbacks')
            .doc(feedbackID)
            .get();
        
        feedback.value = res.data() as Feedback;
    } catch (error: unknown) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
    } finally {
        await fetchReplies();
        await fetchComments();
        await updateFeedback();
        loading.value = false;
    }
};

const fetchComments = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('comments').get();
        comments.value = res.docs.map((doc) => doc.data() as Comment);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const createComment = async (): Promise<void> => {
    try {
        loading.value = true;
        const docId = db.collection('comments').doc().id;
        await db.collection('comments').doc(docId).set({
            createdAt: timestamp,
            docId,
            email: user.value?.email,
            feedbackId: feedback.value?.docId,
            picture: '',
            text: text.value,
            userId: user.value?.uid,
            userName: user.value?.displayName
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
        await fetchComments();
        await updateFeedback();
        text.value = '';
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
        console.log(error);
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
        console.log(error);
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
            alert('You can not delete another user feedback!');
        }
    } catch (error: unknown) {
        console.log(error);
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
    router.push({ name: 'suggestions' });
};

onMounted(async () => {
    await fetchFeedback(String(route.params.id));
    await fetchComments();
    await fetchReplies();
});

const required = (value: string): string | true => Number(value) > 0 || t('validations.required'); 
const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 

</script>

<style scoped>
.width {
    width: 50vw;
    margin: 0 auto;
}

.min-height {
    min-height: calc(100vh - 64px);
}
</style>