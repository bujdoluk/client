<template>
    <v-row
        id="how-it-works"
        justify="center"
        class="section"
    >
        <v-col
            cols="12"
            class="pb-2 text-center"
        >
            <p class="text-overline text-purple">
                {{ t('views.landingPage.allFeedback') }}
            </p>
        </v-col>
    </v-row>

    <v-row class="section">
        <v-col
            v-for="item in overviewItems"
            :key="item.titleKey"
            cols="12"
            md="4"
        >
            <v-card
                height="100%"
                class="pa-4"
            >
                <v-card-item>
                    <v-avatar
                        :color="item.bg"
                        size="48"
                        class="mb-4"
                    >
                        <v-icon
                            :icon="item.icon"
                            :color="item.color"
                        />
                    </v-avatar>
                    <v-card-title class="font-weight-bold px-0 text-dark-blue">
                        {{ t(item.titleKey) }}
                    </v-card-title>
                </v-card-item>
                <v-card-text class="text-content">
                    {{ t(item.desc1Key) }}
                </v-card-text>
                <v-card-text class="text-content">
                    {{ t(item.desc2Key) }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Overview component.
 * @description Landing page section showcasing feedback boards and roadmap overview.
 */
import { useI18n } from 'vue-i18n';
import { mdiMessageTextOutline, mdiMapOutline, mdiNewspaperVariantOutline } from '@mdi/js';

const { t } = useI18n();

const overviewItems = [
    {
        bg: 'purple-light',
        color: 'purple',
        desc1Key: 'views.landingPage.feedbackBoards.give',
        desc2Key: 'views.landingPage.feedbackBoards.allInOne',
        icon: mdiMessageTextOutline,
        titleKey: 'views.landingPage.feedbackBoards.title'
    },
    {
        bg: 'background-secondary',
        color: 'blue',
        desc1Key: 'views.landingPage.roadmap.share',
        desc2Key: 'views.landingPage.roadmap.comunicate',
        icon: mdiMapOutline,
        titleKey: 'views.landingPage.roadmap.title'
    },
    {
        bg: 'background-secondary',
        color: 'warning',
        desc1Key: 'views.landingPage.changelog.comunicate',
        desc2Key: 'views.landingPage.changelog.share',
        icon: mdiNewspaperVariantOutline,
        titleKey: 'views.landingPage.changelog.title'
    }
];
</script>

<style scoped>
.section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}
</style>