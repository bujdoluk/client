<template>
    <v-btn
        variant="outlined"
        block
        @click="open"
    >
        {{ t('buttons.editAccount') }}
    </v-btn>
    <v-dialog
        v-model="dialog"
        width="30%"
    >
        <v-card class="px-3 py-2">
            <div class="align-center d-flex pb-3 pt-3 px-4">
                <span class="font-weight-bold text-h6">
                    {{ t('components.EditAccount.title') }}
                </span>
                <v-spacer />
                <v-btn
                    :icon="mdiClose"
                    density="compact"
                    variant="text"
                    @click="close"
                />
            </div>

            <v-divider />

            <p class="font-weight-bold mb-1 pt-4 px-4 text-body-2">
                {{ t('components.EditAccount.picture') }}
            </p>
            <div class="align-center d-flex ga-3 px-4">
                <v-icon :icon="mdiPaperclip" />
                <v-file-input
                    v-model="file"
                    variant="plain"
                    class="bg-background-secondary flex-grow-1 rounded-lg"
                    density="comfortable"
                    hide-details="auto"
                    prepend-icon=""
                    show-size="1000"
                />
            </div>
            <v-card-actions class="pb-4 pt-3 px-4">
                <v-spacer />
                <v-btn
                    variant="flat"
                    color="purple"
                    :loading="loadingPicture"
                    @click="updateProfilePicture"
                >
                    {{ t('buttons.udpateProfilePicture') }}
                </v-btn>
            </v-card-actions>

            <v-divider />

            <p class="font-weight-bold mb-1 pt-4 px-4 text-body-2">
                {{ t('components.EditAccount.information') }}
            </p>
            <div class="px-4">
                <v-text-field
                    v-model="displayName"
                    :placeholder="t('inputs.userName')"
                    variant="plain"
                    class="bg-background-secondary mb-3 rounded-lg"
                    density="comfortable"
                    single-line
                    hide-details="auto"
                />
                <v-text-field
                    v-model="email"
                    :placeholder="t('inputs.email')"
                    type="email"
                    variant="plain"
                    class="bg-background-secondary rounded-lg"
                    density="comfortable"
                    single-line
                    hide-details="auto"
                />
            </div>
            <v-card-actions class="pb-4 pt-3 px-4">
                <v-spacer />
                <v-btn
                    variant="flat"
                    color="purple"
                    :loading="loadingUserAccount"
                    @click="updateAccount"
                >
                    {{ t('buttons.udpateAccountInformation') }}
                </v-btn>
            </v-card-actions>

            <v-divider />

            <p class="font-weight-bold mb-1 pt-4 px-4 text-body-2">
                {{ t('components.EditAccount.passwordInformation') }}
            </p>
            <div class="px-4">
                <v-text-field
                    v-model="password"
                    :placeholder="t('inputs.currentPassword')"
                    :append-inner-icon="showCurrentPassword ? mdiEyeOutline : mdiEyeOffOutline"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    variant="plain"
                    class="bg-background-secondary mb-3 rounded-lg"
                    density="comfortable"
                    single-line
                    hide-details="auto"
                    @click:append-inner="showCurrentPassword = !showCurrentPassword"
                />
                <v-text-field
                    v-model="newPassword"
                    :placeholder="t('inputs.newPassword')"
                    :append-inner-icon="showNewPassword ? mdiEyeOutline : mdiEyeOffOutline"
                    :type="showNewPassword ? 'text' : 'password'"
                    variant="plain"
                    class="bg-background-secondary rounded-lg"
                    density="comfortable"
                    single-line
                    hide-details="auto"
                    @click:append-inner="showNewPassword = !showNewPassword"
                />
            </div>
            <v-card-actions class="pb-4 pt-3 px-4">
                <v-spacer />
                <v-btn
                    variant="outlined"
                    :loading="loading"
                    @click="resetPassword"
                >
                    {{ t('buttons.resetPassword') }}
                </v-btn>
                <v-btn
                    variant="flat"
                    color="purple"
                    :loading="loading"
                    @click="updateUserPassword"
                >
                    {{ t('buttons.updatePassword') }}
                </v-btn>
            </v-card-actions>

            <v-divider />

            <v-card-actions class="pb-2 pt-2 px-4">
                <v-btn
                    variant="flat"
                    color="dark-blue"
                    @click="close"
                >
                    {{ t('buttons.close') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Edit account.
 * @description Form for updating user profile information including name, picture and password.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { handleError } from '@/plugins/error';
import { auth, db, firebase } from '@/firebase/init';
import { mdiClose, mdiEyeOffOutline, mdiEyeOutline, mdiPaperclip } from '@mdi/js';
import { useStorage } from '@/plugins/storage';
import { useSnackBarStore } from '@/stores/useSnackBarStore';

const emit = defineEmits<{
    downloaded: [picture: string];
}>();

const { t } = useI18n();
const { show } = useSnackBarStore();
const user = ref(auth().currentUser);
const email = ref<string>(user.value?.email ?? '');
const displayName = ref<string>(user.value?.displayName ?? '');
const password = ref<string>('');
const newPassword = ref<string>('');
const { uploadImage, url } = useStorage();
const file = ref<File | null>(null);
const dialog = ref<boolean>(false);

const loading = ref<boolean>(false);
const loadingUserAccount = ref<boolean>(false);
const loadingPicture = ref<boolean>(false);

const showCurrentPassword = ref<boolean>(false);
const showNewPassword = ref<boolean>(false);

const open = (): void => {
    dialog.value = true;
};

const close = (): void => {
    dialog.value = false;
};

const updateUserPassword = async (): Promise<void> => {
    if (!user.value?.email || !password.value || !newPassword.value) return;
    const currentPassword = password.value;
    const currentNewPassword = newPassword.value;
    password.value = '';
    newPassword.value = '';
    try {
        loading.value = true;
        const credential = firebase.auth.EmailAuthProvider.credential(user.value.email, currentPassword);
        await user.value.reauthenticateWithCredential(credential);
        await user.value.updatePassword(currentNewPassword);
    } catch (err: unknown) {
        handleError(err);
    } finally {
        loading.value = false;
    }
};

const resetPassword = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value?.email) {
            await auth().sendPasswordResetEmail(user.value.email);
            password.value = '';
            newPassword.value = '';
        }
    } catch (err: unknown) {
        handleError(err);
    } finally {
        loading.value = false;
    }
};

const updateUser = async (): Promise<void> => {
    if (!user.value) return;
    await db.collection('users').doc(user.value.uid).update({
        email: email.value,
        userName: displayName.value
    });
};

const updateAccount = async (): Promise<void> => {
    if (!user.value) return;
    try {
        loadingUserAccount.value = true;
        await user.value.updateProfile({ displayName: displayName.value });
        await user.value.updateEmail(email.value);
        await updateUser();
        show(t('success.accountUpdated'));
    } catch (err: unknown) {
        handleError(err);
    } finally {
        loadingUserAccount.value = false;
    }
};

const updateUserProfilePicture = async (pic: string): Promise<void> => {
    if (!user.value) return;
    await user.value.updateProfile({ photoURL: pic });
    await db.collection('users').doc(user.value.uid).set({
        email: user.value.email,
        picture: pic,
        userId: user.value.uid,
        userName: user.value.displayName
    });
    emit('downloaded', pic);
};

const updateProfilePicture = async (): Promise<void> => {
    if (!file.value) return;
    try {
        loadingPicture.value = true;
        await uploadImage(file.value);
        if (url.value) {
            await updateUserProfilePicture(url.value);
        }
    } catch (err: unknown) {
        handleError(err);
    } finally {
        loadingPicture.value = false;
    }
};

</script>

<style scoped>
:deep(.v-field--variant-plain .v-field__input) {
    padding-inline: 12px;
}

:deep(.v-field--variant-plain .v-field__append-inner) {
    padding-inline-end: 8px;
}
</style>
