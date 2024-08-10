<template>
    <v-container
        class="bg-background height"
        fluid
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
                    <v-card
                        width="500"
                        :height="errorMessage ? '350' : '320'"
                        class="pa-3"
                        elevation="1"
                    >
                        <v-card-title class="pb-4">
                            {{ t('components.SignUp.title') }}
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="userName"
                                density="compact"
                                :label="t('inputs.userName')"
                                variant="outlined"
                            />
                        </v-card-text>
                        <v-card-text>
                            <v-text-field
                                v-model="email"
                                density="compact"
                                type="email"
                                :label="t('inputs.email')"
                                variant="outlined"
                            />
                        </v-card-text>
                        <v-card-text>
                            <v-text-field
                                v-model="password"
                                :append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                                :type="showPassword ? 'text' : 'password'"
                                density="compact"
                                :label="t('inputs.password')"
                                variant="outlined"
                                @click:append="showPassword = !showPassword"
                            />
                        </v-card-text>
               
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
 * @file Sing In component.
 * @description User sign in.
 */
import { ref } from 'vue';
import { useSignup } from '../../plugins/auth';
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import router from '@/router';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const { t } = useI18n();
const { signup, errorMessage } = useSignup();
const userName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const isFormValid = ref<boolean>(false);
const showPassword = ref<boolean>(false);

const submit = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await signup(email.value, password.value, userName.value);  
        if (!errorMessage.value) {
            router.push({ name: 'login' });
        }
    } catch (e: unknown) {
        console.log(e);
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