<template>
    <v-card
        :min-height="90"
        class="cursor"
    >
        <v-container>
            <v-row>
                <v-col
                    class="align-top d-flex justify-center"
                    cols="1"
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
                    class="pb-0"
                >
                    <v-card>
                        <v-card-text class="font-weight-bold text-truncate">
                            {{ props.feedback.title }}
                        </v-card-text>
                        <v-card-text class="text-grey text-truncate text-truncate width">
                            {{ props.feedback.description }}
                        </v-card-text>
                        <v-card-actions>
                            <Tag :category="props.feedback.category" />
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-spacer />
                <v-col
                    class="align-center d-flex font-weight-bold"
                    cols="1"
                >
                    <v-icon 
                        :icon="mdiChat" 
                        color="background-primary"
                        class="mr-2"
                    />
                    {{ props.feedback.comments }}
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
import { mdiChat, mdiChevronUp } from '@mdi/js';

const props = defineProps<{
    feedback: Feedback;
}>();

const emits = defineEmits<(e: 'updated', feedback: Feedback) => void>();

const updateFeedBack = (): void => {
    emits('updated', props.feedback);
};
</script>