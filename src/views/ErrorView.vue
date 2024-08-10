<template>
    <v-container fluid>
        <v-row class="d-flex flex-column text-h3">
            <v-col
                align="center"
                class="font-weight-bold"
            >
                Display error message
            </v-col>
            <v-col align="center">
                <v-btn
                    variant="flat"
                    color="error"
                    size="x-large"
                    @click="refresh"
                >
                    {{ t('buttons.refresh') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Error View.
 */
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const refresh = (): void => {
    window.location.reload();
};
</script>