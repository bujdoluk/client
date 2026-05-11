<template>
    <v-form
        ref="form"
        validate-on="submit"
    >
        <v-skeleton-loader
            v-if="loading"
            boilerplate
            type="list-item-avatar-three-line"
        />
        <v-card
            v-else
            class="custom-border pb-4 px-6"
            :rounded="false"
            data-cy="comment-card"
        >
            <v-row>
                <v-col cols="auto">
                    <v-avatar
                        size="large"
                        :image="props.comment.picture || avatarFallback"
                    />
                </v-col>
                <v-col>
                    <v-container fluid>
                        <v-row class="font-weight-bold text-darkBlue">
                            {{ capitalizeFirstLetter(props.comment.userName) }}
                        </v-row>
                        <v-row class="pb-3 text-body-2 text-content">
                            {{ props.comment.email }}
                        </v-row>
                        <v-row class="text-body-2 text-content">
                            {{ props.comment.text }}
                        </v-row>
                    </v-container>
                </v-col>
                <v-col
                    cols="auto"
                    class="pr-2 pt-4"
                >
                    <v-btn
                        variant="text"
                        color="blue"
                        class="font-weight-bold px-4 py-2"
                        data-cy="comment-reply-toggle-btn"
                        @click="onReplyClicked"
                    >
                        {{ showReply ? t('buttons.hide') : t('buttons.reply') }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-end pt-0 text-caption text-dark-blue">
                    {{ formattedDate }}
                </v-col>
            </v-row>

            <v-card
                v-if="showReply"
                class="mb-3 mt-4"
                data-cy="comment-reply-form-card"
            >
                <v-row class="pa-4">
                    <v-col>
                        <v-textarea
                            v-model="replyText"
                            :placeholder="t('components.reply.typeReply')"
                            :counter="CONSTANTS.TEXT_MAX_LENGTH"
                            :rows="CONSTANTS.REPLY_TEXTAREA_ROWS"
                            class="bg-background-secondary"
                            variant="plain"
                            flat
                            clearable
                            hide-details="auto"
                            :rules="[required, maxCharacters]"
                            data-cy="comment-reply-textarea"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            variant="flat"
                            color="purple"
                            data-cy="comment-post-reply-btn"
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
                <v-col class="ml-9">
                    <ReplyCard
                        :reply="reply"
                        :feedback="feedback"
                        :comment="props.comment"
                        @reply-created="onReplyCreatedFromReply"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
/** @file Comment card component. */
import { shallowRef, computed, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import { CONSTANTS } from '@/constants/index';
import { useI18n } from 'vue-i18n';
import { type Comment, type Reply, type Feedback } from '@/types/index.ts';
import ReplyCard from '@/components/ReplyCard/ReplyCard.vue';
import avatarFallback from '@/assets/avatar.png';
import { useAppStore } from '@/stores/useAppStore';

const props = defineProps<{
    comment: Comment;
    feedback: Feedback;
    loading: boolean;
    replies: Array<Reply>;
}>();

const emit = defineEmits<{
    replyCreated: [replyText: string, commentEmail: string, commentId: string];
}>();

const { t } = useI18n();
const { toggleForm, isFormOpen, closeForm } = useAppStore();
const form = shallowRef<InstanceType<typeof VForm>>();
const replyText = ref('');

const formId = computed(() => `comment-reply-${props.comment.docId}`);
const showReply = computed(() => isFormOpen(formId.value));

const filteredReplies = computed(() => props.replies.filter((reply) => reply.commentId === props.comment.docId));
// createdAt is a Firestore Timestamp at runtime despite the string type in the interface
const formattedDate = computed(() => new Date((props.comment.createdAt as unknown as { seconds: number }).seconds * 1000).toLocaleString());

const onReplyClicked = (): void => {
    replyText.value = '';
    form.value?.resetValidation();
    toggleForm(formId.value);
};

const onReplyCreatedFromReply = (text: string): void => {
    emit('replyCreated', text, props.comment.email, props.comment.docId);
};

const onReplyCreatedFromComment = async (): Promise<void> => {
    const { valid } = await form.value!.validate();
    if (!valid) return;
    const text = replyText.value;
    replyText.value = '';
    form.value?.resetValidation();
    closeForm();
    emit('replyCreated', text, props.comment.email, props.comment.docId);
};

const required = (value: string): string | true => !!value.trim() || t('validations.required');
const maxCharacters = (value: string): string | true => value.length <= CONSTANTS.TEXT_MAX_LENGTH || t('validations.maxCharacters');
const capitalizeFirstLetter = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);
</script>

<style scoped>
.custom-border {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
