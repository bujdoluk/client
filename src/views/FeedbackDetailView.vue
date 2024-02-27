<template>
    <v-container
        fluid
        class="bg-background"
        width="100vw"
    >
        <v-row class="mx-auto row">
            <v-col>
                <v-btn
                    :prepend-icon="mdiChevronLeft"
                    variant="text"
                    density="compact"
                    @click="onRedirect"
                >
                    {{ t('buttons.goBack') }}
                </v-btn>
            </v-col>
            <v-spacer />
            <v-col>
                <EditFeedbackDialog />
            </v-col>
        </v-row>
        <v-row class="mx-auto row">
            <v-col>
                <v-card :min-height="130">
                    <v-container>
                        <v-row>
                            <v-col
                                class="align-top d-flex justify-center"
                                cols="2"
                            >
                                <v-btn
                                    stacked
                                    class="bg-btn-default text-caption"
                                    :prepend-icon="mdiChevronUp"
                                    density="compact"
                                    variant="tonal"
                                    flat
                                    size="40"
                                >
                                    {{ feedback.upvotes }}
                                </v-btn>
                            </v-col>
                            <v-col
                                class="pt-0"
                                cols="8"
                            >
                                <v-card>
                                    <v-card-title>
                                        {{ feedback.title }}
                                    </v-card-title>
                                    <v-card-text class="text-truncate width">
                                        {{ feedback.description }}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn 
                                            density="compact"
                                            variant="tonal"
                                            flat
                                        >
                                            {{ feedback.category }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col
                                class="align-center d-flex"
                                cols="2"
                            >
                                <v-icon :icon="mdiChat" />
                                {{ feedback.comments }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mx-auto row">
            <v-container>
                <v-row>
                    <v-col>
                        4 Comments
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        FOTO
                    </v-col>
                    <v-col>
                        Elijah Moss
                    </v-col>
                </v-row>
            </v-container>
        </v-row>

        <v-row class="mx-auto row">
            <v-container>
                <v-row>
                    <v-col>
                        {{ t('components.comment.addComment') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea 
                            :label="t('components.comment.typeComment')" 
                            :counter="250"
                            rows="2"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer />
                    <v-col>
                        <v-btn class="bg-purple">
                            {{ t('buttons.postComment') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>  

<script setup lang="ts">
/**
 * @file Feedback Detail View.
 */
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiChat, mdiChevronUp, mdiChevronLeft } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import router from '@/router';
import EditFeedbackDialog from '@/components/Dialogs/EditFeedbackDialog.vue';

const { t } = useI18n();

const feedback = ref<Feedback>({
    category: 'Feature',
    color: 'orange',
    comments: 5,
    description: 'Description 1',
    id: '1',
    status: 'Planned',
    title: 'Feedback 1',
    upvotes: 10
});

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

</script>

<style scoped>
.row {
    min-height: 113px;
    width: 60%;
}
.height{
    height: 70vh;
}

.width {
    max-width: 95%;
}
.cursor {
    cursor: pointer;
}
</style>