<template>
    <v-card class="pa-6">
        <v-row>
            <v-col cols="auto">
                <v-avatar
                    size="large"
                    :image="
                        props.reply.picture
                            ? props.reply.picture
                            : '../../../src//assets/avatar.png'"
                />
            </v-col>
            <v-col>
                <v-container fluid>
                    <v-row class="font-weight-bold text-dark-blue">
                        {{ props.reply.userName }}
                    </v-row>
                    <v-row class="pb-3 text-body-2 text-content">
                        {{ props.reply.email }}
                    </v-row>
                    <v-row class="text-body-2">
                        <span class="text-purple">
                            {{ props.comment.commentEmail }}
                        </span>
                        <span class="text-content">
                            {{ props.reply.text }}
                        </span>
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
                {{ new Date(props.reply.createdAt.seconds * 1000).toLocaleString() }}
            </v-col>
        </v-row>
    </v-card>

    <v-card v-if="showReply">
        <v-row class="pa-6">
            <v-col cols="10">
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
</template>

<script setup lang="ts">
/**
 * @file Reply card component.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import type { Comment } from '@/models/Comment';
import type { Reply } from '@/models/Reply';

const props = defineProps<{
    comment: Comment;
    reply: Reply;
}>();

const emits = defineEmits<(e: 'replyCreated', replyText: string) => void>();
const { t } = useI18n();
const replyText = ref<string>('');
const showReply = ref<boolean>(false);
const maxCharacters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 

const createReply = async (): Promise<void> => {
    emits('replyCreated', replyText.value);
};

const onReplyClicked = (): void => {
    showReply.value = !showReply.value;
    replyText.value = '';
};

</script>