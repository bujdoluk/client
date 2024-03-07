<template>
    <v-container fluid>
        <v-row
            class="grid"
        >
            <v-col>
                {{ t('views.landingPage.navbar.home') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.navbar.features') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.navbar.howItWorks') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.navbar.demo') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.navbar.pricing') }}
            </v-col>
            <v-spacer />
            <v-col>
                <v-icon :icon="mdiTwitter" />
            </v-col>
            <v-col>
                <v-icon :icon="mdiInstagram" />
            </v-col>
            <v-col>
                <v-btn
                    variant="tonal"
                    flat
                    color="white"
                    class="bg-purple"
                    size="large"
                >
                    {{ t('views.landingPage.buttons.freeTrial') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            class="grid"
            align="center"
        >
            <v-col>
                planned
            </v-col>
            <v-col
                cols="12"
                md="6"
                class="text-center"
            >
                <v-container>
                    <v-row>
                        <v-col class="font-weight-bold text-h2">
                            {{ t('views.landingPage.headline.title') }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            {{ t('views.landingPage.headline.subtitle') }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn
                                variant="tonal"
                                flat
                                color="white"
                                class="bg-purple"
                                size="x-large"
                                block
                            >
                                {{ t('views.landingPage.buttons.14dayFreeTrial') }}
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn
                                variant="outlined"
                                flat
                                color="purple"
                                size="x-large"
                                block
                            >
                                {{ t('views.landingPage.buttons.demo') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            {{ t('views.landingPage.headline.noCreditCardRequired') }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col>
                live
            </v-col>
        </v-row>
        <v-row
            class="grid"
            align="center"
        >
            <v-col
                cols="12"
                md="6"
                class="mx-auto text-center"
            >
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col class="font-weight-bold text-h4">
                                {{ t('views.landingPage.trustedBy') }}
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col>
                                <template #default>
                                    <img
                                        width="100"
                                        src="../assets/Amazon_logo.svg.png"
                                        alt="Amazon Logo"
                                    >
                                </template>
                            </v-col>
                            <v-col>
                                <template #default>
                                    <img
                                        width="50"
                                        height="50"
                                        src="../assets/Facebook_icon.svg.png"
                                        alt="Facebook Logo"
                                    >
                                </template>
                            </v-col>
                            <v-col>
                                <template #default>
                                    <img
                                        width="100"
                                        src="../assets/640px-Gayglers_2013_logo.svg.png"
                                        alt="Google Logo"
                                    >
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
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
        <v-row
            class="grid"
            align="center"
        >
            <v-col
                cols="12"
                md="6"
                class="mx-auto text-center"
            >
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col class="font-weight-bold text-h4">
                                {{ t('views.landingPage.integrate') }}
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col>
                                <template #default>
                                    <img
                                        width="100"
                                        src="../assets/Amazon_logo.svg.png"
                                        alt="Amazon Logo"
                                    >
                                </template>
                            </v-col>
                            <v-col>
                                <template #default>
                                    <img
                                        width="50"
                                        height="50"
                                        src="../assets/Facebook_icon.svg.png"
                                        alt="Facebook Logo"
                                    >
                                </template>
                            </v-col>
                            <v-col>
                                <template #default>
                                    <img
                                        width="100"
                                        src="../assets/640px-Gayglers_2013_logo.svg.png"
                                        alt="Google Logo"
                                    >
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            class="grid"
            align="center"
        >
            <v-col
                cols="12"
                md="6"
                class="font-weight-bold mx-auto text-center text-h4"
            >
                {{ t('views.landingPage.features') }}
            </v-col>
        </v-row>
        <v-row
            class="grid"
            align="center"
        >
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card1.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card1.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card2.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card2.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card3.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card3.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card4.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card4.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            class="grid"
            align="center"
        >
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card5.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card5.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card6.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card6.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card7.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card7.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="text-center">
                <v-card height="300">
                    <v-card-text class="font-weight-bold">
                        {{ t('views.landingPage.card8.title') }}
                    </v-card-text>
                    <v-card-text>
                        {{ t('views.landingPage.card8.subtitle') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            class="grid text-center"
            align="center"
        >
            <v-col
                cols="12"
                md="6"
                class="font-weight-bold mx-auto text-h4"
            >
                {{ t('views.landingPage.blog') }}
            </v-col>
        </v-row>
        <v-row
            class="grid text-center"
            align="center"
        >
            <v-col>
                {{ t('views.landingPage.blog') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.blog') }}
            </v-col>
            <v-col>
                {{ t('views.landingPage.blog') }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    variant="outlined"
                    color="purple"
                >
                    {{ t('views.landingPage.buttons.readMore') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Landing Page View.
 */
import { useI18n } from 'vue-i18n';
import { mdiTwitter, mdiInstagram } from '@mdi/js';

const { t } = useI18n();

</script>

<style scoped>
.grid {
    display: flex;
    margin: 0 auto;
    width: 70% !important;
}
</style>