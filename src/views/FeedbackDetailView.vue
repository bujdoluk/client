<template>
    <v-container
        fluid
        class="bg-background"
    >
        <v-row
            align="center"
            class="grid"
        >
            <v-col>
                <v-btn
                    :prepend-icon="mdiChevronLeft"
                    variant="text"
                    color="blue"
                    density="compact"
                    class="font-weight-bold"
                    @click="onRedirect"
                >
                    {{ t('buttons.back') }}
                </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <EditFeedback 
                    v-if="feedback"
                    :feedback="feedback"
                    @edited="onEdited"
                    @deleted="onDeleted" 
                />
            </v-col>
        </v-row>
        <v-row class="grid">
            <v-col>
                <v-card
                    :min-height="90"
                    class="cursor"
                >
                    <v-container>
                        <v-row class="pa-2">
                            <v-col
                                class="align-top d-flex justify-center"
                                cols="auto"
                            >
                                <v-btn
                                    stacked
                                    class="font-weight-bold text-caption"
                                    color="blue"
                                    density="compact"
                                    variant="tonal"
                                    flat
                                    size="40"
                                >
                                    <v-icon :icon="mdiChevronUp" />
                                    {{ feedback?.upvotes }}
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-card>
                                    <v-card-text class="font-weight-bold">
                                        {{ feedback?.title }}
                                    </v-card-text>
                                    <v-card-text class="text-grey text-truncate width">
                                        {{ feedback?.description }}
                                    </v-card-text>
                                    <v-card-actions>
                                        <Tag :category="feedback?.category" />
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-spacer />
                            <v-col
                                class="align-center d-flex font-weight-bold"
                                cols="auto"
                            >
                                <v-icon 
                                    :icon="mdiChat" 
                                    color="background-primary"
                                    class="mr-2"
                                />
                                {{ feedback?.comments }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            align="center"
            class="grid"
        >
            <v-card
                v-if="feedback"
                :min-height="90"
                class="cursor"
            >
                <v-container>
                    <v-row class="pa-2">
                        <v-col
                            class="align-top d-flex justify-center"
                            cols="auto"
                        >
                            <v-btn
                                stacked
                                class="font-weight-bold text-caption"
                                color="darkBlue"
                                density="compact"
                                variant="tonal"
                                flat
                                size="40"
                            >
                                <v-icon :icon="mdiChevronUp" />
                                {{ feedback.upvotes }}
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-card>
                                <v-card-text class="font-weight-bold">
                                    {{ feedback.title }}
                                </v-card-text>
                                <v-card-text class="text-grey text-truncate width">
                                    {{ feedback.description }}
                                </v-card-text>
                                <v-card-actions>
                                    <Tag :category="feedback.category" />
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-spacer />
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
        <v-row
            align="center"
            class="grid"
        >
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
                        <v-col>
                            <v-container>
                                <v-row class="font-weight-bold">
                                    {{ comment.username }}
                                </v-row>
                                <v-row class="pb-3 text-body-2 text-grey">
                                    {{ comment.email }}
                                </v-row>
                                <v-row class="text-body-2 text-grey">
                                    {{ comment.text }}
                                </v-row>
                            </v-container>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn
                                variant="text"
                                color="blue"
                                class="font-weight-bold"
                            >
                                {{ t('buttons.reply') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card 
                    v-for="comment in userComments"
                    :key="comment.id"
                    class="pa-6"
                >
                    <v-row>
                        <v-col cols="auto">
                            {{ comment.image }}
                        </v-col>
                        <v-col>
                            <v-container>
                                <v-row class="font-weight-bold">
                                    {{ comment.username }}
                                </v-row>
                                <v-row class="pb-3 text-body-2 text-grey">
                                    {{ comment.email }}
                                </v-row>
                                <v-row class="text-body-2 text-grey">
                                    {{ comment.text }}
                                </v-row>
                            </v-container>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn
                                variant="text"
                                color="blue"
                                class="font-weight-bold"
                            >
                                {{ t('buttons.reply') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-row>
        <v-row class="grid">
            <v-container fluid>
                <v-card class="pa-6">
                    <v-card-text class="font-weight-bold py-3 text-h6">
                        {{ t('components.comment.addComment') }}
                    </v-card-text>
                    <v-card-text>
                        <v-textarea 
                            v-model="comment"
                            :placeholder="t('components.comment.typeComment')" 
                            :counter="250"
                            rows="2"
                            bg-color="background"
                            variant="solo-filled"
                            flat
                        />
                    </v-card-text>
                    <v-card-actions class="pt-3">
                        <v-spacer />
                        <v-btn 
                            variant="flat"
                            color="purple"
                            @click="postComment"
                        >
                            {{ t('buttons.post') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-row>
    </v-container>
</template>  

<script setup lang="ts">
/**
 * @file Feedback Detail View.
 */
import { useI18n } from 'vue-i18n';
import { mdiChevronLeft, mdiChat, mdiChevronUp } from '@mdi/js';
import router from '@/router';
import { type Comment } from '@/models/Comment';
import EditFeedback from '@/components/Dialogs/EditFeedback.vue';
import Tag from '@/components/Tag/Tag.vue';
import { ref, watch, onMounted } from 'vue';
import { type Feedback } from '@/models/Feedback';
import { useRoute } from 'vue-router';
import { db } from '@/firebase/init';
import { useAppStore } from '@/stores/useAppStore';

const appStore = useAppStore();
const route = useRoute();
const { t } = useI18n();
const userComments = ref<Array<Comment>>([]);
const comment = ref<Comment>();
const feedback = ref<Feedback>();

const onRedirect = (): void => {
    router.push({ name: 'suggestions' });
};

const postComment = (): void => {
    try {
        appStore.isLoading = true;
        db.collection('comments').add({
            email: 'lukas',
            image: 'LOL',
            text: 'skusobny',
            userName: 'lukas'
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
        userComments.value.push({
            email: 'lukas@gmail.com',
            id: '1',
            image: 'LOL',
            text: String(comment.value),
            username: 'Buky'
        }); 
    }
};

const fetchFeedback = async (feedbackID: string): Promise<void> => {
    try {
        appStore.isLoading = true;
        const res = await db
            .collection('feedbacks')
            .doc(feedbackID)
            .get();
        
        feedback.value = res.data() as Feedback;
    } catch (error: unknown) {
        console.log(error);
    } finally {
        appStore.isLoading = false;
    }
};

const onEdited = (): void => {
    fetchFeedback(String(route.params.id)); 
};

const onDeleted = (): void => {
    router.push({ name: 'suggestions' });
};

onMounted(() => {
    fetchFeedback(String(route.params.id)); 
});

watch(() => String(route.params.id), (): void => {
    console.log(route.params.id);
});

</script>

<style scoped>
.grid {
    width: 70% !important;
    margin: 0 auto;
}
</style>