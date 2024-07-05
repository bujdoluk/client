<template>
    <v-card class="bg-darkBlue">
        <v-container>
            <v-row align="center">
                <v-col cols="1">
                    <v-icon :icon="mdiLightbulbOnOutline" />
                </v-col>
                <v-col cols="2">
                    {{ props.feedbacks.length }} {{ t('views.suggestions.topbar.suggestions') }}
                </v-col>
                <v-col cols="4">
                    <span class="text-caption">
                        {{ t('views.suggestions.topbar.sortBy') }}
                    </span>
                    <v-select
                        v-model="selectedItem"
                        :items="items"
                        variant="solo"
                        density="compact"
                        @update:model-value="sortBy"
                    />
                </v-col>
                <v-spacer />
                <v-col>
                    <AddFeedback />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file SortingPanel component.
 */
import { ref } from 'vue';
import { mdiLightbulbOnOutline } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import AddFeedback from '@/components/Dialogs/AddFeedback.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    feedbacks: Array<Feedback>;
}>();

const { t } = useI18n();
const items = [
    { title: t('views.suggestions.topbar.mostUpvotes') },
    { title: t('views.suggestions.topbar.leastUpvotes') },
    { title: t('views.suggestions.topbar.mostComments') },
    { title: t('views.suggestions.topbar.leastComments') }
];

const selectedItem = ref<number>();
let upvotesArray: Array<number>;
let commentsArray: Array<number>;

const sortBy = (): void => {
    props.feedbacks.forEach((feedback) => {
        upvotesArray.push(feedback.upvotes);
    });
    props.feedbacks.forEach((feedback) => {
        commentsArray.push(feedback.comments);
    });
    upvotesArray.sort();
    commentsArray.sort();
    console.log(upvotesArray.sort());
};
</script>