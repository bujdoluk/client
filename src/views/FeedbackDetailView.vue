<template>
    <v-container
        fluid
        class="bg-background"
        width="60vw"
    >
        <v-row align="center">
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
            <v-col cols="auto">
                <EditFeedbackDialog />
            </v-col>
        </v-row>
        <v-row align="center">
            Feedback component
        </v-row>
        <v-row align="center">
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
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft } from '@mdi/js';
import router from '@/router';
import EditFeedbackDialog from '@/components/Dialogs/EditFeedback.vue';

const { t } = useI18n();

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

</script>

<style scoped>
.cursor {
    cursor: pointer;
}
</style>