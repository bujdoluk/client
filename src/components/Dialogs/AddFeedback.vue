<template>
    <v-btn 
        variant="flat"
        color="purple"
        :prepend-icon="mdiPlus"
        @click="open"
    >
        {{ t('buttons.add') }}
    </v-btn>
    <v-dialog 
        v-model="dialog"
        width="600"
        persistent
    >
        <v-form v-model="valid">
            <v-card class="pa-5">
                <v-card-title class="font-weight-bold py-5 text-h5">
                    {{ t('components.Dialog.title') }}
                </v-card-title>
                <v-card-text class="font-weight-bold">
                    {{ t('components.Dialog.feedbackTitle') }}
                </v-card-text>
                <v-card-text class="text-caption text-disabled">
                    {{ t('components.Dialog.feedbackSubtitle') }}
                </v-card-text>
                <v-card-text class="py-5">
                    <v-text-field
                        v-model="title"
                        label="Name"
                        required
                        density="compact"
                        variant="outlined"
                        class="bg-background-secondary"
                        hide-details
                        counter="45"
                    />
                </v-card-text>
                <v-card-text class="font-weight-bold">
                    {{ t('components.Dialog.category') }}
                </v-card-text>
                <v-card-text class="text-caption text-disabled">
                    {{ t('components.Dialog.categorySubtitle') }}
                </v-card-text>
                <v-card-text class="py-5">
                    <v-select
                        v-model="category"
                        :label="t('components.Dialog.category')"
                        density="compact"
                        variant="outlined"
                        hide-details
                        class="bg-background-secondary"
                        :items="['Feature', 'Bug', 'Enhancement', 'UI', 'UX', 'All']"
                    />
                </v-card-text>
                <v-card-text class="font-weight-bold">
                    {{ t('components.Dialog.feedbackDetail') }}
                </v-card-text>
                <v-card-text class="text-caption text-disabled">
                    {{ t('components.Dialog.feedbackDetailSubtitle') }}
                </v-card-text>
                <v-card-text class="py-5">
                    <v-textarea 
                        v-model="description"
                        variant="plain"
                        density="compact"
                        no-resize
                        rows="3"
                        class="bg-background-secondary"
                        :counter="250"
                        clearable
                    />
                </v-card-text>
                <v-card-actions class="pt-5">
                    <v-spacer />
                    <v-btn
                        variant="flat"
                        color="darkBlue"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="purple"
                        @click="addFeedback"
                    >
                        {{ t('buttons.add') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Add Feedback component.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiPlus } from '@mdi/js';
import { db, auth } from '@/firebase/init';
import { Status } from '@/models/Status';
import { useAppStore } from '@/stores/useAppStore';

const emit = defineEmits<(e: 'feedbackAdded') => void>();

const user = ref(auth().currentUser);
const appStore = useAppStore();
const { t } = useI18n();
const valid = ref(false);
const dialog = ref<boolean>(false);
const title = ref('');
const description = ref('');
const category = ref<string>();

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    dialog.value = false;
};

const addFeedback = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        const docId = db.collection('feedbacks').doc().id;
        await db.collection('feedbacks').doc(docId).set({
            category: category.value,
            comments: 0,
            description: description.value,
            docId,
            status: Status.Planned,
            title: title.value,
            upvotes: 0,
            userId: user.value?.uid
        });
    } catch(error: unknown) {
        console.log(error);
    } finally {
        dialog.value = false;
        emit('feedbackAdded');
        appStore.isLoading = false;
    }
};

</script>