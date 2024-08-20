<template>
    <v-skeleton-loader
        v-if="props.loading"
        boilerplate
        type="card"
    />
    <v-card v-else>
        <v-container fluid>
            <v-row class="font-weight-bold text-dark-blue">
                <v-col>
                    {{ t('components.VotersCard.title') }}
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    {{ usersCount }}
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file VotersCard component.
 */
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import type { User } from '@/models/User';

const props = defineProps<{
    loading: boolean;
    users: Array<User>;
}>();

const { t } = useI18n();
const usersCount = computed(() => props.users.length);
</script>