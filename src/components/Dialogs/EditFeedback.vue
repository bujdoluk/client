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
        <v-skeleton-loader
            v-if="loading"
            boilerplate
            type="card"
        />
        <v-card
            v-else
            class="pa-5"
        >
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
                    label="Title"
                    required
                    density="compact"
                    variant="outlined"
                    class="bg-background-secondary"
                    hide-details
                    counter="45"
                    clearable
                    :rules="[required, max100Characters]"
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
                    variant="filled"
                    density="compact"
                    no-resize
                    rows="3"
                    hide-details
                    class="bg-background-secondary"
                    :counter="250"
                    clearable
                    :rules="[required, max250Characters]"
                />
            </v-card-text>
            <v-card-actions class="pt-5">
                <v-btn
                    variant="flat"
                    color="error"
                    @click="deleteFeedback"
                >
                    {{ t('buttons.delete') }}
                </v-btn>
                <v-spacer />
                <v-btn
                    variant="flat"
                    color="dark-blue"
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
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Edit Feedback component.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiPlus } from '@mdi/js';
import { db, auth, timestamp } from '@/firebase/init';
import type { Feedback } from '@/models/Feedback';
import { Status } from '@/models/Status';

const prop = defineProps<{ feedback: Feedback }>();
const emit = defineEmits<(e: 'edited' | 'deleted', feedback: Feedback) => void>();

const loading = ref<boolean>(false);
const { t } = useI18n();
const dialog = ref<boolean>(false);
const userId = ref<string | undefined>(auth().currentUser?.uid);
const selectedTitle = ref<string>(prop.feedback.title);
const selectedDescription = ref<string>(prop.feedback.description);
const selectedCategory = ref<string>(prop.feedback.category);
const selectedStatus = ref<string>(prop.feedback.status);

const formFeedback = ref<{
    resetValidation: () => void;
    validate: () => boolean;
}>();

const reset = (): void => {
    selectedCategory.value = prop.feedback.category;
    selectedDescription.value = prop.feedback.description;
    selectedStatus.value = prop.feedback.status;
    selectedTitle.value = prop.feedback.title;
};  

const editFeedback = async (docId: string): Promise<void> => {
    try {
        loading.value = true;
        await db.collection('feedbacks').doc(docId).set({
            category: selectedCategory.value,
            comments: 0,
            createdAt: timestamp,
            description: selectedDescription.value,
            docId,
            pinned: false,
            status: selectedStatus.value,
            title: selectedTitle.value,
            upvotes: 0,
            userId: userId.value
        });
    } catch(error: unknown) {
        console.log(error);
    } finally {
        emit('edited', prop.feedback);
        reset();
        dialog.value = false;
        loading.value = false;
    }
};

const close = (): void => {
    reset();
    dialog.value = false;
};

const deleteFeedback = (): void => {
    emit('deleted', prop.feedback);
    dialog.value = false;
};

const required = (value: string): string | true => Number(value) > 0 || t('validations.required'); 
const max250Characters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 
const max100Characters = (value: string): string | true => value.length <= 100 || t('validations.maxCharacters'); 

</script>