<template>
    <v-row
        id="features"
        justify="center"
        class="section"
    >
        <v-col
            cols="12"
            class="text-center"
        >
            <p class="text-overline text-purple">
                {{ t('views.landingPage.features') }}
            </p>
            <h2 class="font-weight-bold text-dark-blue text-h4">
                Everything you need to build better products
            </h2>
        </v-col>
    </v-row>

    <v-row class="section">
        <v-col
            v-for="card in featureCards"
            :key="card.titleKey"
            cols="12"
            sm="6"
            md="3"
        >
            <v-card
                height="100%"
                class="pa-2"
            >
                <v-card-item>
                    <v-avatar
                        :color="card.bg"
                        size="44"
                        class="mb-3"
                    >
                        <v-icon
                            :icon="card.icon"
                            :color="card.color"
                            size="20"
                        />
                    </v-avatar>
                    <v-card-title class="font-weight-bold px-0 text-body-1 text-dark-blue">
                        {{ t(card.titleKey) }}
                    </v-card-title>
                </v-card-item>
                <v-card-text class="text-body-2 text-content">
                    {{ t(card.subtitleKey) }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Product features component.
 */
import { useI18n } from 'vue-i18n';
import {
    mdiLockOutline,
    mdiMapOutline,
    mdiThumbUpOutline,
    mdiDomainPlus,
    mdiAccountKeyOutline,
    mdiShieldCheckOutline,
    mdiTagOutline,
    mdiAccountPlusOutline
} from '@mdi/js';

const { t } = useI18n();

const featureCards = [
    { bg: 'purple-light', color: 'purple', icon: mdiLockOutline, subtitleKey: 'views.landingPage.card1.subtitle', titleKey: 'views.landingPage.card1.title' },
    { bg: 'background-secondary', color: 'blue', icon: mdiMapOutline, subtitleKey: 'views.landingPage.card2.subtitle', titleKey: 'views.landingPage.card2.title' },
    { bg: 'background-secondary', color: 'warning', icon: mdiThumbUpOutline, subtitleKey: 'views.landingPage.card3.subtitle', titleKey: 'views.landingPage.card3.title' },
    { bg: 'background-secondary', color: 'success', icon: mdiDomainPlus, subtitleKey: 'views.landingPage.card4.subtitle', titleKey: 'views.landingPage.card4.title' },
    { bg: 'background-secondary', color: 'info', icon: mdiAccountKeyOutline, subtitleKey: 'views.landingPage.card5.subtitle', titleKey: 'views.landingPage.card5.title' },
    { bg: 'purple-light', color: 'purple', icon: mdiShieldCheckOutline, subtitleKey: 'views.landingPage.card6.subtitle', titleKey: 'views.landingPage.card6.title' },
    { bg: 'background-secondary', color: 'blue', icon: mdiTagOutline, subtitleKey: 'views.landingPage.card7.subtitle', titleKey: 'views.landingPage.card7.title' },
    { bg: 'background-secondary', color: 'warning', icon: mdiAccountPlusOutline, subtitleKey: 'views.landingPage.card8.subtitle', titleKey: 'views.landingPage.card8.title' }
];
</script>

<style scoped>
.section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}
</style>