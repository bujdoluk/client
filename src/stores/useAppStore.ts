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
        const activeFormId = ref<string | null>(null);

        const toggleForm = (id: string): void => {
            activeFormId.value = activeFormId.value === id ? null : id;
        };

        const closeForm = (): void => {
            activeFormId.value = null;
        };

        const isFormOpen = (id: string): boolean => activeFormId.value === id;

        return { activeFormId, closeForm, isFormOpen, isLoading, isModerationAllowed, showCreateReply, toggleForm };
    }
);

