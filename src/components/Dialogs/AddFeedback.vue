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
        <v-form
            ref="formFeedback"
            v-model="isValidFeedback"
            validate-on="input"
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
                        variant="plain"
                        class="bg-background-secondary"
                        counter="45"
                        single-line
                        density="compact"
                        :rules="[required, max100Characters]"
                        hide-details="auto"
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
                        variant="plain"
                        class="bg-background-secondary"
                        :items="categories"
                        single-line
                        hide-details
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
                        :rules="[required, max250Characters]"
                    />
                </v-card-text>
                <v-card-actions class="pt-5 px-0">
                    <v-btn
                        variant="flat"
                        color="dark-blue"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-spacer />
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
import { db, auth, timestamp } from '@/firebase/init';
import { Status } from '@/models/Status';

const emit = defineEmits<(e: 'feedbackAdded') => void>();

const user = ref(auth().currentUser);
const loading = ref<boolean>(false);
const { t } = useI18n();
const dialog = ref<boolean>(false);
const title = ref('');
const description = ref('');
const categories = ref<Array<string>>(['Feature', 'Bug', 'Enhancement', 'UI', 'UX', 'All']);
const selectedCategory = ref<string>(categories.value[0]);
const isValidFeedback = ref<boolean>(false);

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    dialog.value = false;
    title.value = '';
    description.value = '';
};

const formFeedback = ref<{
    resetValidation: () => void;
    validate: () => boolean;
}>();

const addFeedback = async (): Promise<void> => {
    try {
        /* if (formFeedback.value !== undefined && !isValidFeedback.value) {
            formFeedback.value.validate();
            return;
        } */
        loading.value = true;
        const docId = db.collection('feedbacks').doc().id;
        await db.collection('feedbacks').doc(docId).set({
            category: selectedCategory.value,
            comments: 0,
            createdAt: timestamp,
            description: description.value,
            docId,
            pinned: false,
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
        loading.value = false;
    }
};

const max100Characters = (value: string): string | true => value.length <= 100 || t('validations.maxCharacters'); 
const required = (value: string): string | true => Number(value) > 0 || t('validations.required'); 
const max250Characters = (value: string): string | true => value.length <= 250 || t('validations.maxCharacters'); 
</script>