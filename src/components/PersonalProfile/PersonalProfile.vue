<template>
    <v-form>
        <v-card
            class="pa-5"
            :height="400"
        >
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
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
/**
 * @file Personal information component.
 * @description Show user personal information, photos, user name, email etc.
 */
import { useI18n } from 'vue-i18n';
import { db, auth } from '@/firebase/init';
import { ref, onMounted } from 'vue';
import { useStorage } from '@/plugins/storage';
import { useAppStore } from '@/stores/useAppStore';

const emit = defineEmits<(e: 'downloaded', picture: any) => void>();
const { t } = useI18n();
const appStore = useAppStore();
const storage = useStorage();
const user = ref(auth().currentUser);
const email = ref<string>(user.value?.email!);
const displayName = ref<string>(user.value?.displayName!);
const file = ref(null);
const profilePictureUrl = ref();

/* const update = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (user.value) {
            await updateProfile(user.value, {
                displayName: displayName.value
            });
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
}; */

const getUser = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (user.value) {
            await db.collection('users').doc(user.value.uid).get();
        }
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const uploadProfilePicture = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        if (file.value) {
            await storage.uploadImage(file.value);
        }
    } catch (error: any) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const downloadProfilePicture = async (): Promise<void> => {
    try { 
        appStore.isLoading = true;
        profilePictureUrl.value = await storage.getImage();
    } catch (error: any) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        emit('downloaded', profilePictureUrl.value);
    }
};

onMounted(async () => {
    await getUser();
    await downloadProfilePicture();
});
</script>