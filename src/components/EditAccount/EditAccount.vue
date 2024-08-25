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
            <v-card-title class="font-weight-bold">
                {{ t('components.EditAccount.title') }}
            </v-card-title>

            <span class="pb-2">
                {{ t('components.EditAccount.picture') }}
            </span>  
            <v-file-input
                v-model="file"
                :label="t('inputs.picture')"
                density="compact"   
                variant="outlined"
                show-size="1000"
            />
            <v-card-actions class="pr-0">
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

            <span class="pb-2">
                {{ t('components.EditAccount.information') }}
            </span>     
            <v-card-text>
                <v-text-field 
                    v-model="displayName" 
                    :label="t('inputs.userName')"
                    density="compact"   
                    variant="outlined"
                />
                <v-text-field
                    v-model="email"
                    :label="t('inputs.email')"
                    type="email"
                    density="compact"
                    variant="outlined"
                />
            </v-card-text>
            <v-card-actions class="pr-0">
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

            <span class="pb-2">{{ t('components.EditAccount.passwordInformation') }}</span>
            <v-card-text> 
                <v-text-field
                    v-model="password"
                    :label="t('inputs.currentPassword')"
                    :append-icon="showCurrentPassword ? mdiEyeOutline : mdiEyeOffOutline"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    density="compact"
                    variant="outlined"
                    @click:append="showCurrentPassword = !showCurrentPassword"
                />
                <v-text-field
                    v-model="newPassword"
                    :label="t('inputs.newPassword')"
                    :append-icon="showNewPassword ? mdiEyeOutline : mdiEyeOffOutline"
                    :type="showNewPassword ? 'text' : 'password'"
                    density="compact"
                    variant="outlined"
                    @click:append="showNewPassword = !showNewPassword"
                />
            </v-card-text>
            <v-card-actions class="pr-0">
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

            <ModerationToggle />
            
            <v-card-actions class="pl-0 pt-5">
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
 */
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { updateEmail, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase/init';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import { useStorage } from '@/plugins/storage';

const emit = defineEmits<(e: 'downloaded', picture: any) => void>();

const { t } = useI18n();
const user = ref(auth().currentUser);
const email = ref<string>(user.value?.email!);
const displayName = ref<string>(user.value?.displayName!);
const password = ref<string>('');
const newPassword = ref<string>('');
const { getImage, uploadImage } = useStorage();
const file = ref(null);
const profilePictureUrl = ref();
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
    try {
        loading.value = true;
        if (user.value) {
            await user.value.updatePassword(newPassword.value);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const resetPassword = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value?.email) {
            await auth().sendPasswordResetEmail(user.value.email);
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const getUser = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value) {
            await db.collection('users').doc(user.value.uid).get();
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const updateUser = async (): Promise<void> => {
    try {
        loading.value = true;
        if (user.value) {
            const res = await db.collection('users').doc(user.value.uid);
            res.update({
                email: email.value,
                userName: displayName.value
            });
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const updateAccount = async (): Promise<void> => {
    try {
        loadingUserAccount.value = true;
        if (user.value) {
       /*      const commentsRef = db.collection('comments').doc(user.value.uid);
            const repliesRef = db.collection('replies').doc(user.value.uid);

            console.log(commentsRef);
         
            await db.runTransaction(async (transaction) => {
                const commentDoc = await transaction.get(commentsRef);
                const repliesDoc = await transaction.get(repliesRef);

                transaction.update(commentsRef, { email: email.value, userName: displayName.value });
                transaction.update(repliesRef, { email: email.value, userName: displayName.value });
            });
 */
            await updateProfile(user.value, { displayName: displayName.value });
            await updateEmail(user.value, email.value);
            await updateUser();
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loadingUserAccount.value = false;
        getUser();
    }
};

const updateProfilePicture = async (): Promise<void> => {
    try {
        loadingPicture.value = true;
        if (file.value) {
            await uploadImage(file.value);
        }
    } catch (error: any) {
        console.log(error);
    } finally {
        loadingPicture.value = false;
        profilePictureUrl.value = await getImage();
        if (profilePictureUrl.value) {
            updateUserProfilePicture(profilePictureUrl.value);
        }
        console.log('pic', profilePictureUrl.value);
    }
};

const updateUserProfilePicture = async (pic: string): Promise<void> => {
    try {
        loadingPicture.value = true;
        const res = db.collection('users').doc(user.value?.uid);
        await res.set({
            email: user.value?.email,
            picture: pic,
            userId: user.value?.uid,
            userName: user.value?.displayName 
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loadingPicture.value = false;
        emit('downloaded', profilePictureUrl.value);
    }
};

onMounted(async () => {
    await getUser();
});

</script>
