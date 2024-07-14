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
                        :items="['Planned', 'Live', 'In-Progress']"
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
                        color="bg-red"
                        @click="deleteFeedback"
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
                        v-if="prop.feedback?.id"
                        variant="flat"
                        color="purple"
                        @click="editFeedback(prop.feedback.id)"
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
import { projectFireStore } from '@/firebase/init';
import type { Feedback } from '@/models/Feedback';
import { Status } from '@/models/Status';

const prop = defineProps<{
    feedback?: Feedback;
}>();

const emit = defineEmits<(e: 'feedbackEdited') => void>();

const { t } = useI18n();
const valid = ref(false);
const dialog = ref<boolean>(false);

const selectedTitle = ref<string | undefined>(prop.feedback?.title);
const selectedDescription = ref<string | undefined>(prop.feedback?.description);
const selectedCategory = ref<string | undefined>(prop.feedback?.category);
const selectedStatus = ref<string | undefined>(prop.feedback?.status);

const reset = (): void => {
    selectedCategory.value = '';
    selectedDescription.value = '';
    selectedStatus.value = Status.Planned;
    selectedCategory.value = '';
};  

const editFeedback = async (id: string): Promise<void> => {
    try {
        if (prop.feedback?.id) {
            const res = projectFireStore.collection('feedbacks').doc(id);
            await res.update({
                category: selectedCategory.value,
                color: prop.feedback.color,
                comments: prop.feedback.comments,
                description: selectedDescription.value,
                id: prop.feedback.id,
                status: selectedStatus.value,
                title: selectedTitle.value,
                upvotes: prop.feedback.upvotes
            });
        }
        reset();
    } catch(error) {
        console.log(error);
    } finally {
        emit('feedbackEdited');
        dialog.value = false;
    }
};

const close = (): void => {
    reset();
    dialog.value = false;
};

const deleteFeedback = (): void => {
    const feedbackQuery = projectFireStore.collection('feedbacks')
        .where('uid', '==', prop.feedback?.id);
    
    feedbackQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });

    dialog.value = false;
};

</script>