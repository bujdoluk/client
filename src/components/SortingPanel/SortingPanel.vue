<template>
    <v-card class="bg-darkBlue">
        <v-container>
            <v-row align="center">
                <v-col
                    cols="auto"
                    class="pl-4"
                >
                    <v-icon :icon="mdiLightbulbOnOutline" />
                </v-col>
                <v-col cols="auto font-weight-bold">
                    <h3>
                        {{ props.feedbacks.length }} {{ t('views.suggestions.topbar.suggestions') }}
                    </h3>
                </v-col>
                <v-col cols="auto">
                    <v-row align="center">
                        <v-col
                            cols="auto"
                            class="text-caption text-grey"
                        >
                            {{ t('views.suggestions.topbar.sortBy') }}
                        </v-col>
                        <v-col cols="auto"> 
                            <v-select
                                v-model="selectedItem"
                                :items="items"
                                variant="solo"
                                density="compact"
                                hide-details
                                :min-width="400"
                                color="purple"
                                flat
                                @update:model-value="onSelected"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-spacer />
                <v-col
                    cols="auto"
                    class="pr-4"
                >
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

const emit = defineEmits<{
    (e: 'added'): void;
    (e: 'selected', selectedItem: any): void;
}>();

const { t } = useI18n();
const items = [
    t('views.suggestions.topbar.mostUpvotes'),
    t('views.suggestions.topbar.leastUpvotes'),
    t('views.suggestions.topbar.mostComments'),
    t('views.suggestions.topbar.leastComments')
];

const selectedItem = ref<string>(items[0]);

const onSelected = (): void => {
    emit('selected', selectedItem);
};

const onFeedbackAdded = (): void => {
    emit('added');
};
</script>