<template>
    <v-layout>
        <AppToolbar />
        <LoaderOverlay />
        <v-main class="bg-background overflow-y-auto">
            <RouterView />
        </v-main>
        <v-snackbar
            v-model="visible"
            color="error"
            :timeout="CONSTANTS.SNACKBAR_TIMEOUT"
            location="bottom right"
        >
            {{ message }}
            <template #actions>
                <v-btn
                    variant="text"
                    @click="hide"
                >
                    {{ t('buttons.close') }}
                </v-btn>
            </template>
        </v-snackbar>
    </v-layout>
</template>

<script setup lang="ts">
/**
 * @file App.vue.
 * @description Main application component.
 */
import { useI18n } from 'vue-i18n';
import AppToolbar from '@/components/AppToolbar/AppToolbar.vue';
import LoaderOverlay from '@/components/LoaderOverlay/LoaderOverlay.vue';
import { useSnackBarStore } from '@/stores/useSnackBarStore';
import { CONSTANTS } from '@/constants/index';

const { t } = useI18n();
const { hide, message, visible } = useSnackBarStore();
</script>

<style>
* {
    font-family: 'Jost', sans-serif;
}

.cursor:hover {
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

.v-card.card-shadow {
    box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.12) !important;
}
</style>
