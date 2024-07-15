<template>
    <v-card class="bg-darkBlue">
        <v-container>
            <v-row align="center">
                <v-col cols="auto">
                    <v-icon :icon="mdiLightbulbOnOutline" />
                </v-col>
                <v-col cols="auto font-weight-bold">
                    {{ props.feedbacks.length }} {{ t('views.suggestions.topbar.suggestions') }}
                </v-col>
                <v-col>
                    <v-row align="center">
                        <v-col
                            cols="auto"
                            class="text-caption text-grey"
                        >
                            {{ t('views.suggestions.topbar.sortBy') }}
                        </v-col>
                        <v-col> 
                            <v-select
                                v-model="selectedItem"
                                :items="items"
                                variant="solo"
                                density="compact"
                                hide-details
                                :min-width="400"
                                color="purple"
                                flat
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    <AddFeedback @feedback-added="onFeedbackAdded" />
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

const emit = defineEmits<(e: 'feedbackAdded') => void>();

const { t } = useI18n();
const items = [
    t('views.suggestions.topbar.mostUpvotes'),
    t('views.suggestions.topbar.leastUpvotes'),
    t('views.suggestions.topbar.mostComments'),
    t('views.suggestions.topbar.leastComments')
];

const selectedItem = ref<string>(items[0]);

const onFeedbackAdded = (): void => {
    emit('feedbackAdded');
};
</script>