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
                                color="white"
                                class="bg-purple"
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
            <v-col>
                All of your user feedback in
                one single place
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col>
                Feedback boards
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