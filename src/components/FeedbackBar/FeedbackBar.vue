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
                    cols="10"
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
                            <Tag :category="props.feedback.category" />
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-spacer />
                <v-col
                    class="align-center d-flex font-weight-bold justify-end"
                    cols="1"
                    md="2"
                >
                    <v-icon 
                        :icon="mdiChat" 
                        color="background-primary"
                        class="mr-2"
                    />
                    {{ props.feedback.comments }}
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col cols="1">
                    &nbsp;
                </v-col>
                <v-col class="pt-0 text-caption text-dark-blue">
                    {{ new Date(props.feedback.createdAt.seconds * 1000).toLocaleString() }}
                </v-col>
                <v-spacer />
                <v-col
                    cols="1"
                    class="pb-2 py-0"
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