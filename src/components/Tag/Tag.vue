<template>
    <v-btn 
        variant="tonal"
        :active="props.active"
        color="blue"
        class="font-weight-bold"
        size="small"
    >
        {{ props.category }}
    </v-btn>
</template>

<script setup lang="ts">
/**
 * @file Tag component.
 * @description Chip displaying a feedback category label.
 */
const props = defineProps<{
    active?: boolean;
    category?: string;
}>();
</script>