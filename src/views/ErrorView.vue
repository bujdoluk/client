<template>
    <v-container
        fluid
        class="error-container"
    >
        <v-row
            align="center"
            justify="center"
            class="fill-height"
        >
            <v-col
                cols="12"
                sm="8"
                md="5"
                class="text-center"
            >
                <v-icon
                    size="80"
                    color="error"
                    class="mb-4"
                >
                    {{ mdiAlertCircleOutline }}
                </v-icon>
                <div class="font-weight-bold mb-2 text-h4">
                    {{ t('views.error.title') }}
                </div>
                <div class="mb-6 text-body-1 text-medium-emphasis">
                    {{ t('views.error.message') }}
                </div>
                <v-btn
                    color="purple"
                    variant="flat"
                    size="large"
                    :prepend-icon="mdiHome"
                    @click="goHome"
                >
                    {{ t('views.error.home') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Error View.
 * @description Displayed when the user tries to access a protected route without being authenticated.
 */
import { useI18n } from 'vue-i18n';
import { mdiAlertCircleOutline, mdiHome } from '@mdi/js';
import router from '@/router';

const { t } = useI18n();

const goHome = async (): Promise<void> => {
    await router.push({ name: 'suggestions' });
};
</script>

<style scoped>
.error-container {
    height: calc(100vh - 64px);
}
</style>
