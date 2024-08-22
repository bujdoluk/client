<template>
    <v-app-bar
        elevation="3"
        class="bg-dark-blue"
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
        <v-btn
            v-if="!user"
            variant="flat"
            :disabled="router.currentRoute.value.fullPath === '/signup'"
            color="purple"
            :to="{ 'name': 'signup' }"
        >
            {{ t('buttons.signup') }}
        </v-btn>
        <v-btn
            v-if="!user"
            variant="flat"
            :disabled="router.currentRoute.value.fullPath === '/login'"
            color="purple"
            class="ml-3"
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
       
        <v-btn variant="outlined" @click="redirectToChangelog" class="mx-3">
            {{ t('buttons.changelog') }}
        </v-btn>
        <v-select
            v-model="selectedTheme"
            label="Select Theme"
            :items="myThemes"
            hide-details
            density="compact"
            variant="plain"
            single-line
            class="bg-background-secondary mr-4 px-1 width"
            @update:model-value="setTheme"
        />
        <LanguageSelect />
        <AvatarMenu
            v-if="user"
            :user="user"
        />
    </v-app-bar>
</template>

<script setup lang="ts">
/**
 * @file AppToolbar.
 */
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import router from '@/router';
import { auth } from '@/firebase/init';
import AvatarMenu from '@/components/AvatarMenu/AvatarMenu.vue';
import { useTheme } from 'vuetify';

const { t } = useI18n();
const user = ref(auth().currentUser);
const myThemes = ['light', 'dark'];
const selectedTheme = ref(myThemes[0]);
const theme = useTheme();

auth().onAuthStateChanged((_user) => {
    console.log('User state change. Current user is:', _user);
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

const setTheme = (): void => {
    theme.global.name.value = selectedTheme.value;
    localStorage.setItem('theme', String(selectedTheme.value));
};

watch(() => selectedTheme.value, () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        theme.global.name.value = storedTheme;
    }
});

</script>

<style scoped>
.cursor:hover {
    cursor: pointer;
    background-color: #485184;
}

.width {
    min-width: 110px !important;
    max-width: 110px !important;
}
</style>
