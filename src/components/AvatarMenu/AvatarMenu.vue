<template>
    <v-container fluid>
        <v-row
            justify="end"
            align="center"
            class="pr-3"
        >
            <v-menu
                rounded
                :close-on-content-click="false"
                close-on-back
            >
                <template #activator="{ props }">
                    <v-btn
                        icon
                        v-bind="props"
                        data-cy="avatar-menu-btn"
                    >
                        <v-avatar
                            size="large"
                            :image="avatarImage"
                        />
                    </v-btn>
                </template>
                <v-card
                    :width="250"
                    :height="250"
                    class="pa-4"
                    elevation="1"
                    data-cy="avatar-menu-card"
                > 
                    <v-card-text class="pb-3 text-center">
                        <v-avatar
                            size="x-large"
                            :image="avatarImage"
                        />
                    </v-card-text>
                    <v-card-text class="pb-3 text-center">
                        <h3>{{ prop.user.displayName }}</h3>
                    </v-card-text>
                    <v-card-text class="pb-3 text-center">
                        {{ prop.user.email }}
                    </v-card-text>
                    <v-card-text class="pb-3">
                        <EditAccount
                            @downloaded="(value) => onPictureDownloaded(value)"
                        />
                    </v-card-text>
                    <v-card-text>
                        <v-btn
                            variant="flat"
                            color="purple"
                            block
                            :to="{ 'name': 'landing' }"
                            data-cy="avatar-logout-btn"
                            @click="logout"
                        >
                            {{ t('buttons.logout') }}
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Avatar menu component.
 * @description Dropdown menu for the authenticated user with links to edit account and logout.
 */
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { auth } from '@/firebase/init';
import { handleError } from '@/plugins/error';
import EditAccount from '@/components/EditAccount/EditAccount.vue';
import { computed, ref } from 'vue';
import avatarFallback from '@/assets/avatar.png';

const prop = defineProps<{
    user: any;
}>();

const loading = ref<boolean>(false);
const { t } = useI18n();
const picture = ref<string>('');
const avatarImage = computed<string>(() => picture.value || avatarFallback);

const logout = async (): Promise<void> => {
    try {
        loading.value = true;
        await auth().signOut();
    } catch (error: unknown) {
        handleError(error);
    } finally {
        localStorage.clear();
        await router.push({ name: 'landing' });
        loading.value = false;
    }
};

const onPictureDownloaded = (downloadedPicture: any): void => {
    picture.value = downloadedPicture;
};

</script>/