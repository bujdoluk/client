<template>
    <v-row class="grid">
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-center text-h4"
        >
            {{ t('views.landingPage.allFeedback') }}
        </v-col>
    </v-row>
    <v-row class="d-flex flex-column grid text-center">
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-center text-h4"
        >
            {{ t('views.landingPage.feedbackBoards.title') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.feedbackBoards.give') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.feedbackBoards.allInOne') }}
        </v-col>
    </v-row>
    <v-row class="d-flex flex-column grid text-center">
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-center text-h4"
        >
            {{ t('views.landingPage.roadmap.title') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.roadmap.share') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.roadmap.comunicate') }}
        </v-col>
    </v-row>
    <v-row class="d-flex flex-column grid text-center">
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-center text-h4"
        >
            {{ t('views.landingPage.changelog.title') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.changelog.comunicate') }}
        </v-col>
        <v-col>
            {{ t('views.landingPage.changelog.share') }}
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Overview component.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
