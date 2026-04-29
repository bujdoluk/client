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
                v-if="user === null"
                variant="flat"
                :disabled="router.currentRoute.value.fullPath === '/signup'"
                color="purple"
                :to="{ 'name': 'signup' }"
            >
                {{ t('buttons.signup') }}
            </v-btn>
            <v-btn
                v-if="user === null"
                variant="flat"
                :disabled="router.currentRoute.value.fullPath === '/login'"
                color="purple"
                class="mx-3"
                :to="{ 'name': 'login' }"
            >
                {{ t('buttons.login') }}
            </v-btn>
            <v-btn
                v-if="user && router.currentRoute.value.fullPath === '/'"
                variant="flat"
                color="purple"
                @click="redirecToApp"
            >
                {{ t('buttons.backToApp') }}
            </v-btn>
           
            <v-btn
                v-if="user"
                variant="outlined"
                class="mx-3"
                @click="redirectToChangelog"
            >
                {{ t('buttons.changelog') }}
            </v-btn>
           
            <ThemeSelect />
            <LanguageSelect />
            <AvatarMenu
                v-if="user"
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
import { ref } from 'vue';
import router from '@/router';
import { auth } from '@/firebase/init';
import AvatarMenu from '@/components/AvatarMenu/AvatarMenu.vue';

const { t } = useI18n();
const user = ref(auth().currentUser);

auth().onAuthStateChanged((_user) => {
    user.value = _user;
});

const redirectToLandingPage = (): void => {
    router.push({ name: 'landing' });
};

const redirecToApp = (): void => {
    if (user.value) {
        router.push({ name: 'suggestions' });
    }
};

const redirectToChangelog = (): void => {
    router.push({ name: 'changelog' });
};
</script>

<style scoped>
.cursor:hover {
    cursor: pointer;
}
</style>