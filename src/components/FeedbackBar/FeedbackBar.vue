<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="list-item-two-line"
    />
    <v-card
        v-else
        :min-height="90"
        class="cursor"
    >
        <v-container fluid>
            <v-row align="center">
                <v-col
                    class="d-flex justify-center"
                    cols="1"
                >
                    <v-btn
                        stacked
                        class="font-weight-bold text-caption"
                        color="blue"
                        density="compact"
                        :variant="isActiveVote ? 'flat' : 'tonal'"
                        flat
                        size="40"
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
                <v-col cols="auto">
                    <v-btn
                        variant="plain"
                        color="purple"
                        :icon="props.feedback.pinned ? mdiPin : mdiPinOutline"
                        @click.stop="updatePinnedFeedBack"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts" setup>
/**
 * @file FeedbackBar component.
 * @description Feedback list item showing upvote, title, description, category and comment count.
 */
import { ref } from 'vue';
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

const updateFeedBack = (): void => {
    isActiveVote.value = !isActiveVote.value;
    emits('updated', { feedback: props.feedback, isActiveVote: isActiveVote.value });
};

const updatePinnedFeedBack = (): void => {
    emits('pinned', props.feedback);
};
</script>
