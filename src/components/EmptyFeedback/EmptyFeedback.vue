<template>
    <v-card height="70vh">
        <v-container
            fluid
            class="text-center"
        >
            <v-row class="d-flex flex-column">
                <v-col>
                    <img
                        src="../../../src/assets/magnifier.jpg"
                        height="300"
                    >
                </v-col>
                <v-col class="font-text-bold text-dark-blue text-h4">
                    {{ t('views.suggestions.emptyFeedback.title') }}
                </v-col>
                <v-col class="text-content">
                    {{ t('views.suggestions.emptyFeedback.subtitle') }}
                </v-col>
                <v-col>
                    <AddFeedback @feedback-added="onFeedbackAdded" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file Empty Feedback component.
 */
import { useI18n } from 'vue-i18n';

const emit = defineEmits<(e: 'added') => void>();

const { t } = useI18n();

const onFeedbackAdded = (): void => {
    emit('added');
};
</script>