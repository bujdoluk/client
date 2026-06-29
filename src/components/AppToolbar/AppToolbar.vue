<template>
    <v-app-bar
        elevation="3"
        class="bg-background-dark-blue"
    >
        <div
            class="align-center cursor d-flex flex-row px-3"
            @click="redirectToLandingPage"
        >
            <h2 class="pr-2">
                {{ t('components.AppToolbar.title') }}
            </h2>
            <img
                src="../../../src//assets/feedback-logo.png"
                :alt="t('components.AppToolbar.alt')"
                height="50"
                class="cursor"
            >
        </div>
        <v-spacer />
        <div class="align-center d-flex">
            <v-btn
                v-if="isGuest"
                variant="flat"
                color="purple"
                class="mx-3"
                data-cy="toolbar-skip-btn"
                @click="onSkipButtonClicked"
            >
                {{ t('buttons.skip') }}
            </v-btn>
            <v-btn
                v-if="isGuest"
                variant="flat"
                :disabled="isOnSignupPage"
                color="purple"
                data-cy="toolbar-signup-btn"
                :to="{ 'name': 'signup' }"
            >
                {{ t('buttons.signup') }}
            </v-btn>
            <v-btn
                v-if="isGuest"
                variant="flat"
                :disabled="isOnLoginPage"
                color="purple"
                class="mx-3"
                data-cy="toolbar-login-btn"
                :to="{ 'name': 'login' }"
            >
                {{ t('buttons.login') }}
            </v-btn>
            <v-btn
                v-if="isLoggedInOnLandingPage"
                variant="flat"
                color="purple"
                data-cy="toolbar-back-to-app-btn"
                @click="redirecToApp"
            >
                {{ t('buttons.backToApp') }}
            </v-btn>

            <v-btn
                v-if="isLoggedIn"
                variant="outlined"
                class="mx-3"
                data-cy="toolbar-changelog-btn"
                @click="redirectToChangelog"
            >
                {{ t('buttons.changelog') }}
            </v-btn>

            <ThemeSelect />
            <LanguageSelect />
            <AvatarMenu
                v-if="isLoggedIn"
                :user="user"
            />
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
/**
 * @file AppToolbar.
 * @description Main app navigation bar with auth buttons, avatar, language, theme and changelog controls.
 */
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import router from '@/router';
import { auth } from '@/firebase/init';
import { useSkipAuth } from '@/plugins/auth';
import { handleError } from '@/plugins/error';
import { useAppStore } from '@/stores/useAppStore';
import AvatarMenu from '@/components/AvatarMenu/AvatarMenu.vue';

const { t } = useI18n();
const appStore = useAppStore();
const { skipAuth } = useSkipAuth();
const user = ref(auth().currentUser);

auth().onAuthStateChanged((_user) => {
    user.value = _user;
});

const isGuest = computed<boolean>(() => user.value === null);
const isLoggedIn = computed<boolean>(() => Boolean(user.value));
const isOnSignupPage = computed<boolean>(() => router.currentRoute.value.fullPath === '/signup');
const isOnLoginPage = computed<boolean>(() => router.currentRoute.value.fullPath === '/login');
const isLoggedInOnLandingPage = computed<boolean>(() => Boolean(user.value) && router.currentRoute.value.fullPath === '/');

const redirectToLandingPage = async (): Promise<void> => {
    await router.push({ name: 'landing' });
};

const onSkipButtonClicked = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await skipAuth();
        await router.push({ name: 'suggestions' });
    } catch (error: unknown) {
        handleError(error);
    } finally {
        appStore.isLoading = false;
    }
};

const redirecToApp = async (): Promise<void> => {
    if (user.value) {
        await router.push({ name: 'suggestions' });
    }
};

const redirectToChangelog = async (): Promise<void> => {
    await router.push({ name: 'changelog' });
};
</script>

<style scoped>
.cursor:hover {
    cursor: pointer;
}
</style>