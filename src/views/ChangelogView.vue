<template>
    <v-container
        fluid
        class="min-height"
    >
        <v-row class="width">
            <v-col cols="auto">
                <v-btn
                    color="purple"
                    @click="redirectToSuggestions"
                >
                    {{ t('buttons.suggestions') }}
                </v-btn>
            </v-col>
            <v-col>
                <v-btn color="purple">
                    {{ t('buttons.changelog') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="width">
            <v-col>
                <v-chip
                    color="green"
                    class="cursor font-weight-bold mr-2"
                >
                    {{ t('chips.released') }}
                </v-chip>
                <v-chip
                    color="grey"
                    class="cursor font-weight-bold"
                >
                    {{ t('chips.all') }}
                </v-chip>
            </v-col>
        </v-row>
        <template v-if="loading">
            <v-row
                v-for="i in 4"
                :key="i"
                class="width"
            >
                <v-col>
                    <v-skeleton-loader
                        boilerplate
                        type="card"
                        width="30%"
                    />
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-row
                v-for="feedback in filteredByCreatedAtFeedbacs(liveFeedbacks)"
                :key="feedback"
                class="width"
            >
                <v-col>
                    <v-card
                        width="30%"
                        class="pa-3"
                    >
                        <v-card-text class="d-flex justify-space-between">
                            <v-chip
                                color="green"
                                class="font-weight-bold"
                            >
                                {{ t('chips.released') }}
                            </v-chip>
                            <v-chip>
                                {{ new Date(Number(feedback.createdAt) * 1000).toLocaleString() }}
                            </v-chip>
                        </v-card-text>
                        <v-card-title class="font-weight-bold text-dark-blue text-truncate">
                            {{ feedback.title }}
                        </v-card-title>
                        <v-card-text class="text-content text-truncate text-truncate width">
                            {{ feedback.description }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Changelog View.
 * @description Display changes in a changelog view.
 */
import { db } from '@/firebase/init';
import { type Feedback, Status } from '@/types/index';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const liveFeedbacks = ref<Array<Feedback>>([]);
const loading = ref<boolean>(false);
const filteredByCreatedAtFeedbacs = (feedbacks: Array<Feedback>): Array<Feedback> =>
    feedbacks.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

const fetchLiveFeedbacks = async (): Promise<void> => {
    try {
        loading.value = true;
        const res = await db.collection('feedbacks').where('status', '==', Status.Live).get();
        liveFeedbacks.value = res.docs.map((doc) => doc.data() as Feedback);
    } catch (error: unknown) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const redirectToSuggestions = (): void => {
    router.push({ name: 'suggestions' });
};

onMounted(() => {
    fetchLiveFeedbacks();
});

</script>

<style scoped>
.width {
    width: 70vw;
    margin: 0 auto;
}

.min-height {
    min-height: calc(100vh - 64px);
}
</style>