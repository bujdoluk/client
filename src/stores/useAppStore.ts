/**
 * @file App Store.
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AppState {
    isLoading: boolean;
}

export const useAppStore = defineStore(
    'appStore',
    () => {
        const isLoading = ref<boolean>(false);
        return { isLoading };
    }
);

