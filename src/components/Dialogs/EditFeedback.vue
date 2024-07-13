<template>
    <v-dialog 
        width="600"
        :transition="false"
        persistent
    >
        <template #activator="{ props }">
            <v-btn 
                v-bind="props"
                variant="flat"
                color="blue"
                :prepend-icon="mdiPlus"
            >
                {{ t('buttons.edit') }}
            </v-btn>
        </template>

        <template #default="{ isActive }">
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
                            v-model="status"
                            :label="t('components.Dialog.updateStatus')"
                            density="compact"
                            variant="outlined"
                            hide-details
                            class="bg-background-secondary"
                            :items="['Suggestion', 'Planned', 'Live', 'In-Progress']"
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
                            @click="isActive.value = false"
                        >
                            {{ t('buttons.close') }}
                        </v-btn>
                        <v-btn
                            variant="flat"
                            color="pruple"
                            @click="editFeedback"
                        >
                            {{ t('buttons.saveChanges') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </template>
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
import { Status } from '@/models/Status';
import type { Feedback } from '@/models/Feedback';

const prop = defineProps<{
    feedback: Feedback;
}>();

const { t } = useI18n();
const valid = ref(false);
const isActive = ref<boolean>(false);

const title = ref('');
const description = ref('');
const category = ref<string>();
const status = ref<string>();

const editFeedback = (): void => {
    projectFireStore.collection('feedbacks').add({
        category: category.value,
        color: 'orange',
        comments: 0,
        description: description.value,
        id: prop.feedback.id,
        status: Status.Planned,
        title: title.value,
        upvotes: 0
    }).catch((error) => {
        console.log(error); 
    });

    isActive.value = false;
};

const deleteFeedback = (): void => {
    const feedbackQuery = projectFireStore.collection('feedbacks')
        .where('uid', '==', prop.feedback.id);
    
    feedbackQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });
    isActive.value = false;
};

</script>