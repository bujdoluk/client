<template>
    <v-app-bar
        elevation="3"
        class="bg-darkBlue"
        title="Product Feedback App"
    >
        <SignUp />
        <LogIn />
    </v-app-bar>
</template>

<script setup lang="ts">
/**
 * @file AppToolbar.
 */
import LogIn from '@/components/Auth/LogIn.vue';
import SignUp from '@/components/Auth/SignUp.vue';
</script>
