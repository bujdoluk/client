<template>
    <v-app-bar
        elevation="3"
        class="bg-darkBlue"
        :title="t('components.AppToolbar.title')"
    >
        <Avatar
            v-if="user"
            :user="user"
        />  
        <v-btn
            v-if="router.currentRoute.value.path === '/' ||
                router.currentRoute.value.path === '/login'
            "
            variant="flat"
            color="purple"
            :to="{ 'name': 'signup' }"
        >
            {{ t('buttons.signup') }}
        </v-btn>
        <v-btn
            v-if="router.currentRoute.value.path === '/' ||
                router.currentRoute.value.path === '/signup'
            "
            variant="flat"
            color="purple"
            class="ml-3"
            :to="{ 'name': 'login' }"
        >
            {{ t('buttons.login') }}
        </v-btn>
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
import Avatar from '@/components/Avatar/Avatar.vue';

const { t } = useI18n();
const user = ref(auth().currentUser);

auth().onAuthStateChanged((_user) => {
    console.log('User state change. Current user is:', _user);
    user.value = _user;
});

</script>
