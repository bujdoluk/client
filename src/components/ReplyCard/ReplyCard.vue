<template>
    <v-card
        class="custom-border pl-6"
        :rounded="false"
    >
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
                        {{ capitalizeFirstLetter(props.reply.userName) }}
                    </v-row>
                    <v-row class="pb-3 text-body-2 text-content">
                        {{ props.reply.email }}
                    </v-row>
                    <v-row class="text-body-2">
                        <span class="font-weight-bold pr-2 text-purple">
                            {{ comment.email }}
                        </span>
                        <span class="text-content">
                            {{ props.reply.text }}
                        </span>
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
                    @click="onReplyClicked"
                >
                    {{ showReply ? t('buttons.hide') : t('buttons.reply') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex justify-end pt-0">
                <span class="date-text">{{ formattedDate }}</span>
            </v-col>
        </v-row>
    </v-card>

    <v-form
        v-if="showReply"
        ref="form"
        validate-on="submit"
    >
        <v-card>
            <v-row class="pa-6">
                <v-col cols="10">
                    <v-textarea
                        v-model="replyText"
                        :placeholder="t('components.reply.typeReply')"
                        :counter="CONSTANTS.TEXT_MAX_LENGTH"
                        :rows="CONSTANTS.REPLY_TEXTAREA_ROWS"
                        class="bg-background-secondary px-3"
                        variant="plain"
                        flat
                        clearable
                        hide-details="auto"
                        :rules="[required, maxCharacters]"
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
    </v-form>
</template>

<script setup lang="ts">
/**
 * @file Reply card component.
 * @description Displays a single reply to a comment including author and reply text.
 */
import { useI18n } from 'vue-i18n';
import { ref, shallowRef, computed } from 'vue';
import type { VForm } from 'vuetify/components';
import { CONSTANTS } from '@/constants/index';
import type { Comment, Reply } from '@/types/index.ts';

const props = defineProps<{
    comment: Comment;
    reply: Reply;
}>();

const emits = defineEmits<(e: 'replyCreated', replyText: string) => void>();
const { t } = useI18n();
const form = shallowRef<InstanceType<typeof VForm>>();
const replyText = ref<string>('');
const showReply = ref<boolean>(false);
const formattedDate = computed(() => new Date((props.reply.createdAt as unknown as { seconds: number }).seconds * 1000).toLocaleString());
const required = (value: string): string | true => Number(value) > 0 || t('validations.required'); 
const maxCharacters = (value: string): string | true => value.length <= CONSTANTS.TEXT_MAX_LENGTH || t('validations.maxCharacters');
const capitalizeFirstLetter = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

const createReply = async (): Promise<void> => {
    const { valid } = await form.value!.validate();
    if (!valid) return;
    emits('replyCreated', replyText.value);
};

const onReplyClicked = (): void => {
    showReply.value = !showReply.value;
    replyText.value = '';
};

</script>

<style scoped>
.custom-border {
    border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.date-text {
    color: rgb(var(--v-theme-content));
    font-size: 0.72rem;
    font-style: italic;
    letter-spacing: 0.03em;
    padding: 0 8px 8px 0;
}
</style>
