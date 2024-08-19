<template>
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
                            {{ t('views.landingPage.integrate') }}
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
 * @file Trusted by component.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
