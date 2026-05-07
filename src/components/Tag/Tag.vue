<template>
    <v-btn
        :variant="props.isActive ? 'flat' : 'tonal'"
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
 * @file Tag component.
 * @description Chip displaying a feedback category label.
 */
const props = defineProps<{
    category?: string;
    isActive?: boolean;
}>();
</script>
