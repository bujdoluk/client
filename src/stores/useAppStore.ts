/**
 * @file App Store.
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AppState {
    isLoading: boolean;
    isModerationAllowed: boolean;
    showCreateReply: boolean;
}

export const useAppStore = defineStore(
    'appStore',
    () => {
        const isLoading = ref<boolean>(false);
        const showCreateReply = ref<boolean>(false);
        const isModerationAllowed = ref<boolean>(false);
        return { isLoading, isModerationAllowed, showCreateReply };
    }
);

