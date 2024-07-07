<template>
    <v-btn 
        variant="tonal"
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
    category: string;
}>();
</script>