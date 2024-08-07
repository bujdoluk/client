<template>
    <v-btn 
        variant="flat"
        color="blue"
        :prepend-icon="mdiPlus"
        @click="dialog = true"
    >
        {{ t('buttons.edit') }}
    </v-btn>

    <v-dialog 
        v-model="dialog"
        width="600"
        :transition="false"
        persistent
    >
        <v-form v-model="valid">
            <v-card class="pa-5">
                <v-card-title class="font-weight-bold py-5 text-h5">
                    {{ `Editing "${selectedTitle}"` }}
                </v-card-title>
                <v-card-text class="font-weight-bold">
                    {{ t('components.Dialog.feedbackTitle') }}
                </v-card-text>
                <v-card-text class="text-caption text-disabled">
                    {{ t('components.Dialog.feedbackSubtitle') }}
                </v-card-text>
                <v-card-text class="py-5">
                    <v-text-field
                        v-model="selectedTitle"
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
                        v-model="selectedCategory"
                        :label="t('components.Dialog.category')"
                        density="compact"
                        variant="outlined"
                        hide-details
                        class="bg-background-secondary"
                        :items="['Feature', 'Bug', 'Enhancement', 'UI', 'UX', 'All']"
                    />
                </v-card-text>
                <v-card-text class="font-weight-bold">
                    {{ t('components.Dialog.updateStatus') }}
                </v-card-text>
                <v-card-text class="text-caption text-disabled">
                    {{ t('components.Dialog.updateStatusSubtitle') }}
                </v-card-text>
                <v-card-text class="py-5">
                    <v-select
                        v-model="selectedStatus"
                        :label="t('components.Dialog.updateStatus')"
                        density="compact"
                        variant="outlined"
                        hide-details
                        class="bg-background-secondary"
                        :items="[String(Status.Planned), String(Status.Live), String(Status.InProgress)]"
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
                        v-model="selectedDescription"
                        variant="plain"
                        density="compact"
                        no-resize
                        rows="3"
                        class="bg-background-secondary"
                        :counter="250"
                    />
                </v-card-text>
                <v-card-actions class="pt-5">
                    <v-btn
                        variant="flat"
                        color="error"
                        @click="deleteFeedback(prop.feedback)"
                    >
                        {{ t('buttons.delete') }}
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        variant="flat"
                        color="darkBlue"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-btn
                        v-if="prop.feedback?.docId"
                        variant="flat"
                        color="purple"
                        @click="editFeedback(prop.feedback.docId)"
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
 * @file Edit Feedback component.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiPlus } from '@mdi/js';
import { db, auth } from '@/firebase/init';
import type { Feedback } from '@/models/Feedback';
import { Status } from '@/models/Status';
import { useAppStore } from '@/stores/useAppStore';

const prop = defineProps<{ feedback: Feedback }>();
const emit = defineEmits<(e: 'edited' | 'deleted') => void>();

const appStore = useAppStore();
const { t } = useI18n();
const valid = ref(false);
const dialog = ref<boolean>(false);
const userId = ref<string | undefined>(auth().currentUser?.uid);
const selectedTitle = ref<string>(prop.feedback.title);
const selectedDescription = ref<string>(prop.feedback.description);
const selectedCategory = ref<string>(prop.feedback.category);
const selectedStatus = ref<string>(prop.feedback.status);

const reset = (): void => {
    selectedCategory.value = '';
    selectedDescription.value = '';
    selectedStatus.value = Status.Planned;
    selectedCategory.value = '';
};  

const editFeedback = async (docId: string): Promise<void> => {
    try {
        if (prop.feedback.docId) {
            appStore.isLoading = true;
            await db.collection('feedbacks').doc(docId).set({
                category: selectedCategory.value,
                comments: 0,
                description: selectedDescription.value,
                docId,
                status: selectedStatus.value,
                title: selectedTitle.value,
                upvotes: 0,
                userId: userId.value
            });
        }
    } catch(error: unknown) {
        console.log(error);
    } finally {
        emit('edited');
        reset();
        dialog.value = false;
        appStore.isLoading = false;
    }
};

const close = (): void => {
    reset();
    dialog.value = false;
};

const deleteFeedback = async (feedback: Feedback): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (userId.value === feedback.userId) {
            await db.collection('feedbacks').doc(feedback.docId).delete();
        } else {
            alert('You can not delete another user feedback!');
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        dialog.value = false;
        emit('deleted');
    }
};

</script>