<template>
    <v-skeleton-loader
        v-if="loading"
        boilerplate
        type="chip, chip, chip, chip"
    />
    <v-card v-else>
        <v-container fluid>
            <v-row class="flex-wrap ga-2 pa-2">
                <TagItem
                    v-for="category in categories"
                    :key="category"
                    :category="category"
                    :is-active="isActive(category)"
                    @click="onClicked(category)"
                />
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file TagsBox component.
 * @description Sidebar box of category filter chips for narrowing the feedback list.
 */
import { computed } from 'vue';
import TagItem from '@/components/TagItem/TagItem.vue';

const props = defineProps<{
    activeCategory: string;
    categories: Array<string>;
    loading: boolean;
}>();

const emits = defineEmits<(e: 'clicked', category: string) => void>();

const categories = computed(() => props.categories);
const loading = computed(() => props.loading);

const isActive = (category: string): boolean => category === props.activeCategory;

const onClicked = (category: string): void => {
    emits('clicked', category);
};
</script>
