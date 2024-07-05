<template>
    <v-card>
        <v-container fluid>
            <v-row>
                <v-col
                    v-for="category in props.categories"
                    :key="category"
                    class="pa-2"
                >
                    <v-btn
                        :active="isActive"
                        variant="tonal"
                        density="default"
                        size="small"
                        :color="isActive ? 'white' : 'blue'"
                        class="font-weight-bold"
                        :class="isActive ? 'bg-background' : 'bg-blue'"
                        @click="isActive = !isActive"
                    >
                        {{ category }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file TagsBox component.
 */
import { ref } from 'vue';

const props = defineProps({
    categories: Array<string>
});
const isActive = ref<boolean>(false);
</script>