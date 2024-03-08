<template>
    <v-container
        fluid
        class="container"
    >
        <v-row class="grid">
            <v-col>
                <v-btn>
                    {{ t('views.landingPage.navbar.home') }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn>
                    {{ t('views.landingPage.navbar.features') }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn>
                    {{ t('views.landingPage.navbar.howItWorks') }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn>
                    {{ t('views.landingPage.navbar.demo') }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn>
                    {{ t('views.landingPage.navbar.pricing') }}
                </v-btn>
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
                <v-card>
                    <v-card-text>
                        IMAGE
                    </v-card-text>
                    <v-card-text>
                        Impact of Dynamic Pricing on Customer Behavior and Loyalty
                    </v-card-text>
                    <v-card-text>
                        Feb 9, 2024
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-text>
                        IMAGE
                    </v-card-text>
                    <v-card-text>
                        4 Tips for Effective B2B Link Building
                    </v-card-text>
                    <v-card-text>
                        Jan 15, 2024
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-text>
                        IMAGE
                    </v-card-text>
                    <v-card-text>
                        Scaling Your Remote SaaS Business: 6 Tactics for Growth
                    </v-card-text>
                    <v-card-text>
                        Nov 8, 2023
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            class="grid text-center"
            align="center"
        >
            <v-col>
                <v-btn
                    variant="outlined"
                    flat
                    color="purple"
                    size="x-large"
                >
                    {{ t('views.landingPage.buttons.readMore') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            class="d-flex flex-column grid text-center"
            align="center"
        >
            <v-col class="font-weight-bold text-h4">
                Ready to start building the right things?
            </v-col>
            <v-col>
                Turn user feedback into actionable product optimizations!
            </v-col>
            <v-col>
                <v-btn
                    variant="tonal"
                    flat
                    color="white"
                    class="bg-purple"
                    size="x-large"
                >
                    {{ t('views.landingPage.buttons.14dayFreeTrial') }}
                </v-btn>
            </v-col>
            <v-col>
                {{ t('views.landingPage.headline.noCreditCardRequired') }}
            </v-col>
        </v-row>
        <v-row
            class="background-purple grid py-10 text-center"
            align="center"
        >
            <v-col
                cols="8"
                class="font-weight-bold text-h4"
            >
                {{ t('views.landingPage.footer.getStarted') }}
            </v-col>
            <v-col class="py-0">
                <v-btn
                    variant="tonal"
                    flat
                    color="white"
                    class="bg-purple"
                    size="x-large"
                >
                    {{ t('views.landingPage.buttons.startToday') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            class="background-purple grid mt-0 text-center"
            align="center"
        >
            <v-col>
                IMAGE
            </v-col>
            <v-col cols="6">
                <v-container>
                    <v-row>
                        <v-col
                            cols="4"
                            class="font-weight-bold" 
                        >
                            {{ t('views.landingPage.footer.about') }}
                        </v-col>
                        <v-col
                            cols="4"
                            class="font-weight-bold"
                        >
                            {{ t('views.landingPage.footer.product') }}
                        </v-col>
                        <v-col
                            cols="4"
                            class="font-weight-bold"
                        >
                            {{ t('views.landingPage.footer.account') }}
                        </v-col>
                    </v-row>
                    <v-spacer />
                    <v-row>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.home') }}
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.demo') }}
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.login') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-spacer />
                    <v-row>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.blog') }}
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.caseStudies') }}
                            </v-btn>
                        </v-col>
                        <v-col
                            cols="4"
                        >
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.singUp') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-spacer />
                    <v-row>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.pricing') }}
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                class="text-decoration-underline"
                                color="purple"
                                variant="text"
                            >
                                {{ t('views.landingPage.footer.features') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col>
                <v-icon
                    :icon="mdiTwitter"
                    class="mr-2"
                />
                <v-icon :icon="mdiInstagram" />
            </v-col>
        </v-row>
        <v-row
            class="background-purple d-flex flex-column grid mt-0 text-center"
            align="center"
        >
            <v-col>
                <v-btn
                    class="text-decoration-underline"
                    color="purple"
                    variant="text"
                >
                    {{ t('views.landingPage.footer.terms') }}
                </v-btn>
                <span>&#x2022;</span> 
                <v-btn
                    class="text-decoration-underline"
                    color="purple"
                    variant="text"
                >
                    {{ t('views.landingPage.footer.gdpr') }}
                </v-btn>
                <span>&#x2022;</span>
                <v-btn
                    class="text-decoration-underline"
                    color="purple"
                    variant="text"
                >
                    {{ t('views.landingPage.footer.privacy') }}
                </v-btn>
                <span>&#x2022;</span>
                <v-btn
                    class="text-decoration-underline"
                    color="purple"
                    variant="text"
                >
                    {{ t('views.landingPage.footer.compare') }}
                </v-btn>
                <span>&#x2022;</span>
                <v-btn
                    class="text-decoration-underline"
                    color="purple"
                    variant="text"
                >
                    {{ t('views.landingPage.footer.solutions') }}
                </v-btn>
            </v-col>
            <v-col>
                {{ t('views.landingPage.footer.feedbackApp') }}
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
    width: 70%;
}

.container {
    padding: 0 !important;
}

.background-purple {
    background-color: #f9f0fd;
    width: 100% !important;
}
</style>