<template>
    <v-container
        fluid
        class="bg-background height"
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
        <v-row align="center"> 
            <v-col>
                <v-form>
                    <v-card
                        width="600"
                        height="300"
                        class="pa-6"
                    >
                        <v-card-title class="h5">
                            {{ t('components.LogIn.title') }}
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="email"
                                :label="t('inputs.email')"
                                variant="outlined"
                            />
                        </v-card-text>
                        <v-card-text>
                            <v-text-field
                                v-model="password"
                                :label="t('inputs.password')"
                                variant="outlined"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="purple"
                                variant="flat"
                                size="large"
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
 * @file Log In component.
 * @description User log in.
 */
import { ref } from 'vue';
import { useLogin } from '../../plugins/auth';
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft } from '@mdi/js';
import router from '@/router';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const { t } = useI18n();
const email = ref<string>('');
const password = ref<string>('');

const { login } = useLogin();

const submit = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await login(email.value, password.value);  
        console.log('user logged in');
    } catch (error: any) {
        console.log('Cant log in :/');
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
    height: 100vh;
}
</style>