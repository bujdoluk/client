<template>
    <v-card class="pa-6">
        <v-row>
            <v-col cols="auto">
                <v-avatar
                    size="large"
                    :image="
                        props.comment.profilePicture
                            ? props.comment.profilePicture
                            : '../../../src//assets/avatar.png'"
                />
            </v-col>
            <v-col>
                <v-container>
                    <v-row class="font-weight-bold text-darkBlue">
                        {{ props.comment.userName }}
                    </v-row>
                    <v-row class="pb-3 text-body-2 text-grey">
                        {{ props.comment.email }}
                    </v-row>
                    <v-row class="text-body-2 text-grey">
                        {{ props.comment.text }}
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    variant="text"
                    color="blue"
                    class="font-weight-bold"
                    @click="onReplyClicked"
                >
                    {{ t('buttons.reply') }}
                </v-btn>
            </v-col>
        </v-row>

        <v-card v-if="showReply">
            <v-row class="pa-6">
                <v-col cols="10">
                    <v-textarea 
                        v-model="replyText"
                        :placeholder="t('components.reply.typeReply')" 
                        :counter="250"
                        rows="2"
                        bg-color="background"
                        variant="solo-filled"
                        flat
                        clearable
                        :rules="[maxCharacters]"
                    />
                </v-col>
                <v-col cols="2">
                    <v-btn
                        variant="flat"
                        color="purple"
                        @click="createReply"
                    >
                        {{ t('buttons.postReply') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-row
            v-for="reply in filteredReplies"
            :key="reply.id"
        >
            <v-col>
                <ReplyCard 
                    :reply="reply"
                    :feedback="feedback"
                    :user="user"
                    :comment="props.comment"
                    @replies-fetched="onFetchReplies"    
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file Comment card component.
 */
import { useI18n } from 'vue-i18n';
import { type Comment } from '@/models/Comment';
import { type Reply } from '@/models/Reply';
import ReplyCard from '@/components/ReplyCard/ReplyCard.vue';
import { ref, computed, onMounted } from 'vue';
import { db } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';
import type { Feedback } from '@/models/Feedback';

const props = defineProps<{
    comment: Comment;
    feedback: Feedback;
    user: any;
}>();

const emits = defineEmits<(e: 'replyCreated', replyText: string) => void>();

const { t } = useI18n();
const appStore = useAppStore();
const replies = ref<Array<Reply>>([]);
const replyText = ref<string>('');
const showReply = ref<boolean>(false);
const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 
const filteredReplies = computed(() => replies.value.filter((reply) => reply.commentId === props.comment.docId));

const fetchReplies = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = await db.collection('replies').get();
        replies.value = res.docs.map((doc) => doc.data() as Reply);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const createReply = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const docId = db.collection('replies').doc().id;
        await db.collection('replies').doc(docId).set({
            commentEmail: props.comment.email,
            commentId: props.comment.docId,
            docId,
            email: props.user.email,
            feedbackId: props.feedback.docId,
            profilePicture: '',
            text: replyText.value,
            userId: props.user.uid,
            userName: props.user.displayName
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        await fetchReplies();
        appStore.isLoading = false;
        showReply.value = false;
    }
};

const onReplyClicked = (): void => {
    showReply.value = !showReply.value;
    replyText.value = '';
};

const onFetchReplies = (): void => {
    fetchReplies();
};

onMounted(async () => {
    await fetchReplies();
    console.log(props.comment.commentEmail);
});
</script>