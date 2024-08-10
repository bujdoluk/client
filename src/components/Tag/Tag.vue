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
 */
const props = defineProps<{
    active?: boolean;
    category?: string;
}>();
</script>