/**
 * @file Snackbar store.
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface SnackbarState {
    message: string;
    visible: boolean;
}

export const useSnackBarStore = defineStore('snackbar', () => {
    const visible = ref<boolean>(false);
    const message = ref<string>('');

    const show = (msg: string): void => {
        message.value = msg;
        visible.value = true;
    };

    const hide = (): void => {
        visible.value = false;
    };

    return { hide, message, show, visible };
});
