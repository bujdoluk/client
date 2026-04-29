<template>
    <!-- Hero -->
    <v-row
        id="home"
        align="center"
        class="section"
    >
        <v-col cols="auto">
            <v-chip
                color="warning"
                variant="tonal"
                label
            >
                Planned
            </v-chip>
        </v-col>
        <v-col>
            <v-row class="d-flex flex-column text-center">
                <v-col>
                    <h1 class="font-weight-bold text-dark-blue text-h3">
                        {{ t('views.landingPage.headline.title') }}
                    </h1>
                </v-col>
                <v-col>
                    <p class="text-body-1 text-content">
                        {{ t('views.landingPage.headline.subtitle') }}
                    </p>
                </v-col>
                <v-col class="d-flex ga-4 justify-center">
                    <v-btn
                        variant="flat"
                        color="purple"
                        size="x-large"
                    >
                        {{ t('views.landingPage.buttons.14dayFreeTrial') }}
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        color="purple"
                        size="x-large"
                    >
                        {{ t('views.landingPage.buttons.demo') }}
                    </v-btn>
                </v-col>
                <v-col>
                    <p class="text-caption text-content">
                        {{ t('views.landingPage.headline.noCreditCardRequired') }}
                    </p>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="auto">
            <v-chip
                color="teal"
                variant="tonal"
                label
            >
                Live
            </v-chip>
        </v-col>
    </v-row>

    <!-- Trusted By -->
    <v-row
        justify="center"
        class="section"
    >
        <v-col
            cols="12"
            md="7"
        >
            <v-card>
                <v-container fluid>
                    <v-row justify="center">
                        <v-col
                            cols="12"
                            class="font-weight-bold pb-0 text-center text-h5"
                        >
                            {{ t('views.landingPage.trustedBy') }}
                        </v-col>
                    </v-row>
                    <v-row
                        align="center"
                        justify="center"
                        class="pt-4"
                    >
                        <v-col cols="auto">
                            <img
                                width="100"
                                src="../../assets/Amazon_logo.svg.png"
                                alt="Amazon Logo"
                                class="logo"
                            >
                        </v-col>
                        <v-col cols="auto">
                            <img
                                width="44"
                                height="44"
                                src="../../assets/Facebook_icon.svg.png"
                                alt="Facebook Logo"
                                class="logo"
                            >
                        </v-col>
                        <v-col cols="auto">
                            <img
                                width="100"
                                src="../../assets/640px-Gayglers_2013_logo.svg.png"
                                alt="Google Logo"
                                class="logo"
                            >
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Headline component.
 * @description Hero section of the landing page with the main headline and CTA buttons.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.section {
    width: 70%;
    margin: 0 auto;
    padding: 60px 0;
}

.logo {
    opacity: 0.55;
    filter: grayscale(100%);
    transition: opacity 0.2s, filter 0.2s;
}

.logo:hover {
    opacity: 1;
    filter: grayscale(0%);
}
</style>