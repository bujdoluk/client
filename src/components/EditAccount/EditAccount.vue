<template>
    <v-btn
        variant="outlined"
        block
        @click="open"
    >
        {{ t('buttons.editAccount') }}
    </v-btn>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>
                My account
            </v-card-title>
            <v-tabs
                v-model="currentTab"
                show-arrows
                bg-color="primary"
            >
                <v-tab
                    v-for="tab in tabs"
                    :key="tab.name"
                    :value="tab.name"
                    :to="tab.route"
                    color="purple"
                    variant="text"
                >
                    {{ $t(`tabs.information.${tab.name}`) }}
                </v-tab>
            </v-tabs>
            <v-tabs-window v-model="currentTab">
                <v-tabs-window-item value="personal">
                    <v-row align="center">
                        <v-col>
                            <PersonalProfile />
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
                    
                <v-tabs-window-item value="password">
                    <v-row align="center">
                        <v-col>
                            <UserPassword />
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
                    
                <v-tabs-window-item value="appearance">
                    <v-row align="center">
                        <v-col>
                            Three
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
/**
 * @file Edit account.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import PersonalProfile from '@/components/PersonalProfile/PersonalProfile.vue';
import UserPassword from '@/components/UserPassword/UserPassword.vue';

const { t } = useI18n();
const dialog = ref<boolean>(false);
const currentTab = ref<string>('personal');

const tabs = ref([
    { name: 'personal', route: 'personal' },
    { name: 'password', route: 'password' },
    { name: 'appearance', route: 'appearance' }
]);

const open = (): void => {
    dialog.value = true;
};

</script>
