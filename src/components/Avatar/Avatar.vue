<template>
    <v-container
        fluid
    >
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
                            color="brown"
                            size="large"
                        />
                    </v-btn>
                </template>
                <v-card
                    :width="200"
                    :height="250"
                    class="pa-4"
                    elevation="1"
                > 
                    <v-card-text class="pb-3 text-center">
                        <v-avatar
                            color="brown"
                            size="x-large"
                        />
                    </v-card-text>
                    <v-card-text class="pb-3 text-center">
                        <h3>{{ prop.user.displayName }}</h3>
                    </v-card-text>
                    <v-card-text class="pb-3 text-center">
                        {{ prop.user.email }}
                    </v-card-text>
                    <v-card-text class="pb-3">
                        <EditAccount :user="prop.user" />
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
import { useAppStore } from '@/stores/useAppStore';

const prop = defineProps<{
    user: any;
}>();

const { t } = useI18n();
const appStore = useAppStore();

const logout = async (): Promise<void> => {
    try {
        appStore.isLoading = true;
        await auth().signOut();
    } catch (error: unknown) {
        console.log(error);
    } finally {
        router.push({ name: 'landing' });
        appStore.isLoading = false;
    }
};
</script>/