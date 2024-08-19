<template>
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
            <v-container fluid>
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
</template>

<script setup lang="ts">
/**
 * @file Footer component.
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

.background-purple {
    background-color: #f9f0fd;
    width: 100% !important;
}
</style>
