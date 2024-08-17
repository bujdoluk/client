<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card
        v-else
        class="pb-6 px-6"
    >
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
                    <v-row class="pb-3 text-body-2 text-content">
                        {{ props.comment.email }}
                    </v-row>
                    <v-row class="text-body-2 text-contan">
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
                        @click="onReplyCreated"
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
                    @reply-created="onReplyCreated"    
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
import { ref, computed } from 'vue';
import type { Feedback } from '@/models/Feedback';

const props = defineProps<{
    comment: Comment;
    feedback: Feedback;
    loading: boolean;
    replies: Array<Reply>;
    user: any;
}>();

const emits = defineEmits<{
    (e: 'replyCreated', replyText: string): void;
    (e: 'replyToCommentCreated', comment: Comment): void;
}>();

const { t } = useI18n();
const replyText = ref<string>('');
const showReply = ref<boolean>(false);
const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 
const filteredReplies = computed(() => props.replies.filter((reply) => reply.commentId === props.comment.docId));

const onReplyClicked = (): void => {
    showReply.value = !showReply.value;
    replyText.value = '';
};

const onReplyCreated = async (): Promise<void> => {
    emits('replyCreated', replyText.value);
    emits('replyToCommentCreated', props.comment);
    showReply.value = false;
};

</script>