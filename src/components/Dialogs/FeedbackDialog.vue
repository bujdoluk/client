<template>
    <v-btn
        variant="flat"
        :color="isEditMode ? 'blue' : 'purple'"
        :prepend-icon="isEditMode ? mdiPencil : mdiPlus"
        @click="open"
    >
        {{ t(isEditMode ? 'buttons.edit' : 'buttons.add') }}
    </v-btn>

    <v-dialog
        v-model="dialog"
        :width="CONSTANTS.FEEDBACK_DIALOG_WIDTH"
        persistent
    >
        <v-skeleton-loader
            v-if="loading"
            boilerplate
            type="heading, paragraph, actions"
        />
        <v-card
            v-else
            class="pa-6"
        >
            <v-form validate-on="input">
                <div class="align-center d-flex pb-6">
                    <span class="font-weight-bold text-h5">
                        {{ isEditMode ? `Editing "${props.feedback?.title}"` : t('components.Dialog.title') }}
                    </span>
                    <v-spacer />
                    <v-btn
                        :icon="mdiClose"
                        density="compact"
                        variant="text"
                        @click="close"
                    />
                </div>

                <div class="mb-5">
                    <p class="font-weight-bold mb-1 text-body-2">
                        {{ t('components.Dialog.feedbackTitle') }}
                    </p>
                    <p class="mb-2 text-caption text-disabled">
                        {{ t('components.Dialog.feedbackSubtitle') }}
                    </p>
                    <v-text-field
                        v-model="form.title"
                        variant="plain"
                        class="bg-background-secondary rounded-lg"
                        :counter="CONSTANTS.TITLE_MAX_LENGTH"
                        single-line
                        density="comfortable"
                        :rules="[required, maxLength(CONSTANTS.TITLE_MAX_LENGTH)]"
                        hide-details="auto"
                    />
                </div>

                <div class="mb-5">
                    <p class="font-weight-bold mb-1 text-body-2">
                        {{ t('components.Dialog.category') }}
                    </p>
                    <p class="mb-2 text-caption text-disabled">
                        {{ t('components.Dialog.categorySubtitle') }}
                    </p>
                    <v-select
                        v-model="form.category"
                        variant="plain"
                        class="bg-background-secondary rounded-lg"
                        :items="CATEGORIES"
                        single-line
                        hide-details
                    />
                </div>

                <template v-if="isEditMode">
                    <div class="mb-5">
                        <p class="font-weight-bold mb-1 text-body-2">
                            {{ t('components.Dialog.updateStatus') }}
                        </p>
                        <p class="mb-2 text-caption text-disabled">
                            {{ t('components.Dialog.updateStatusSubtitle') }}
                        </p>
                        <v-select
                            v-model="form.status"
                            variant="plain"
                            class="bg-background-secondary rounded-lg"
                            :items="STATUSES"
                            single-line
                            hide-details
                        />
                    </div>
                </template>

                <div>
                    <p class="font-weight-bold mb-1 text-body-2">
                        {{ t('components.Dialog.feedbackDetail') }}
                    </p>
                    <p class="mb-2 text-caption text-disabled">
                        {{ t('components.Dialog.feedbackDetailSubtitle') }}
                    </p>
                    <v-textarea
                        v-model="form.description"
                        variant="plain"
                        density="comfortable"
                        no-resize
                        rows="3"
                        class="bg-background-secondary rounded-lg"
                        :counter="CONSTANTS.TEXT_MAX_LENGTH"
                        clearable
                        :rules="[required, maxLength(CONSTANTS.TEXT_MAX_LENGTH)]"
                        hide-details="auto"
                    />
                </div>

                <v-card-actions class="pt-6 px-0">
                    <v-btn
                        variant="flat"
                        color="dark-blue"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        v-if="isEditMode"
                        variant="flat"
                        color="error"
                        @click="handleDelete"
                    >
                        {{ t('buttons.delete') }}
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="purple"
                        @click="handleSubmit"
                    >
                        {{ t(isEditMode ? 'buttons.submit' : 'buttons.add') }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
/** @file FeedbackDialog component. */
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiClose, mdiPencil, mdiPlus } from '@mdi/js';
import { db, auth, timestamp } from '@/firebase/init';
import { type Feedback, type FeedbackForm, Status } from '@/types/index.ts';
import { CONSTANTS } from '@/constants/index';

const props = defineProps<{
    feedback?: Feedback;
}>();

const emit = defineEmits<{
    deleted: [feedback: Feedback];
    edited: [feedback: Feedback];
    feedbackAdded: [];
}>();

const CATEGORIES = ['Feature', 'Bug', 'Enhancement', 'UI', 'UX', 'All'];
const STATUSES = [Status.Planned, Status.Live, Status.InProgress];

const { t } = useI18n();
const isEditMode = computed(() => !!props.feedback);
const dialog = ref(false);
const loading = ref(false);

const createForm = (): FeedbackForm => ({
    category: props.feedback?.category ?? CATEGORIES[0],
    description: props.feedback?.description ?? '',
    status: props.feedback?.status ?? Status.Planned,
    title: props.feedback?.title ?? ''
});

const form = ref<FeedbackForm>(createForm());

watch(() => props.feedback, () => {
    form.value = createForm();
});

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    form.value = createForm();
    dialog.value = false;
};

const addFeedback = async (): Promise<void> => {
    try {
        loading.value = true;
        const docId = db.collection('feedbacks').doc().id;
        await db.collection('feedbacks').doc(docId).set({
            category: form.value.category,
            comments: 0,
            createdAt: timestamp,
            description: form.value.description,
            docId,
            pinned: false,
            status: Status.Planned,
            title: form.value.title,
            upvotes: 0,
            userId: auth().currentUser?.uid
        });
        emit('feedbackAdded');
    } catch (error: unknown) {
        console.error(error);
    } finally {
        close();
        loading.value = false;
    }
};

const editFeedback = async (): Promise<void> => {
    if (!props.feedback) return;
    try {
        loading.value = true;
        await db.collection('feedbacks').doc(props.feedback.docId).update({
            category: form.value.category,
            description: form.value.description,
            status: form.value.status,
            title: form.value.title
        });
        emit('edited', props.feedback);
    } catch (error: unknown) {
        console.error(error);
    } finally {
        close();
        loading.value = false;
    }
};

const handleSubmit = async (): Promise<void> => {
    if (isEditMode.value) {
        await editFeedback();
    } else {
        await addFeedback();
    }
};

const handleDelete = (): void => {
    if (!props.feedback) return;
    emit('deleted', props.feedback);
    dialog.value = false;
};

const required = (value: string): string | true => !!value.trim() || t('validations.required');
const maxLength = (limit: number) => (value: string): string | true => value.length <= limit || t('validations.maxCharacters');
</script>

<style scoped>
:deep(.v-field--variant-plain .v-field__input) {
    padding-inline: 12px;
}

:deep(.v-input__details) {
    padding-inline: 12px;
}
</style>
