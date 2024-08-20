<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card
        v-else
        :min-height="90"
        class="cursor"
    >
        <v-container fluid>
            <v-row>
                <v-col
                    class="align-top d-flex justify-center"
                    cols="1"
                    md="1"
                >
                    <v-btn
                        stacked
                        class="font-weight-bold text-caption"
                        color="blue"
                        density="compact"
                        variant="tonal"
                        flat
                        size="40"
                        @click.stop="updateFeedBack"
                    >
                        <v-icon :icon="mdiChevronUp" />
                        {{ props.feedback.upvotes }}
                    </v-btn>
                </v-col>
                <v-col
                    cols="9"
                    md="9"
                    class="pb-0"
                >
                    <v-card>
                        <v-card-text class="font-weight-bold text-dark-blue text-truncate">
                            {{ props.feedback.title }}
                        </v-card-text>
                        <v-card-text class="text-content text-truncate text-truncate width">
                            {{ props.feedback.description }}
                        </v-card-text>
                        <v-card-actions class="pl-0">
                            <Tag
                                :category="props.feedback.category"
                            />
                            <span class="pl-3 text-caption">
                                {{ new Date(props.feedback.createdAt.seconds * 1000).toLocaleString() }}
                            </span>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-spacer />
                <v-col
                    class="align-center d-flex font-weight-bold justify-center"
                    cols="1"
                    xl="1"
                    lg="1"
                    md="1"
                >
                    <v-badge
                        :content="props.feedback.comments"
                        color="purple"
                    >
                        <v-icon
                            color="background-primary"
                            :icon="mdiChat"
                            size="x-large"
                        />
                    </v-badge>
                </v-col>
                <v-col
                    class="align-center d-flex font-weight-bold justify-center"
                    cols="1"
                    xl="1"
                    lg="1"
                    md="1"
                >
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
 */
import Tag from '@/components/Tag/Tag.vue';
import type { Feedback } from '@/models/Feedback';
import { mdiChat, mdiChevronUp, mdiPinOutline, mdiPin } from '@mdi/js';

const props = defineProps<{
    feedback: Feedback;
    loading: boolean;
}>();

const emits = defineEmits<{ 
    (e: 'updated', feedback: Feedback): void;
    (e: 'pinned', feedback: Feedback): void;
}>();

const updateFeedBack = (): void => {
    emits('updated', props.feedback);
};

const updatePinnedFeedBack = (): void => {
    emits('pinned', props.feedback);
};
</script>