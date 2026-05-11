<template>
    <v-skeleton-loader
        v-if="loading"
        boilerplate
        type="list-item-two-line"
    />
    <v-card
        v-else
        class="card-height cursor pl-3"
        data-cy="feedback-bar-card"
    >
        <v-row align="center">
            <v-col
                cols="auto"
                class="align-center d-flex flex-shrink-0 justify-center px-3"
            >
                <v-btn
                    stacked
                    class="font-weight-bold text-caption"
                    color="blue"
                    density="compact"
                    :variant="isActiveVote ? 'flat' : 'tonal'"
                    size="40"
                    data-cy="feedback-upvote-btn"
                    @click.stop="updateFeedBack"
                >
                    <v-icon :icon="mdiChevronUp" />
                    {{ props.feedback.upvotes }}
                </v-btn>
            </v-col>
            <v-col class="py-4">
                <p class="font-weight-bold mb-1 text-dark-blue">
                    {{ props.feedback.title }}
                </p>
                <p class="mb-2 text-body-2 text-content">
                    {{ props.feedback.description }}
                </p>
                <TagItem :category="props.feedback.category" />
            </v-col>
            <v-spacer />
            <v-col
                cols="auto"
                class="align-center d-flex ga-1"
            >
                <v-icon
                    :icon="mdiChat"
                    color="background-primary"
                />
                <span class="font-weight-bold text-dark-blue">
                    {{ props.feedback.comments }}
                </span>
            </v-col>
            <v-col
                cols="auto"
                class="align-center d-flex"
            >
                <v-btn
                    variant="plain"
                    color="purple"
                    :icon="props.feedback.pinned ? mdiPin : mdiPinOutline"
                    data-cy="feedback-pin-btn"
                    @click.stop="updatePinnedFeedBack"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
/**
 * @file FeedbackBar component.
 * @description Feedback list item showing upvote, title, description, category and comment count.
 */
import { ref, computed } from 'vue';
import TagItem from '@/components/TagItem/TagItem.vue';
import type { Feedback } from '@/types/index.ts';
import { mdiChat, mdiChevronUp, mdiPin, mdiPinOutline } from '@mdi/js';

const props = defineProps<{
    feedback: Feedback;
    loading: boolean;
}>();

const emits = defineEmits<{
    pinned: [feedback: Feedback];
    updated: [payload: { feedback: Feedback; isActiveVote: boolean }];
}>();

const isActiveVote = ref<boolean>(false);
const loading = computed(() => props.loading);

const updateFeedBack = (): void => {
    isActiveVote.value = !isActiveVote.value;
    emits('updated', { feedback: props.feedback, isActiveVote: isActiveVote.value });
};

const updatePinnedFeedBack = (): void => {
    emits('pinned', props.feedback);
};
</script>

<style scoped>
.card-height {
    min-height: 100px;
}
</style>
