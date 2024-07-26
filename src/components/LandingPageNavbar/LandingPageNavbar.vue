<template>
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
</template>

<script setup lang="ts">
/**
 * @file Navbar component.
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
</style>

