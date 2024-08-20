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
                    >
                        <v-avatar
                            size="large"
                            :image=" picture ? picture : '../../../src//assets/avatar.png'"
                        />
                    </v-btn>
                </template>
                <v-card
                    :width="250"
                    :height="250"
                    class="pa-4"
                    elevation="1"
                > 
                    <v-card-text class="pb-3 text-center">
                        <v-avatar
                            size="x-large"
                            :image=" picture ? picture : '../../../src//assets/avatar.png'"
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
 * @file Avatar component.
 */
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { auth } from '@/firebase/init';
import EditAccount from '@/components/EditAccount/EditAccount.vue';
import { ref } from 'vue';

const prop = defineProps<{
    user: any;
}>();

const loading = ref<boolean>(false);
const { t } = useI18n();
const picture = ref();

const logout = async (): Promise<void> => {
    try {
        loading.value = true;
        await auth().signOut();
    } catch (error: unknown) {
        console.log(error);
    } finally {
        localStorage.clear();
        router.push({ name: 'landing' });
        loading.value = false;
    }
};

const onPictureDownloaded = (downloadedPicture: any): void => {
    picture.value = downloadedPicture;
};

</script>/