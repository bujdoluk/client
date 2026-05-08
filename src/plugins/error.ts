/**
 * @file Error handling plugin.
 * @description Centralised error handler — extracts Firebase error codes or standard messages and shows a snackbar.
 */
import { useSnackBarStore } from '@/stores/useSnackBarStore';

const extractMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
        if ('code' in error) return String((error as { code: unknown }).code);
        if ('message' in error) return String((error as { message: unknown }).message);
    }
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred.';
};

export const handleError = (error: unknown): void => {
    console.error(error);
    useSnackBarStore().show(extractMessage(error));
};
