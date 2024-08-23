<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card
        v-else
        class="px-6"
    >
        <v-row>
            <v-col cols="auto">
                <v-avatar
                    size="large"
                    :image="
                        props.comment.picture
                            ? props.comment.picture
                            : '../../../src//assets/avatar.png'"
                />
            </v-col>
            <v-col>
                <v-container fluid>
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
        <v-row>
            <v-col class="d-flex justify-end pt-0 text-caption text-dark-blue">
                {{ new Date(props.comment.createdAt.seconds * 1000).toLocaleString() }}
            </v-col>
        </v-row>

        <v-card v-if="showReply">
            <v-row class="pt-6 px-6">
                <v-col>
                    <v-textarea 
                        v-model="replyText"
                        :placeholder="t('components.reply.typeReply')" 
                        :counter="250"
                        rows="2"
                        class="bg-background-secondary"
                        variant="plain"
                        flat
                        clearable
                        hide-details
                        :rules="[maxCharacters]"
                    />
                </v-col>
                <v-col cols="auto">
                    <v-btn
                        variant="flat"
                        color="purple"
                        @click="onReplyCreatedFromComment"
                    >
                        {{ t('buttons.postReply') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-row
            v-for="reply in filteredReplies"
            :key="reply.docId"
        >
            <v-col class="ml-12">
                <ReplyCard 
                    :reply="reply"
                    :feedback="feedback"
                    :user="user"
                    :comment="props.comment"
                    @reply-created="(reply) => onReplyCreatedFromReply(reply)"    
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

const emits = defineEmits<(e: 'replyCreated', replyText: string, commentEmail: string, commentId: string) => void>();

const { t } = useI18n();
const replyText = ref<string>('');
const showReply = ref<boolean>(false);
const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 
const filteredReplies = computed(() => props.replies.filter((reply) => reply.commentId === props.comment.docId));

const onReplyClicked = (): void => {
    showReply.value = !showReply.value;
    // replyText.value = '';
};

const onReplyCreatedFromReply = (text: string): void => {
    emits('replyCreated', text, props.comment.email, props.comment.docId);
    showReply.value = false;
};

const onReplyCreatedFromComment = (): void => {
    emits('replyCreated', replyText.value, props.comment.email, props.comment.docId);
    showReply.value = false;
};

</script>