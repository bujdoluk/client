<template>
    <v-skeleton-loader
        v-if="loading"
        boilerplate
        type="heading"
    />
    <v-card
        v-else
        class="bg-background-dark-blue"
    >
        <v-container fluid>
            <v-row align="center">
                <v-col
                    cols="auto"
                    class="pl-4"
                >
                    <v-icon :icon="mdiLightbulbOnOutline" />
                </v-col>
                <v-col cols="auto font-weight-bold">
                    <h3>
                        {{ total }} {{ t('views.suggestions.topbar.suggestions') }}
                    </h3>
                </v-col>
                <v-col cols="auto">
                    <v-row align="center">
                        <v-col
                            cols="auto"
                            class="font-weight-bold text-caption text-white"
                        >
                            {{ t('views.suggestions.topbar.sortBy') }}
                        </v-col>
                        <v-col cols="auto"> 
                            <v-select
                                v-model="selectedItem"
                                :items="items"
                                item-title="title"
                                item-value="value"
                                variant="solo"
                                density="compact"
                                hide-details
                                color="purple"
                                flat
                                :list-props="{ 'class': 'pa-0' }"
                                @update:model-value="onSelected"
                            >
                                <template #item="{ item, 'props': itemProps }">
                                    <v-list-item
                                        v-bind="itemProps"
                                        class="border-b-sm option-item"
                                    >
                                        <template #append>
                                            <v-icon
                                                v-if="item.raw.value === selectedItem"
                                                :icon="mdiCheck"
                                                color="purple"
                                                size="small"
                                            />
                                        </template>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </v-col>
                    </v-row>
                </v-col>
                <v-spacer />
                <v-col
                    cols="auto"
                    class="pr-4"
                >
                    <FeedbackDialog @feedback-added="onFeedbackAdded" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file SortingPanel component.
 * @description Toolbar showing feedback count, sort options and the add feedback button.
 */
import { ref, computed } from 'vue';
import { mdiCheck, mdiLightbulbOnOutline } from '@mdi/js';
import FeedbackDialog from '@/components/Dialogs/FeedbackDialog.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    loading: boolean;
    total: number;
}>();

const emit = defineEmits<{
    added: [];
    selected: [value: string];
}>();

const { t } = useI18n();
const items = computed(() => [
    { title: t('views.suggestions.topbar.mostUpvotes'), value: 'descU' },
    { title: t('views.suggestions.topbar.leastUpvotes'), value: 'ascU' },
    { title: t('views.suggestions.topbar.mostComments'), value: 'descC' },
    { title: t('views.suggestions.topbar.leastComments'), value: 'ascC' }
]);

const selectedItem = ref<string>('descU');
const loading = computed(() => props.loading);

const onSelected = (): void => {
    emit('selected', selectedItem.value);
};

const onFeedbackAdded = (): void => {
    emit('added');
};
</script>
