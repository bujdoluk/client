<template>
    <v-layout>
        <AppToolbar />
        <v-main>
            <RouterView />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
/**
 * @file App.vue.
 * @description Main application component.
 */
import AppToolbar from '@/components/AppToolbar/AppToolbar.vue';

</script>

<style>
.cursor {
    cursor: pointer;
}
</style>
