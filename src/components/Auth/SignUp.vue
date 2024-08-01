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
                <v-form>
                    <v-card
                        width="500"
                        height="320"
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
                                :label="t('inputs.email')"
                                variant="outlined"
                            />
                        </v-card-text>
                        <v-card-text>
                            <v-text-field
                                v-model="password"
                                density="compact"
                                :label="t('inputs.password')"
                                variant="outlined"
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
import { mdiChevronLeft } from '@mdi/js';
import router from '@/router';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const { t } = useI18n();
const userName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const { signup } = useSignup();

const submit = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await signup(email.value, password.value, userName.value);  
        console.log('user signed up');
    } catch (error: any) {
        console.log('Cant signup :/');
    } finally {
        appStore.isLoading = false;
    }
};

const redirect = (): void => {
    router.push('/');
};
</script>

<style scoped>
.height {
    height: calc(100vh - 64px);
}
</style>