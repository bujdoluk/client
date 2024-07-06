<template>
    <v-card
        class="bg-white pa-5"
        :color="props.feedback.color"
        rounded="lg"
        height="300px"
    >
        <v-card-text>
            <span :class="props.feedback.color" /> 
            {{ props.feedback.status }}</v-card-text>
        <v-card-title class="pb-0 font-weight-bold">
            {{ props.feedback.title }}
        </v-card-title>
        <v-card-text class="text-caption">
            {{ props.feedback.description }}
        </v-card-text>
        <v-card-text>
            <v-btn 
                class="bg-btn-default"
                variant="tonal"
                size="small"
            >
                {{ props.feedback.category }}
            </v-btn>
        </v-card-text>
        <v-card-actions>
            <v-btn 
                class="bg-btn-default"
                variant="tonal"
                size="small"
            >
                {{ props.feedback.upvotes }}
            </v-btn>
            <v-btn 
                class="bg-btn-default"
                variant="tonal"
                size="small"
            >
                {{ props.feedback.comments }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file FeedbackCard component.
 */
import { type Feedback } from '@/models/Feedback';
const props = defineProps<{
    feedback: Feedback;
}>();
</script>