<template>
    <v-btn
        variant="flat"
        :color="dialogTriggerColor"
        :prepend-icon="dialogTriggerIcon"
        data-cy="open-feedback-dialog-btn"
        @click="open"
    >
        {{ dialogTriggerLabel }}
    </v-btn>

    <v-dialog
        v-model="dialog"
        :width="CONSTANTS.FEEDBACK_DIALOG_WIDTH"
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
            <v-form
                ref="form"
                validate-on="submit"
            >
                <div class="align-center d-flex pb-6">
                    <span class="font-weight-bold text-h5">
                        {{ dialogTitle }}
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
                        v-model="formData.title"
                        variant="plain"
                        :counter="CONSTANTS.TITLE_MAX_LENGTH"
                        single-line
                        density="comfortable"
                        :rules="[required, maxLength(CONSTANTS.TITLE_MAX_LENGTH)]"
                        hide-details="auto"
                        data-cy="feedback-title-input"
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
                        v-model="formData.category"
                        variant="plain"
                        :items="categories"
                        item-title="title"
                        item-value="value"
                        single-line
                        :list-props="{ 'class': 'pa-0' }"
                        data-cy="feedback-category-select"
                    >
                        <template #item="{ item, 'props': itemProps }">
                            <v-list-item
                                v-bind="itemProps"
                                class="border-b-sm option-item"
                            >
                                <template #append>
                                    <v-icon
                                        v-if="item.raw.value === formData.category"
                                        :icon="mdiCheck"
                                        color="purple"
                                        size="small"
                                    />
                                </template>
                            </v-list-item>
                        </template>
                    </v-select>
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
                            v-model="formData.status"
                            variant="plain"
                            :items="statuses"
                            item-title="title"
                            item-value="value"
                            single-line
                            :list-props="{ 'class': 'pa-0' }"
                            data-cy="feedback-status-select"
                        >
                            <template #item="{ item, 'props': itemProps }">
                                <v-list-item
                                    v-bind="itemProps"
                                    class="border-b-sm option-item"
                                >
                                    <template #append>
                                        <v-icon
                                            v-if="item.raw.value === formData.status"
                                            :icon="mdiCheck"
                                            color="purple"
                                            size="small"
                                        />
                                    </template>
                                </v-list-item>
                            </template>
                        </v-select>
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
                        v-model="formData.description"
                        variant="plain"
                        density="comfortable"
                        no-resize
                        rows="3"
                        :counter="CONSTANTS.TEXT_MAX_LENGTH"
                        clearable
                        :rules="[required, maxLength(CONSTANTS.TEXT_MAX_LENGTH)]"
                        hide-details="auto"
                        data-cy="feedback-description-textarea"
                    />
                </div>

                <v-card-actions class="pt-6 px-0">
                    <v-btn
                        variant="flat"
                        color="dark-blue"
                        data-cy="feedback-close-btn"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        v-if="isEditMode"
                        variant="flat"
                        color="error"
                        data-cy="feedback-delete-btn"
                        @click="handleDelete"
                    >
                        {{ t('buttons.delete') }}
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="purple"
                        data-cy="feedback-submit-btn"
                        @click="handleSubmit"
                    >
                        {{ submitLabel }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
/** @file FeedbackDialog component. */
import { ref, shallowRef, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiClose, mdiCheck, mdiPencil, mdiPlus } from '@mdi/js';
import type { VForm } from 'vuetify/components';
import { db, auth, timestamp } from '@/firebase/init';
import { type Feedback, type FeedbackForm, Status } from '@/types/index.ts';
import { CONSTANTS } from '@/constants/index';
import { handleError } from '@/plugins/error';

const props = defineProps<{
    feedback?: Feedback;
}>();

const emit = defineEmits<{
    deleted: [feedback: Feedback];
    edited: [feedback: Feedback];
    feedbackAdded: [];
}>();

const { t } = useI18n();

const categories = computed(() => [
    { title: t('components.Dialog.categories.feature'), value: 'Feature' },
    { title: t('components.Dialog.categories.bug'), value: 'Bug' },
    { title: t('components.Dialog.categories.enhancement'), value: 'Enhancement' },
    { title: 'UI', value: 'UI' },
    { title: 'UX', value: 'UX' },
    { title: t('components.Dialog.categories.all'), value: 'All' }
]);

const statuses = computed(() => [
    { title: t('views.roadmap.status.planned'), value: Status.Planned },
    { title: t('views.roadmap.status.live'), value: Status.Live },
    { title: t('views.roadmap.status.inProgress'), value: Status.InProgress }
]);
const isEditMode = computed(() => !!props.feedback);
const dialog = ref(false);
const loading = ref(false);
const dialogTriggerColor = computed<'blue' | 'purple'>(() => (isEditMode.value ? 'blue' : 'purple'));
const dialogTriggerIcon = computed<string>(() => (isEditMode.value ? mdiPencil : mdiPlus));
const dialogTriggerLabel = computed<string>(() => t(isEditMode.value ? 'buttons.edit' : 'buttons.add'));
const dialogTitle = computed<string>(() => (isEditMode.value ? `Editing "${props.feedback?.title}"` : t('components.Dialog.title')));
const submitLabel = computed<string>(() => t(isEditMode.value ? 'buttons.submit' : 'buttons.add'));

const createForm = (): FeedbackForm => ({
    category: props.feedback?.category ?? categories.value[0].value,
    description: props.feedback?.description ?? '',
    status: props.feedback?.status ?? Status.Planned,
    title: props.feedback?.title ?? ''
});

const form = shallowRef<InstanceType<typeof VForm>>();
const formData = ref<FeedbackForm>(createForm());

watch(() => props.feedback, () => {
    formData.value = createForm();
});

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    formData.value = createForm();
    form.value?.resetValidation();
    dialog.value = false;
};

const addFeedback = async (): Promise<void> => {
    try {
        loading.value = true;
        const docId = db.collection('feedbacks').doc().id;
        await db.collection('feedbacks').doc(docId).set({
            category: formData.value.category,
            comments: 0,
            createdAt: timestamp,
            description: formData.value.description,
            docId,
            pinned: false,
            status: Status.Planned,
            title: formData.value.title,
            upvotes: 0,
            userId: auth().currentUser?.uid
        });
        emit('feedbackAdded');
    } catch (error: unknown) {
        handleError(error);
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
            category: formData.value.category,
            description: formData.value.description,
            status: formData.value.status,
            title: formData.value.title
        });
        emit('edited', props.feedback);
    } catch (error: unknown) {
        handleError(error);
    } finally {
        close();
        loading.value = false;
    }
};

const handleSubmit = async (): Promise<void> => {
    const { valid } = await form.value!.validate();
    if (!valid) return;
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
:deep(.v-field--variant-plain) {
    background-color: rgb(var(--v-theme-background-secondary));
    border-radius: 8px;
}

:deep(.v-field--variant-plain .v-field__input) {
    padding-inline: 12px;
}

:deep(.v-input__details) {
    padding-inline: 12px;
}
</style>
