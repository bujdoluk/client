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

.dot-orange {
    height: 10px;
    width: 10px;
    background-color: #F49F85;
    border-radius: 50%;
    display: inline-flex;
}

.dot-pink {
    height: 10px;
    width: 10px;
    background-color: #AD1FEA;
    border-radius: 50%;
    display: inline-flex;
}

.dot-teal {
    height: 10px;
    width: 10px;
    background-color: #62BCFA;
    border-radius: 50%;
    display: inline-flex;
}
</style>
