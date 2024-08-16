<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card v-else>
        <v-container fluid>
            <v-row>
                <v-col
                    v-for="category in props.categories"
                    :key="category"
                    cols="auto"
                >
                    <Tag
                        :category="category"
                        :active="props.active"
                        @click="onClicked(category)"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file TagsBox component.
 */
import Tag from '@/components/Tag/Tag.vue';

const props = defineProps<{
    active: boolean;
    categories: Array<string>;
    loading: boolean;
}>();

const emits = defineEmits<(e: 'clicked', category: string) => void>();

const onClicked = (category: string): void => {
    emits('clicked', category);
};
</script>