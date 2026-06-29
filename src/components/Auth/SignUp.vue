<template>
    <v-container
        fluid
        class="signup-container"
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
                <div class="align-center d-flex justify-space-between mb-4">
                    <v-btn
                        color="on-surface"
                        variant="text"
                        size="small"
                        :prepend-icon="mdiChevronLeft"
                        class="pl-0"
                        data-cy="signup-back-btn"
                        @click="redirect"
                    >
                        {{ t('buttons.back') }}
                    </v-btn>
                    <v-btn
                        color="on-surface"
                        variant="text"
                        size="small"
                        :append-icon="mdiSkipNext"
                        data-cy="signup-skip-btn"
                        @click="onSkipButtonClicked"
                    >
                        {{ t('buttons.skip') }}
                    </v-btn>
                </div>

                <v-form
                    ref="form"
                    v-model="isFormValid"
                    fast-fail
                    validate-on="input"
                    @keydown.enter="submit"
                >
                    <v-card
                        class="pa-6"
                        elevation="4"
                        rounded="lg"
                        data-cy="signup-card"
                    >
                        <div class="mb-6 text-center">
                            <v-icon
                                size="52"
                                color="purple"
                                class="mb-3"
                            >
                                {{ mdiAccountPlus }}
                            </v-icon>
                            <div class="font-weight-bold text-h5">
                                {{ t('components.SignUp.title') }}
                            </div>
                            <div class="mt-1 text-body-2 text-medium-emphasis">
                                {{ t('components.SignUp.subtitle') }}
                            </div>
                        </div>

                        <v-text-field
                            v-model="userName"
                            density="comfortable"
                            :label="t('inputs.userName')"
                            variant="outlined"
                            :prepend-inner-icon="mdiAccountOutline"
                            class="mb-2"
                            data-cy="signup-username-input"
                            hide-details="auto"
                        />
                        <v-text-field
                            v-model="email"
                            density="comfortable"
                            type="email"
                            :label="t('inputs.email')"
                            variant="outlined"
                            :prepend-inner-icon="mdiEmailOutline"
                            class="mb-2"
                            data-cy="signup-email-input"
                            hide-details="auto"
                        />
                        <v-text-field
                            v-model="password"
                            density="comfortable"
                            :append-inner-icon="passwordVisibilityIcon"
                            :type="passwordFieldType"
                            :label="t('inputs.password')"
                            variant="outlined"
                            :prepend-inner-icon="mdiLockOutline"
                            data-cy="signup-password-input"
                            hide-details="auto"
                            @click:append-inner="showPassword = !showPassword"
                        />

                        <v-btn
                            color="purple"
                            variant="flat"
                            block
                            size="large"
                            class="mt-2"
                            data-cy="signup-submit-btn"
                            @click="submit"
                        >
                            {{ t('buttons.signup') }}
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
 * @file SignUp component.
 * @description User registration.
 */
import { computed, ref } from 'vue';
import { useSignup, useSkipAuth } from '@/plugins/auth';
import { useI18n } from 'vue-i18n';
import {
    mdiChevronLeft,
    mdiSkipNext,
    mdiEyeOutline,
    mdiEyeOffOutline,
    mdiAccountPlus,
    mdiAccountOutline,
    mdiEmailOutline,
    mdiLockOutline
} from '@mdi/js';
import router from '@/router';
import { useAppStore } from '@/stores/useAppStore';
import { handleError } from '@/plugins/error';

const { t } = useI18n();
const appStore = useAppStore();
const { signup, errorMessage } = useSignup();
const { skipAuth } = useSkipAuth();
const userName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const isFormValid = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const passwordVisibilityIcon = computed<string>(() => (showPassword.value ? mdiEyeOutline : mdiEyeOffOutline));
const passwordFieldType = computed<'text' | 'password'>(() => (showPassword.value ? 'text' : 'password'));

const submit = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await signup(email.value, password.value, userName.value);
        if (!errorMessage.value) {
            await router.push({ name: 'login' });
        }
    } catch (error: unknown) {
        handleError(error);
    } finally {
        appStore.isLoading = false;
    }
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

const form = ref<{
    resetValidation: () => void;
    validate: () => boolean;
}>;

const redirect = async (): Promise<void> => {
    await router.push({ name: 'landing' });
};
</script>

<style scoped>
.signup-container {
    min-height: calc(100vh - 64px);
}
</style>
