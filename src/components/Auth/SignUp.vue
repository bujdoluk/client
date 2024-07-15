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
            <v-col cols="6">
                <v-form>
                    <v-card
                        width="600"
                        height="400"
                        class="pa-6"
                    >
                        <v-card-title class="h5">
                            {{ t('components.SignUp.title') }}
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="userName"
                                :label="t('inputs.userName')"
                                variant="outlined"
                            />
                        </v-card-text>
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
 * @file Sing In component.
 * @description User sign in.
 */
import { ref } from 'vue';
import { useSignup } from '../../plugins/auth';
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft } from '@mdi/js';
import router from '@/router';

const { t } = useI18n();
const userName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const { signup } = useSignup();

const submit = async (): Promise<void> => {
    try {
        await signup(email.value, password.value, userName.value);  
        console.log('user signed up');
    } catch (error: any) {
        console.log('Cant signup :/');
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