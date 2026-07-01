<template>
    <v-dialog
        v-model="dialog"
        width="400"
    >
        <v-card class="pa-4">
            <div class="align-center d-flex pb-2">
                <v-card-title class="font-weight-bold pa-0 text-dark-blue">
                    {{ t('components.ConfirmationDialog.title') }}
                </v-card-title>
                <v-spacer />
                <v-btn
                    :icon="mdiClose"
                    density="compact"
                    variant="text"
                    data-cy="confirmation-close-btn"
                    @click="dialog = false"
                />
            </div>
            <v-card-text class="px-0 text-body-2 text-content">
                {{ message }}
            </v-card-text>
            <v-card-actions class="pa-0 pt-2">
                <v-btn
                    variant="text"
                    color="dark-blue"
                    data-cy="confirmation-cancel-btn"
                    @click="dialog = false"
                >
                    {{ t('buttons.cancel') }}
                </v-btn>
                <v-spacer />
                <v-btn
                    variant="flat"
                    color="error"
                    data-cy="confirmation-confirm-btn"
                    @click="onConfirm"
                >
                    {{ t('buttons.delete') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file ConfirmationDialog component.
 * @description Reusable confirmation dialog that asks the user to confirm a destructive action.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiClose } from '@mdi/js';

defineProps<{
    message: string;
}>();

const emit = defineEmits<{
    confirm: [];
}>();

const { t } = useI18n();
const dialog = ref<boolean>(false);

/**
 * Opens the confirmation dialog.
 */
const open = (): void => {
    dialog.value = true;
};

const onConfirm = (): void => {
    dialog.value = false;
    emit('confirm');
};

defineExpose({ open });
</script>
