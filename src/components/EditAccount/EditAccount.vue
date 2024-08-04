<template>
    <v-btn
        variant="text"
        block
        @click="open"
    >
        {{ t('buttons.editAccount') }}
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="600"
        persistent
    >
        <v-form>
            <v-card class="pa-5">
                <v-card-title>
                    {{ t('components.EditAccount.information') }}
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        v-model="displayName" 
                        :label="t('inputs.userName')"
                        density="compact"   
                        variant="outlined"
                    />
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        v-model="email"
                        :label="t('inputs.email')"
                        type="email"
                        density="compact"
                        variant="outlined"
                    />
                </v-card-text>
                <v-divider />
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
                <v-btn @click="reset">
                    {{ t('buttons.resetPassword') }}
                </v-btn>
                <v-card-actions class="pt-5">
                    <v-btn
                        variant="flat"
                        color="darkBlue"
                        @click="close"
                    >
                        {{ t('buttons.close') }}
                    </v-btn>
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
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Edit account.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useAppStore } from '@/stores/useAppStore';
import { updateEmail, updateProfile, updatePassword, sendPasswordResetEmail } from 'firebase/auth';

const prop = defineProps<{
    user: any;
}>();

const appStore = useAppStore();
const { t } = useI18n();
const email = ref<string>(prop.user.email);
const displayName = ref<string>(prop.user.displayName);
const password = ref<string>(prop.user.password);
const newPassword = ref<string>('');
const dialog = ref<boolean>(false);

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    dialog.value = false;
};

const update = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (prop.user) {
            await updateProfile(prop.user, {
                displayName: displayName.value
            });
            await updateEmail(prop.user, email.value);
            await updatePassword(prop.user, newPassword.value);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const reset = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (prop.user) {
            await sendPasswordResetEmail(prop.user, prop.user.email);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

</script>
