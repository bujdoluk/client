<template>
    <v-container
        fluid
        class="pa-0"
    >
        <!-- Navbar -->
        <v-row
            align="center"
            class="navbar"
        >
            <v-col cols="auto">
                <v-btn
                    variant="text"
                    color="dark-blue"
                    @click="scrollTo('home')"
                >
                    {{ t('views.landingPage.navbar.home') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="dark-blue"
                    @click="scrollTo('features')"
                >
                    {{ t('views.landingPage.navbar.features') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="dark-blue"
                    @click="scrollTo('how-it-works')"
                >
                    {{ t('views.landingPage.navbar.howItWorks') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="dark-blue"
                    @click="scrollTo('demo')"
                >
                    {{ t('views.landingPage.navbar.demo') }}
                </v-btn>
                <v-btn
                    variant="text"
                    color="dark-blue"
                    @click="scrollTo('pricing')"
                >
                    {{ t('views.landingPage.navbar.pricing') }}
                </v-btn>
            </v-col>
            <v-spacer />
            <v-col
                cols="auto"
                class="align-center d-flex ga-4"
            >
                <v-icon
                    :icon="mdiTwitter"
                    color="dark-blue"
                />
                <v-icon
                    :icon="mdiInstagram"
                    color="dark-blue"
                />
                <v-btn
                    variant="flat"
                    color="purple"
                    size="large"
                >
                    {{ t('views.landingPage.buttons.freeTrial') }}
                </v-btn>
            </v-col>
        </v-row>

        <!-- Hero -->
        <v-row
            id="home"
            align="center"
            class="hero-section"
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
            class="hero-section"
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

        <!-- Overview -->
        <v-row
            id="how-it-works"
            justify="center"
            class="overview-section"
        >
            <v-col
                cols="12"
                class="pb-2 text-center"
            >
                <p class="text-overline text-purple">
                    {{ t('views.landingPage.allFeedback') }}
                </p>
            </v-col>
        </v-row>

        <v-row class="overview-section">
            <v-col
                v-for="item in overviewItems"
                :key="item.titleKey"
                cols="12"
                md="4"
            >
                <v-card
                    height="100%"
                    class="pa-4"
                >
                    <v-card-item>
                        <v-avatar
                            :color="item.bg"
                            size="48"
                            class="mb-4"
                        >
                            <v-icon
                                :icon="item.icon"
                                :color="item.color"
                            />
                        </v-avatar>
                        <v-card-title class="font-weight-bold px-0 text-dark-blue">
                            {{ t(item.titleKey) }}
                        </v-card-title>
                    </v-card-item>
                    <v-card-text class="text-content">
                        {{ t(item.desc1Key) }}
                    </v-card-text>
                    <v-card-text class="text-content">
                        {{ t(item.desc2Key) }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Integrations / Trusted By -->
        <v-row
            justify="center"
            class="overview-section"
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

        <!-- Features -->
        <v-row
            id="features"
            justify="center"
            class="features-section"
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

        <v-row class="features-section">
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

        <!-- Blog -->
        <v-row
            id="demo"
            justify="center"
            class="blog-section"
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

        <v-row class="blog-section">
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
            class="pb-6 blog-section"
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
            class="blog-section"
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

        <!-- Footer -->
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
        <v-row class="footer-bg footer-section py-10">
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
            class="legal-bg footer-section py-4"
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
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Landing Page View.
 * @description Displays the full landing page: navbar, hero, trusted-by, overview, features, blog and footer sections.
 */
import { useI18n } from 'vue-i18n';
import {
    mdiTwitter,
    mdiInstagram,
    mdiMessageTextOutline,
    mdiMapOutline,
    mdiNewspaperVariantOutline,
    mdiLockOutline,
    mdiThumbUpOutline,
    mdiDomainPlus,
    mdiAccountKeyOutline,
    mdiShieldCheckOutline,
    mdiTagOutline,
    mdiAccountPlusOutline,
    mdiChartLineVariant,
    mdiLinkVariant,
    mdiRocketLaunchOutline
} from '@mdi/js';

const { t } = useI18n();

const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const overviewItems = [
    {
        bg: 'purple-light',
        color: 'purple',
        desc1Key: 'views.landingPage.feedbackBoards.give',
        desc2Key: 'views.landingPage.feedbackBoards.allInOne',
        icon: mdiMessageTextOutline,
        titleKey: 'views.landingPage.feedbackBoards.title'
    },
    {
        bg: 'background-secondary',
        color: 'blue',
        desc1Key: 'views.landingPage.roadmap.share',
        desc2Key: 'views.landingPage.roadmap.comunicate',
        icon: mdiMapOutline,
        titleKey: 'views.landingPage.roadmap.title'
    },
    {
        bg: 'background-secondary',
        color: 'warning',
        desc1Key: 'views.landingPage.changelog.comunicate',
        desc2Key: 'views.landingPage.changelog.share',
        icon: mdiNewspaperVariantOutline,
        titleKey: 'views.landingPage.changelog.title'
    }
];

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

const posts = [
    { date: 'Feb 9, 2024', icon: mdiChartLineVariant, title: 'Impact of Dynamic Pricing on Customer Behavior and Loyalty' },
    { date: 'Jan 15, 2024', icon: mdiLinkVariant, title: '4 Tips for Effective B2B Link Building' },
    { date: 'Nov 8, 2023', icon: mdiRocketLaunchOutline, title: 'Scaling Your Remote SaaS Business: 6 Tactics for Growth' }
];
</script>

<style scoped>
.navbar {
    width: 70%;
    margin: 0 auto;
    padding: 16px 0;
    border-bottom: 1px solid rgba(var(--v-theme-dark-blue), 0.15);
}

.hero-section {
    width: 70%;
    margin: 0 auto;
    padding: 60px 0;
}

.overview-section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}

.features-section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}

.blog-section {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
}

.footer-section {
    width: 100vw;
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

.cta-banner {
    background: linear-gradient(135deg, #AD1FEA 0%, #4661E6 100%) !important;
}

.cta-strip {
    background: linear-gradient(135deg, #AD1FEA 0%, #4661E6 100%);
    width: 100vw;
}

.footer-bg {
    background-color: rgb(var(--v-theme-background-secondary));
}

.legal-bg {
    background-color: rgb(var(--v-theme-background-primary));
}
</style>
