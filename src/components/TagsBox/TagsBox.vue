<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="chip, chip, chip, chip"
    />
    <v-card v-else>
        <v-container fluid>
            <v-row class="flex-wrap ga-2 pa-2">
                <Tag
                    v-for="category in props.categories"
                    :key="category"
                    :category="category"
                    :isActive="category === props.activeCategory"
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
import Tag from '@/components/Tag/Tag.vue';

const props = defineProps<{
    activeCategory: string;
    categories: Array<string>;
    loading: boolean;
}>();

const emits = defineEmits<(e: 'clicked', category: string) => void>();

const onClicked = (category: string): void => {
    emits('clicked', category);
};
</script>
