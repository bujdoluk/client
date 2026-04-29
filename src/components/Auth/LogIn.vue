<template>
    <v-container
        fluid
        class="login-container"
    >
        <v-row
            align="center"
            justify="center"
            class="fill-height"
        >
            <v-col
                cols="12"
                sm="9"
                md="6"
                lg="5"
                xl="4"
            >
                <v-btn
                    color="on-surface"
                    variant="text"
                    size="small"
                    :prepend-icon="mdiChevronLeft"
                    class="mb-4 pl-0"
                    @click="redirect"
                >
                    {{ t('buttons.back') }}
                </v-btn>

                <v-form
                    ref="form"
                    v-model="isFormValid"
                    fast-fail
                    validate-on="input"
                    @keydown.enter="submit"
                >
                    <v-skeleton-loader
                        v-if="loading"
                        boilerplate
                        type="card"
                    />
                    <v-card
                        v-else
                        class="pa-6"
                        elevation="4"
                        rounded="lg"
                    >
                        <div class="mb-6 text-center">
                            <v-icon
                                size="52"
                                color="purple"
                                class="mb-3"
                            >
                                {{ mdiAccountCircle }}
                            </v-icon>
                            <div class="font-weight-bold text-h5">
                                {{ t('components.LogIn.title') }}
                            </div>
                            <div class="mt-1 text-body-2 text-medium-emphasis">
                                {{ t('components.LogIn.subtitle') }}
                            </div>
                        </div>

                        <div class="d-flex flex-column ga-3 mb-5">
                            <v-btn
                                color="#DB4437"
                                variant="flat"
                                block
                                size="large"
                                :prepend-icon="mdiGoogle"
                                class="text-white"
                                @click="onGoogleButtonClicked"
                            >
                                {{ t('buttons.logInWithGoogle') }}
                            </v-btn>
                            <v-btn
                                color="#1877F2"
                                variant="flat"
                                block
                                size="large"
                                :prepend-icon="mdiFacebook"
                                class="text-white"
                                @click="onFacebookButtonClicked"
                            >
                                {{ t('buttons.logInWithFacebook') }}
                            </v-btn>
                            <v-btn
                                color="orange-darken-1"
                                variant="flat"
                                block
                                size="large"
                                :prepend-icon="mdiIncognito"
                                class="text-white"
                                @click="onAnonymousButtonClicked"
                            >
                                {{ t('buttons.logInAnonymously') }}
                            </v-btn>
                        </div>

                        <v-divider class="mb-5">
                            <span class="px-2 text-caption text-medium-emphasis">{{ t('components.LogIn.or') }}</span>
                        </v-divider>

                        <v-text-field
                            v-model="email"
                            density="comfortable"
                            type="email"
                            :label="t('inputs.email')"
                            variant="outlined"
                            :prepend-inner-icon="mdiEmailOutline"
                            class="mb-2"
                        />
                        <v-text-field
                            v-model="password"
                            density="comfortable"
                            :append-inner-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                            :type="showPassword ? 'text' : 'password'"
                            :label="t('inputs.password')"
                            variant="outlined"
                            :prepend-inner-icon="mdiLockOutline"
                            @click:append-inner="showPassword = !showPassword"
                        />

                        <v-btn
                            color="purple"
                            variant="flat"
                            block
                            size="large"
                            class="mt-2"
                            @click="submit"
                        >
                            {{ t('buttons.submit') }}
                        </v-btn>

                        <v-alert
                            v-if="errorMessage"
                            type="error"
                            variant="tonal"
                            class="mt-4"
                            density="compact"
                            rounded="lg"
                        >
                            {{ errorMessage }}
                        </v-alert>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file LogIn component.
 * @description User log in with email/password, Google, Facebook, and anonymous auth.
 */
import { ref } from 'vue';
import { useLogin } from '@/plugins/auth';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import {
    mdiChevronLeft,
    mdiEyeOutline,
    mdiEyeOffOutline,
    mdiAccountCircle,
    mdiGoogle,
    mdiFacebook,
    mdiIncognito,
    mdiEmailOutline,
    mdiLockOutline
} from '@mdi/js';
import { auth, db, firebase } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const { t } = useI18n();
const appStore = useAppStore();
const { login, errorMessage } = useLogin();
const email = ref<string>('');
const password = ref<string>('');
const isFormValid = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const googleProvider = new auth.GoogleAuthProvider();
const facebookProvider = new auth.FacebookAuthProvider();

const navigateAfterAuth = (): void => {
    const unsubscribe = auth().onAuthStateChanged((loggedInUser) => {
        if (loggedInUser) {
            unsubscribe();
            router.push({ name: 'suggestions' });
        }
    });
};

const createUser = async (): Promise<void> => {
    const { currentUser } = auth();
    if (!currentUser) return;
    try {
        loading.value = true;
        await db.collection('users').doc(currentUser.uid).set({
            email: currentUser.email,
            picture: '',
            userId: currentUser.uid,
            userName: currentUser.displayName
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const submit = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await login(email.value, password.value);
        if (!errorMessage.value) {
            navigateAfterAuth();
        }
        await createUser();
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const onAnonymousButtonClicked = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth().signInAnonymously();
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        navigateAfterAuth();
    }
};

const onGoogleButtonClicked = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth().signInWithPopup(googleProvider);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        navigateAfterAuth();
    }
};

const onFacebookButtonClicked = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth().signInWithPopup(facebookProvider);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        navigateAfterAuth();
    }
};

const form = ref<{
    resetValidation: () => void;
    validate: () => boolean;
}>;

const redirect = (): void => {
    router.push({ name: 'landing' });
};
</script>

<style scoped>
.login-container {
    min-height: calc(100vh - 64px);
}
</style>
