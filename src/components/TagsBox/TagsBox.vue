<template>
    <v-card class="pa-3">
        <v-container fluid>
            <v-row>
                <v-col
                    v-for="category in props.categories"
                    :key="category"
                    class="pa-2"
                >
                    <Tag :category="category"/>
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
    categories: Array<string>;
}>();
</script>