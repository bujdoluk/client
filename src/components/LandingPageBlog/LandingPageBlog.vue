<template>
    <v-row
        id="demo"
        justify="center"
        class="section"
    >
        <v-col
            cols="12"
            class="text-center"
        >
            <p class="text-overline text-purple">
                {{ t('views.landingPage.blog') }}
            </p>
            <h2 class="font-weight-bold text-dark-blue text-h4">
                Latest from our team
            </h2>
        </v-col>
    </v-row>

    <v-row class="section">
        <v-col
            v-for="post in posts"
            :key="post.title"
            cols="12"
            md="4"
        >
            <v-card height="100%">
                <v-sheet
                    height="160"
                    color="purple-light"
                    class="align-center d-flex justify-center"
                >
                    <v-icon
                        :icon="post.icon"
                        size="40"
                        color="purple"
                    />
                </v-sheet>
                <v-card-text class="pt-4 text-content text-overline">
                    {{ post.date }}
                </v-card-text>
                <v-card-title class="font-weight-bold text-body-1 text-dark-blue">
                    {{ post.title }}
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>

    <v-row
        justify="center"
        class="pb-6 section"
    >
        <v-col cols="auto">
            <v-btn
                variant="outlined"
                color="purple"
                size="large"
            >
                {{ t('views.landingPage.buttons.readMore') }}
            </v-btn>
        </v-col>
    </v-row>

    <!-- Bottom CTA -->
    <v-row
        justify="center"
        class="section"
    >
        <v-col
            cols="12"
            md="10"
        >
            <v-card class="cta-banner pa-10 text-center">
                <v-card-title class="font-weight-bold pb-3 text-h4 text-white">
                    Ready to start building the right things?
                </v-card-title>
                <v-card-text class="pb-6 text-white">
                    Turn user feedback into actionable product optimizations!
                </v-card-text>
                <v-btn
                    variant="flat"
                    color="white"
                    size="x-large"
                    class="mb-4 text-purple"
                >
                    {{ t('views.landingPage.buttons.14dayFreeTrial') }}
                </v-btn>
                <v-card-text
                    class="text-caption"
                    style="color: rgba(255,255,255,0.6)"
                >
                    {{ t('views.landingPage.headline.noCreditCardRequired') }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Blog component.
 */
import { useI18n } from 'vue-i18n';
import { mdiChartLineVariant, mdiLinkVariant, mdiRocketLaunchOutline } from '@mdi/js';

const { t } = useI18n();

const posts = [
    { date: 'Feb 9, 2024', icon: mdiChartLineVariant, title: 'Impact of Dynamic Pricing on Customer Behavior and Loyalty' },
    { date: 'Jan 15, 2024', icon: mdiLinkVariant, title: '4 Tips for Effective B2B Link Building' },
    { date: 'Nov 8, 2023', icon: mdiRocketLaunchOutline, title: 'Scaling Your Remote SaaS Business: 6 Tactics for Growth' }
];
</script>

<style scoped>
.section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}

.cta-banner {
    background: linear-gradient(135deg, #AD1FEA 0%, #4661E6 100%) !important;
}
</style>