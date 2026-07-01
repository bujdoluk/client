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
                    :variant="upvoteVariant"
                    size="40"
                    data-cy="feedback-upvote-btn"
                    @click.stop="updateFeedBack"
                >
                    <v-icon :icon="mdiChevronUp" />
                    {{ props.feedback.upvotes }}
                </v-btn>
            </v-col>
            <v-col class="py-4">
                <div class="align-center d-flex ga-2 mb-1">
                    <v-chip
                        :color="statusColor"
                        size="small"
                        variant="tonal"
                    >
                        {{ statusLabel }}
                    </v-chip>
                    <span class="font-weight-bold text-dark-blue">
                        {{ props.feedback.title }}
                    </span>
                </div>
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
                    :icon="pinIcon"
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
import { useI18n } from 'vue-i18n';
import TagItem from '@/components/TagItem/TagItem.vue';
import type { Feedback } from '@/types/index.ts';
import { Status } from '@/types/index.ts';
import { mdiChat, mdiChevronUp, mdiPin, mdiPinOutline } from '@mdi/js';

const props = defineProps<{
    feedback: Feedback;
    loading: boolean;
}>();

const emits = defineEmits<{
    pinned: [feedback: Feedback];
    updated: [payload: { feedback: Feedback; isActiveVote: boolean }];
}>();

const { t } = useI18n();
const isActiveVote = ref<boolean>(false);
const loading = computed(() => props.loading);
const upvoteVariant = computed<'flat' | 'tonal'>(() => (isActiveVote.value ? 'flat' : 'tonal'));
const pinIcon = computed<string>(() => (props.feedback.pinned ? mdiPin : mdiPinOutline));

const statusColor = computed<string>(() => {
    switch (props.feedback.status) {
        case Status.Live: return 'success';
        case Status.InProgress: return 'warning';
        default: return 'purple';
    }
});

const statusLabel = computed<string>(() => {
    switch (props.feedback.status) {
        case Status.Live: return t('views.roadmap.status.live');
        case Status.InProgress: return t('views.roadmap.status.inProgress');
        default: return t('views.roadmap.status.planned');
    }
});

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
