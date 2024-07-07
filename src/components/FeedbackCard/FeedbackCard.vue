<template>
    <v-card
        class="bg-white pa-6"
        max-height="250px"
        min-height="250px"
    >
        <v-row align="center">
            <v-col>
                <v-card-text>
                    <span :class="props.feedback.color" /> 
                    <span class="text-grey">{{ props.feedback.status }}</span>
                </v-card-text>
                <v-card-title 
                    class="pb-0 font-weight-bold cursor" 
                    @click="onRedirect('feedback-detail', feedback.id)"
                >
                    {{ props.feedback.title }}
                </v-card-title>
                <v-card-text class="text-body-2 text-grey">
                    {{ props.feedback.description }}
                </v-card-text>
                <v-card-text class="pt-3">
                    <Tag :category="props.feedback.category"/>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col>
                <v-btn 
                    color="darkBlue"
                    variant="tonal"
                >
                    <v-icon :icon="mdiChevronUp">
                    </v-icon>   
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

const props = defineProps<{
    feedback: Feedback;
}>();

const onRedirect = (name: string, id?: string): void => {
    router.push({ name, params: { id } });
};
</script>