<template>
    <v-form>
        <v-card
            class="pa-5"
            :height="400"
        >
            <span class="pb-2">To change a password, type current password, then type new one.</span>
            <v-card-text> 
                <v-text-field
                    v-model="password"
                    :label="t('inputs.password')"
                    type="password"
                    density="compact"
                    variant="outlined"
                />
            </v-card-text>
            <v-card-text> 
                <v-text-field
                    v-model="newPassword"
                    :label="t('inputs.newPassword')"
                    type="password"
                    density="compact"
                    variant="outlined"
                />
            </v-card-text>
            <v-divider />
            <v-btn>
                {{ t('buttons.resetPassword') }}
            </v-btn>
            <v-card-actions class="pt-5">
                <v-spacer />
                <v-btn
                    variant="flat"
                    color="purple"
                    @click="update"
                >
                    {{ t('buttons.update') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
/**
 * @file User password component.
 * @description Show user password, user can change password or enable two factor authentification.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { updateEmail, updateProfile, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/init';

const { t } = useI18n();
const user = ref(auth().currentUser);
const email = ref<string>(user.value?.email!);
const displayName = ref<string>(user.value?.displayName!);
const password = ref<string>('');
const newPassword = ref<string>('');
const loading = ref<boolean>(false);

const update = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value) {
            await updateProfile(user.value, {
                displayName: displayName.value
            });
            await updateEmail(user.value, email.value);
            await updatePassword(user.value, newPassword.value);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

/* const reset = async (): Promise<void> => {
    try {
        loading.value = true;
        await sendPasswordResetEmail(user.value, user.value.email);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}; */

</script>