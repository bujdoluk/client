<template>
    <v-dialog 
        width="600"
        :transition="false"
        persistent
    >
        <template #activator="{ props }">
            <v-btn 
                v-bind="props"
                class="bg-purple"
                :prepend-icon="mdiPlus"
            >
                {{ t('buttons.addFeedback') }}
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
                            :rules="[v => !!v || 'Name is required']"
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
                        {{ t('components.Dialog.feedbackDetail') }}
                    </v-card-text>
                    <v-card-text class="text-caption text-disabled">
                        {{ t('components.Dialog.feedbackDetailSubtitle') }}
                    </v-card-text>
                    <v-card-text class="py-5">
                        <v-textarea 
                            v-model="detail"
                            variant="plain"
                            density="compact"
                            no-resize
                            rows="3"
                            class="bg-background-secondary"
                            :counter="250"
                        />
                    </v-card-text>

                    <v-card-actions class="pt-5">
                        <v-spacer />
                        <v-btn
                            class="bg-darkBlue"
                            @click="isActive.value = false"
                        >
                            {{ t('buttons.closeDialog') }}
                        </v-btn>
                        <v-btn
                            class="bg-purple"
                            @click="isActive.value = false"
                        >
                            {{ t('buttons.addFeedback') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Add Feedback Dialog.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiPlus } from '@mdi/js';

const { t } = useI18n();

const valid = ref(false);
const title = ref('');
const detail = ref('');

</script>