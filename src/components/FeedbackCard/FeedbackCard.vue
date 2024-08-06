<template>
    <v-card
        class="bg-white pa-6"
        max-height="250px"
        min-height="250px"
    >
        <v-row align="center">
            <v-col>
                <v-card-text>
                    <span :class="colors(props.feedback.status)" /> 
                    <span class="text-grey">{{ props.feedback.status }}</span>
                </v-card-text>
                <v-card-title 
                    class="cursor font-weight-bold pb-0" 
                    @click="onRedirect('feedback-detail', feedback.docId)"
                >
                    {{ props.feedback.title }}
                </v-card-title>
                <v-card-text class="text-body-2 text-grey">
                    {{ props.feedback.description }}
                </v-card-text>
                <v-card-text class="pt-3">
                    <Tag :category="props.feedback.category" />
                </v-card-text>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col>
                <v-btn 
                    color="blue"
                    variant="tonal"
                >
                    <v-icon :icon="mdiChevronUp" />   
                    {{ props.feedback.upvotes }}
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-icon 
                    :icon="mdiChat" 
                    color="background-primary"
                    class="mr-2"
                />
                {{ props.feedback.comments }}
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file FeedbackCard component.
 */
import { mdiChat, mdiChevronUp } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import Tag from '@/components/Tag/Tag.vue';
import router from '@/router';
import { Status } from '@/models/Status';

const props = defineProps<{
    feedback: Feedback;
}>();

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};

const colors = (status: string) => {
    if (status === Status.Planned) {
        return 'dot-orange';
    } else if (status === Status.InProgress) {
        return 'dot-pink';
    } else if (status === Status.Live) {
        return 'dot-teal';
    }
};
</script>