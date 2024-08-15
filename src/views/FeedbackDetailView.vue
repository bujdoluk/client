<template>
    <v-container
        fluid
        class="bg-background"
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
                <v-card
                    :min-height="90"
                    class="cursor"
                >
                    <v-container fluid>
                        <v-row>
                            <v-col
                                class="align-top d-flex justify-center"
                                cols="1"
                            >
                                <v-btn
                                    stacked
                                    class="font-weight-bold text-caption"
                                    color="blue"
                                    density="compact"
                                    variant="tonal"
                                    flat
                                    size="40"
                                >
                                    <v-icon :icon="mdiChevronUp" />
                                    {{ feedback?.upvotes }}
                                </v-btn>
                            </v-col>
                            <v-col cols="10">
                                <v-card>
                                    <v-card-text class="font-weight-bold text-darkBlue">
                                        {{ feedback?.title }}
                                    </v-card-text>
                                    <v-card-text class="text-grey">
                                        {{ feedback?.description }}
                                    </v-card-text>
                                    <v-card-actions>
                                        <Tag :category="feedback?.category" />
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-spacer />
                            <v-col
                                class="align-center d-flex font-weight-bold"
                                cols="1"
                            >
                                <v-icon 
                                    :icon="mdiChat" 
                                    color="background-primary"
                                    class="mr-2"
                                />
                                {{ feedback?.comments }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card v-if="comments.length > 0">
                    <v-container fluid>
                        <v-row v-if="comments.length > 0">
                            <v-col class="font-weight-bold text-darkBlue">
                                {{ filteredComments.length + filteredReplies.length }} 
                                {{ filteredComments.length === 1 ? t('components.comment.oneComment') : t('components.comment.multipleComments') }}
                            </v-col>
                        </v-row>
                        <v-row
                            v-for="comment in filteredComments"
                            :key="comment.id"
                        >
                            <v-col v-if="feedback">
                                <CommentCard
                                    :comment="comment"
                                    :feedback="feedback"
                                    :replies="replies"
                                    :user="user"
                                    @reply-created="(reply) => onReplyCreated(reply)"
                                    @reply-to-comment-created="(userComment) => onReplyToComment(userComment)"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-container fluid>
                    <v-card class="pa-6">
                        <v-card-text class="font-weight-bold py-3 text-darkBlue text-h6">
                            {{ t('components.comment.addComment') }}
                        </v-card-text>
                        <v-card-text>
                            <v-textarea 
                                v-model="text"
                                :placeholder="t('components.comment.typeComment')" 
                                :counter="250"
                                rows="3"
                                bg-color="background"
                                variant="solo-filled"
                                flat
                                clearable
                                :rules="[maxCharacters]"
                            />
                        </v-card-text>
                        <v-card-actions class="pt-3">
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
import { mdiChevronLeft, mdiChat, mdiChevronUp } from '@mdi/js';
import router from '@/router';
import { type Reply } from '@/models/Reply';
import { type Comment } from '@/models/Comment';
import CommentCard from '@/components/CommentCard/CommentCard.vue';
import EditFeedback from '@/components/Dialogs/EditFeedback.vue';
import Tag from '@/components/Tag/Tag.vue';
import { ref, onMounted, computed } from 'vue';
import { type Feedback } from '@/models/Feedback';
import { useRoute } from 'vue-router';
import { db, auth, timestamp } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const route = useRoute();
const { t } = useI18n();
const comments = ref<Array<Comment>>([]);
const comment = ref<Comment>();
const feedback = ref<Feedback>();
const text = ref<string>('');
const user = ref(auth().currentUser);
const replies = ref<Array<Reply>>([]);
const filteredComments = computed(() => comments.value.filter((comment) => comment.feedbackId === feedback.value?.docId));
const filteredReplies = computed(() => replies.value.filter((reply) => reply.feedbackId === feedback.value?.docId));

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

const updateFeedback = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = db.collection('feedbacks').doc(feedback.value?.docId);
        await res.update({
            comments: filteredComments.value.length + filteredReplies.value.length
        });
    } catch(error: unknown) {
        console.log(error);
    } finally {
        await fetchFeedback(String(route.params.id));
        appStore.isLoading = false; 
    }
};

const createReply = async (reply: string): Promise<void> => {
    try {
        appStore.isLoading = true;
        const docId = db.collection('replies').doc().id;
        await db.collection('replies').doc(docId).set({
            commentEmail: comment.value?.email,
            commentId: comment.value?.docId,
            createdAt: timestamp,
            docId,
            email: user.value?.email,
            feedbackId: feedback.value?.docId,
            profilePicture: '',
            text: reply,
            userId: user.value?.uid,
            userName: user.value?.displayName
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        await fetchReplies();
        await updateFeedback();
        appStore.isLoading = false;
    }
};

const createComment = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const docId = db.collection('comments').doc().id;
        await db.collection('comments').doc(docId).set({
            createdAt: timestamp,
            docId,
            email: user.value?.email,
            feedbackId: feedback.value?.docId,
            profilePicture: '',
            text: text.value,
            userId: user.value?.uid,
            userName: user.value?.displayName
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        await updateFeedback();
        await fetchComments();
        text.value = '';
    }
};

const fetchReplies = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        replies.value = [];
        const res = await db.collection('replies').get();
        replies.value = res.docs.map((doc) => doc.data() as Reply);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const fetchComments = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = await db.collection('comments').get();
        comments.value = res.docs.map((doc) => doc.data() as Comment);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const fetchFeedback = async (feedbackID: string): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = await db
            .collection('feedbacks')
            .doc(feedbackID)
            .get();
        
        feedback.value = res.data() as Feedback;
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const deleteReplies = async (feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        replies.value.forEach(async (reply) => {
            if (reply.feedbackId === feedback.docId) {
                await db.collection('replies').doc(reply.docId).delete();
            }
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const deleteComments = async (feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        comments.value.forEach(async (comment) => {
            if (comment.feedbackId === feedback.docId) {
                await db.collection('comments').doc(comment.docId).delete();
            }
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const deleteFeedback = async (feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (user.value?.uid === feedback.userId) {
            await db.collection('feedbacks').doc(feedback.docId).delete();
        } else {
            alert('You can not delete another user feedback!');
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const onEdited = (): void => {
    fetchFeedback(String(route.params.id)); 
};

const onReplyCreated = async (reply: string): Promise<void> => {
    await createReply(reply);
};

const onReplyToComment = (userComment: Comment): void => {
    comment.value = userComment;
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

const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 

</script>

<style scoped>
.width {
    width: 70vw;
    height: auto;
    margin: 0 auto;
}
</style>