<template>
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
</template>

<script setup lang="ts">
/**
 * @file Navbar component.
 */
import { useI18n } from 'vue-i18n';
import { mdiTwitter, mdiInstagram } from '@mdi/js';

const { t } = useI18n();

const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
</script>

<style scoped>
.navbar {
    width: 70%;
    margin: 0 auto;
    padding: 16px 0;
    border-bottom: 1px solid rgba(55, 63, 104, 0.08);
}
</style>