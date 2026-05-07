<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="heading, list-item-avatar, list-item-avatar, list-item-avatar"
    />
    <v-card
        v-else
        class="pa-5"
    >
        <div class="align-center d-flex" :class="{ 'mb-4': props.users.length > 0 }">
            <span class="font-weight-bold text-dark-blue text-subtitle-1">
                {{ t('components.VotersCard.title') }}
            </span>
            <v-spacer />
            <span class="font-weight-bold text-body-2 text-dark-blue">
                {{ props.users.length }}
            </span>
        </div>

        <div class="d-flex flex-column ga-3 voter-list">
            <div
                v-for="user in props.users"
                :key="user.userId"
                class="align-center d-flex ga-3"
            >
                <v-avatar size="32">
                    <v-img
                        :alt="user.userName"
                        :src="user.picture || avatarFallback"
                        cover
                    />
                </v-avatar>
                <span class="text-body-2 text-dark-blue">
                    {{ user.userName }}
                </span>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
/** @file VotersCard component. */
import { useI18n } from 'vue-i18n';
import type { User } from '@/types/index.ts';
import avatarFallback from '@/assets/avatar.png';

const props = defineProps<{
    loading: boolean;
    users: Array<User>;
}>();

const { t } = useI18n();
</script>

<style scoped>
.voter-list {
    max-height: 220px;
    overflow-y: auto;
}
</style>
