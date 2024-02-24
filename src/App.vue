<template>
    <v-layout>
        <LandingView />
        <v-main>
            <AppToolbar />
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
import LandingView from './views/LandingView.vue';
</script>
