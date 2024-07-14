<template>
    <v-btn
        variant="flat"
        color="purple"
        @click="dialog = true"
    >
        <RouterLink
            :to="{ 'name': 'signup' }"
        >
            {{ t('buttons.signup') }}
        </RouterLink>
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="600"
    >
        <v-form>
            <v-card class="pa-6">
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
                        color="darkBlue"
                        variant="flat"
                        size="large"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
                    <v-spacer />
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
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Sing In component.
 * @description User sign in.
 */
import { ref } from 'vue';
import { useSignup } from '../../plugins/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const dialog = ref<boolean>(false);
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

const close = (): void => {
    dialog.value = false;
};
</script>