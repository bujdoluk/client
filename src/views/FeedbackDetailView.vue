<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row align="center" class="grid">
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
        <v-row align="center" class="grid">
            <v-card v-if="feedback" :min-height="90" class="cursor">
                <v-container>
                    <v-row class="pa-2">
                        <v-col
                            class="align-top d-flex justify-center"
                            cols="auto"
                        >
                            <v-btn
                                stacked
                                class="text-caption font-weight-bold"
                                color="darkBlue"
                                density="compact"
                                variant="tonal"
                                flat
                                size="40"
                            >
                                <v-icon :icon="mdiChevronUp">
                                </v-icon>
                                {{ feedback.upvotes }}
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-card>
                                <v-card-text class="font-weight-bold">
                                    {{ feedback.title }}
                                </v-card-text>
                                <v-card-text class="text-truncate width text-grey">
                                    {{ feedback.description }}
                                </v-card-text>
                                <v-card-actions>
                                    <Tag :category="feedback.category"/>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col
                            class="align-center d-flex font-weight-bold"
                            cols="auto"
                        >
                            <v-icon 
                                :icon="mdiChat" 
                                color="background-primary"
                                class="mr-2"
                            />
                            {{ feedback.comments }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-row>
        <v-row align="center" class="grid">
            <v-container>
                <v-row>
                    <v-col>
                        4 Comments
                    </v-col>
                </v-row>
                <v-card 
                    v-for="comment in userComments"
                    :key="comment.id"
                    class="pa-6"
                >
                    <v-row>
                        <v-col cols="auto">
                            {{ comment.image }}
                        </v-col>
                        <v-col cols="auto">
                            {{ comment.username }} {{ comment.email }}
                        </v-col>
                        <v-col cols="auto">
                            <v-btn>
                                Reply
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            {{ comment.text }}
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-row>

        <v-row class="grid">
            <v-container>
                <v-row>
                    <v-col>
                        {{ t('components.comment.addComment') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea 
                            v-model="comment"
                            :label="t('components.comment.typeComment')" 
                            :counter="250"
                            rows="2"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer />
                    <v-col>
                        <v-btn 
                            class="bg-purple"
                            @click="postComment"
                        >
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
import { type Comment } from '@/models/Comment';
import EditFeedbackDialog from '@/components/Dialogs/EditFeedback.vue';
import { ref, watch } from 'vue';
import { type Feedback } from '@/models/Feedback';
import comments from '@/database/comments.json';
import feeedbacks from '@/database/feedbacks.json';
import { mdiChat, mdiChevronUp } from '@mdi/js';
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n();
let userComments = ref<Array<Comment>>(comments);
const comment = ref<Comment>();
const feedbacks = ref<Array<Feedback>>(feeedbacks);
const feedback = ref<Feedback>();

const filterFeedback = (id: string): Feedback | undefined => {
    return feedbacks.value.filter((feedback) => {
        feedback.id === id
    });
}

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

const postComment = (): void => {
    userComments.value.push({
        id: "1",
        image: "LOL",
        text: "Prvy komment",
        email: "lukas@gmail.com",
        username: "Buky"
    });
}

watch(() => String(route.params.id), (): void => {
    console.log(route.params.id);
    feedback.value = filterFeedback(String(route.params.id));
});

</script>

<style scoped>
.cursor {
    cursor: pointer;
}

.grid {
    width: 70% !important;
    margin: 0 auto;
}
</style>