<template>
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
                            {{ t('views.landingPage.integrate') }}
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
                                :alt="t('views.landingPage.logos.amazon')"
                                class="logo"
                            >
                        </v-col>
                        <v-col cols="auto">
                            <img
                                width="44"
                                height="44"
                                src="../../assets/Facebook_icon.svg.png"
                                :alt="t('views.landingPage.logos.facebook')"
                                class="logo"
                            >
                        </v-col>
                        <v-col cols="auto">
                            <img
                                width="100"
                                src="../../assets/640px-Gayglers_2013_logo.svg.png"
                                :alt="t('views.landingPage.logos.google')"
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
 * @file Integrations / Trusted By component.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}

.logo {
    opacity: 0.5;
    filter: grayscale(100%);
    transition: opacity 0.2s, filter 0.2s;
}

.logo:hover {
    opacity: 1;
    filter: grayscale(0%);
}
</style>