<template>
    <v-btn
        :variant="variant"
        color="blue"
        class="font-weight-bold"
        size="small"
        rounded="lg"
    >
        {{ props.category }}
    </v-btn>
</template>

<script setup lang="ts">
/**
 * @file TagItem component.
 * @description Chip displaying a feedback category label.
 */
import { computed } from 'vue';

const props = defineProps<{
    category?: string;
    isActive?: boolean;
}>();

const variant = computed<'flat' | 'tonal'>(() => (props.isActive ? 'flat' : 'tonal'));
</script>
