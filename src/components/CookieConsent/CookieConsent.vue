<template>
    <v-card
        v-if="visible"
        class="cookie-banner pa-4"
        color="background-dark-blue"
        data-cy="cookie-consent-banner"
    >
        <v-row
            align="center"
            class="width"
        >
            <v-col
                cols="12"
                md="8"
            >
                <p class="text-body-2 text-white">
                    {{ t('components.CookieConsent.message') }}
                </p>
            </v-col>
            <v-col
                cols="12"
                md="4"
                class="d-flex ga-3 justify-end"
            >
                <v-btn
                    variant="outlined"
                    color="white"
                    data-cy="cookie-consent-deny-btn"
                    @click="onDeny"
                >
                    {{ t('buttons.denyCookies') }}
                </v-btn>
                <v-btn
                    variant="flat"
                    color="purple"
                    data-cy="cookie-consent-allow-btn"
                    @click="onAllow"
                >
                    {{ t('buttons.allowCookies') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file CookieConsent component.
 * @description Bottom banner letting the user allow or deny non-essential tracking cookies.
 */
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { auth, db, timestamp } from '@/firebase/init';
import { handleError } from '@/plugins/error';

interface NavigatorExtended extends Navigator {
    connection?: { effectiveType?: string; saveData?: boolean };
    deviceMemory?: number;
}

const { t } = useI18n();

const COOKIE_CONSENT_KEY = 'cookieConsent';

const visible = ref<boolean>(false);

const trackUser = async (): Promise<void> => {
    try {
        const nav = navigator as NavigatorExtended;
        const { currentUser } = auth();
        const docId = db.collection('analytics').doc().id;

        await db.collection('analytics').doc(docId).set({
            colorDepth: window.screen.colorDepth,
            connectionType: nav.connection?.effectiveType ?? null,
            cookiesEnabled: nav.cookieEnabled,
            createdAt: timestamp,
            deviceMemory: nav.deviceMemory ?? null,
            devicePixelRatio: window.devicePixelRatio,
            docId,
            email: currentUser?.email ?? null,
            hardwareConcurrency: nav.hardwareConcurrency,
            hostname: window.location.hostname,
            isOnline: nav.onLine,
            language: nav.language,
            languages: [...nav.languages],
            path: window.location.pathname,
            platform: nav.platform,
            referrer: document.referrer || null,
            screenHeight: window.screen.height,
            screenWidth: window.screen.width,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: Temporal.Now.zonedDateTimeISO().offset,
            userAgent: nav.userAgent,
            userId: currentUser?.uid ?? null,
            viewportHeight: window.innerHeight,
            viewportWidth: window.innerWidth
        });
    } catch (error: unknown) {
        handleError(error);
    }
};

const onAllow = async (): Promise<void> => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    visible.value = false;
    await trackUser();
};

const onDeny = (): void => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'denied');
    visible.value = false;
};

onMounted(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
        visible.value = true;
    }
});
</script>

<style scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
}

.width {
    width: 70vw;
    margin: 0 auto;
}
</style>
