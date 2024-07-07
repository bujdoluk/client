<template>
    <v-btn 
        variant="tonal"
        color="blue"
        rounded="lg"
        class="font-weight-bold"
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