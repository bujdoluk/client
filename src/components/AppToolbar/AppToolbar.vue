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
        <v-btn>
            DARK MODE
        </v-btn>
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
import { ref } from 'vue';
import router from '@/router';
import { auth } from '@/firebase/init';
import AvatarMenu from '@/components/AvatarMenu/AvatarMenu.vue';

const { t } = useI18n();
const user = ref(auth().currentUser);

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

</script>

<style scoped>
.cursor:hover {
    cursor: pointer;
    background-color: #485184;
}
</style>
