/**
 * @file App Store.
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AppState {
    isLoading: boolean;
    showCreateReply: boolean;
}

export const useAppStore = defineStore(
    'appStore',
    () => {
        const isLoading = ref<boolean>(false);
        const showCreateReply = ref<boolean>(false);
        return { isLoading, showCreateReply };
    }
);

