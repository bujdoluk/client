<template>
    <v-container
        fluid
        class="height"
    >
        <v-row align="center">
            <v-col>
                <v-btn 
                    color="black"
                    variant="text"
                    size="small"
                    :prepend-icon="mdiChevronLeft"
                    @click="redirect"
                >
                    {{ t('buttons.back') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row> 
            <v-col
                cols="12"
                align="center"
            >
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
                        width="550"
                        class="pa-3"
                        elevation="1"
                    >
                        <v-card-title class="pb-4">
                            {{ t('components.LogIn.title') }}
                        </v-card-title> 
                        <v-card-text class="pb-6">
                            <v-btn
                                color="orange"
                                variant="flat"
                                class="text-white"
                                block
                                @click="onAnonymousButtonClicked"
                            >
                                {{ t('buttons.logInAnonymously') }}
                            </v-btn>
                        </v-card-text> 
                        <v-card-text class="pb-6">
                            <v-btn
                                color="green"
                                variant="flat"
                                block
                                @click="onGoogleButtonClicked"
                            >
                                {{ t('buttons.logInWithGoogle') }}
                            </v-btn>
                        </v-card-text>
                        <v-text-field
                            v-model="email"
                            density="compact"
                            type="email"
                            :label="t('inputs.email')"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="password"
                            density="compact"
                            :append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                            :type="showPassword ? 'text' : 'password'"
                            :label="t('inputs.password')"
                            variant="outlined"
                            @click:append="showPassword = !showPassword"
                        />
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                color="purple"
                                variant="flat"
                                @click="submit"
                            >
                                {{ t('buttons.submit') }}
                            </v-btn>
                        </v-card-actions>
                        <v-card-text
                            v-if="errorMessage"
                            class="text-error"
                        >
                            {{ errorMessage }}
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Log In component.
 * @description User log in.
 */
import { ref } from 'vue';
import { useLogin } from '@/plugins/auth';
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import { auth, db, firebase } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const { t } = useI18n();
const appStore = useAppStore();
const { login, errorMessage } = useLogin();
const email = ref<string>('');
const password = ref<string>('');
const isFormValid = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const user = ref(auth().currentUser);
const loading = ref<boolean>(false);
const provider = new auth.GoogleAuthProvider();

const createUser = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value) {
            await db.collection('users').doc(user.value.uid).set({
                email: user.value.email,
                picture: '',
                userId: user.value.uid,
                userName: user.value.displayName
            });
        }
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
            router.push({ name: 'suggestions' });
        }
        await createUser();
        console.log('USER created');
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
        if (!errorMessage.value) {
            router.push({ name: 'suggestions' });
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const onGoogleButtonClicked = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth().signInWithPopup(provider);
        if (!errorMessage.value) {
            router.push({ name: 'suggestions' });
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
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
.height {
    height: calc(100vh - 64px);
}
</style>