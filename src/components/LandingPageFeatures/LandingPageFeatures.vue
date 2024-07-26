<template>
    <v-row
        class="grid"
        align="center"
    >
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-center text-h4"
        >
            {{ t('views.landingPage.features') }}
        </v-col>
    </v-row>
    <v-row
        class="grid"
        align="center"
    >
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card1.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card1.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card2.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card2.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card3.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card3.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card4.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card4.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row
        class="grid"
        align="center"
    >
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card5.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card5.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card6.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card6.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card7.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card7.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="text-center">
            <v-card height="300">
                <v-card-text class="font-weight-bold">
                    {{ t('views.landingPage.card8.title') }}
                </v-card-text>
                <v-card-text>
                    {{ t('views.landingPage.card8.subtitle') }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Product features component.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
