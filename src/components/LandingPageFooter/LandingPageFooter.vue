<template>
    <!-- CTA strip -->
    <v-row
        id="pricing"
        align="center"
        class="cta-strip px-10 py-10"
    >
        <v-col>
            <h2 class="font-weight-bold text-h5 text-white">
                {{ t('views.landingPage.footer.getStarted') }}
            </h2>
        </v-col>
        <v-col cols="auto">
            <v-btn
                variant="flat"
                color="white"
                size="x-large"
                class="text-purple"
            >
                {{ t('views.landingPage.buttons.startToday') }}
            </v-btn>
        </v-col>
    </v-row>

    <!-- Links section -->
    <v-row class="footer-bg py-10 section">
        <v-col
            cols="12"
            md="3"
            class="d-flex flex-column ga-3"
        >
            <span class="font-weight-bold text-dark-blue text-h6">Feedback</span>
            <div class="d-flex ga-3">
                <v-icon
                    :icon="mdiTwitter"
                    color="content"
                />
                <v-icon
                    :icon="mdiInstagram"
                    color="content"
                />
            </div>
        </v-col>

        <v-col
            cols="12"
            md="3"
        >
            <p class="font-weight-bold mb-3 text-dark-blue text-overline">
                {{ t('views.landingPage.footer.about') }}
            </p>
            <div class="d-flex flex-column">
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.home') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.blog') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.pricing') }}
                </v-btn>
            </div>
        </v-col>

        <v-col
            cols="12"
            md="3"
        >
            <p class="font-weight-bold mb-3 text-dark-blue text-overline">
                {{ t('views.landingPage.footer.product') }}
            </p>
            <div class="d-flex flex-column">
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.demo') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.caseStudies') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.features') }}
                </v-btn>
            </div>
        </v-col>

        <v-col
            cols="12"
            md="3"
        >
            <p class="font-weight-bold mb-3 text-dark-blue text-overline">
                {{ t('views.landingPage.footer.account') }}
            </p>
            <div class="d-flex flex-column">
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.login') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="content"
                    class="justify-start pl-0"
                >
                    {{ t('views.landingPage.footer.signUp') }}
                </v-btn>
            </div>
        </v-col>
    </v-row>

    <!-- Legal bar -->
    <v-row
        align="center"
        class="legal-bg py-4 section"
    >
        <v-col>
            <span class="text-caption text-content">{{ t('views.landingPage.footer.feedbackApp') }}</span>
        </v-col>
        <v-col
            cols="auto"
            class="align-center d-flex flex-wrap ga-1"
        >
            <v-btn
                variant="text"
                color="content"
                size="small"
            >
                {{ t('views.landingPage.footer.terms') }}
            </v-btn>
            <span class="text-content">·</span>
            <v-btn
                variant="text"
                color="content"
                size="small"
            >
                {{ t('views.landingPage.footer.gdpr') }}
            </v-btn>
            <span class="text-content">·</span>
            <v-btn
                variant="text"
                color="content"
                size="small"
            >
                {{ t('views.landingPage.footer.privacy') }}
            </v-btn>
            <span class="text-content">·</span>
            <v-btn
                variant="text"
                color="content"
                size="small"
            >
                {{ t('views.landingPage.footer.compare') }}
            </v-btn>
            <span class="text-content">·</span>
            <v-btn
                variant="text"
                color="content"
                size="small"
            >
                {{ t('views.landingPage.footer.solutions') }}
            </v-btn>
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
.section {
    width: 100vw;
}

.cta-strip {
    background: linear-gradient(135deg, #AD1FEA 0%, #4661E6 100%);
    width: 100vw;
}

.footer-bg {
    background-color: #f9f0fd;
}

.legal-bg {
    background-color: #f1e5fa;
}
</style>