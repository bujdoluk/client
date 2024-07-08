<template>   
    <v-col>
        <v-card>
            <v-container
                fluid
                class="align-center d-flex flex-column height"
            >
                <v-row align="end">
                    <v-col class="text-h5">
                        {{ t('views.suggestions.emptyFeedback.title') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-caption">
                        {{ t('views.suggestions.emptyFeedback.subtitle') }}
                    </v-col>
                </v-row>
                <v-row align="start">
                    <v-col>
                        <v-btn 
                            variant="flat"
                            color="purple"
                            :prepend-icon="mdiPlus"
                        >
                            {{ t('buttons.add') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
/**
 * @file Empty Feedback component.
 */
import { useI18n } from 'vue-i18n';
import { mdiPlus } from '@mdi/js';

const { t } = useI18n();

</script>