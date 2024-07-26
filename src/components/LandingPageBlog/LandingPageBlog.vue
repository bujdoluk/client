<template>
    <v-row
        class="grid text-center"
        align="center"
    >
        <v-col
            cols="12"
            md="6"
            class="font-weight-bold mx-auto text-h4"
        >
            {{ t('views.landingPage.blog') }}
        </v-col>
    </v-row>
    <v-row
        class="grid text-center"
        align="center"
    >
        <v-col>
            <v-card>
                <v-card-text>
                    IMAGE
                </v-card-text>
                <v-card-text>
                    Impact of Dynamic Pricing on Customer Behavior and Loyalty
                </v-card-text>
                <v-card-text>
                    Feb 9, 2024
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-card-text>
                    IMAGE
                </v-card-text>
                <v-card-text>
                    4 Tips for Effective B2B Link Building
                </v-card-text>
                <v-card-text>
                    Jan 15, 2024
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-card-text>
                    IMAGE
                </v-card-text>
                <v-card-text>
                    Scaling Your Remote SaaS Business: 6 Tactics for Growth
                </v-card-text>
                <v-card-text>
                    Nov 8, 2023
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row
        class="grid text-center"
        align="center"
    >
        <v-col>
            <v-btn
                variant="outlined"
                flat
                color="purple"
                size="x-large"
            >
                {{ t('views.landingPage.buttons.readMore') }}
            </v-btn>
        </v-col>
    </v-row>
    <v-row
        class="d-flex flex-column grid text-center"
        align="center"
    >
        <v-col class="font-weight-bold text-h4">
            Ready to start building the right things?
        </v-col>
        <v-col>
            Turn user feedback into actionable product optimizations!
        </v-col>
        <v-col>
            <v-btn
                variant="tonal"
                flat
                color="white"
                class="bg-purple"
                size="x-large"
            >
                {{ t('views.landingPage.buttons.14dayFreeTrial') }}
            </v-btn>
        </v-col>
        <v-col>
            {{ t('views.landingPage.headline.noCreditCardRequired') }}
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
/**
 * @file Blog component.
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

