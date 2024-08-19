<template>
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
            <v-container fluid>
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
                <v-container fluid>
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
                                    src="../../assets/Amazon_logo.svg.png"
                                    alt="Amazon Logo"
                                >
                            </template>
                        </v-col>
                        <v-col>
                            <template #default>
                                <img
                                    width="50"
                                    height="50"
                                    src="../../assets/Facebook_icon.svg.png"
                                    alt="Facebook Logo"
                                >
                            </template>
                        </v-col>
                        <v-col>
                            <template #default>
                                <img
                                    width="100"
                                    src="../../assets/640px-Gayglers_2013_logo.svg.png"
                                    alt="Google Logo"
                                >
                            </template>
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
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style scoped>
.grid {
    display: flex;
    margin: 0 auto;
    width: 70%;
}
</style>

