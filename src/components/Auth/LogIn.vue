<template>
    <v-btn
        variant="flat"
        color="purple"
        class="ml-3"
        @click="dialog = true"
    >
        <RouterLink
            :to="{ 'name': 'login' }"
        >
            {{ t('buttons.login') }}
        </RouterLink>
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="600"
    >
        <v-form>
            <v-card class="pa-6">
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
 * @file Log In component.
 * @description User log in.
 */
import { ref } from 'vue';
import { useLogin } from '../../plugins/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const dialog = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');

const { login } = useLogin();

const submit = async (): Promise<void> => {
    try {
        await login(email.value, password.value);  
        console.log('user logged in');
    } catch (error: any) {
        console.log('Cant log in :/');
    }
};

const close = (): void => {
    dialog.value = false;
};

</script>

<style scoped>
.height {
    width: 600px;
}
</style>