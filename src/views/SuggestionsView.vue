<template>
    <v-container
        class="bg-background"
        fluid
    >
        <v-row class="grid">
            <v-col
                cols="3"
                xxl="3"
                xl="3"
                lg="3"
                md="3"
                sm="12"
            >
                <v-container>
                    <v-row align="center">
                        <v-col>
                            <FrontendMentorBox />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <TagsBox :categories="categories" />
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <RoadmapBox
                                v-if="feedbacks"
                                :feedbacks="feedbacks"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col
                cols="9"
                xxl="9"
                xl="9"
                lg="9"
                md="9"
                sm="12"
            >
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card class="bg-darkBlue">
                                <v-container>
                                    <v-row align="center">
                                        <v-col cols="1">
                                            <v-icon :icon="mdiLightbulbOnOutline" />
                                        </v-col>
                                        <v-col cols="2">
                                            {{ feedbacks.length }} {{ t('views.suggestions.topbar.suggestions') }}
                                        </v-col>
                                        <v-col cols="4">
                                            <span class="text-caption">
                                                {{ t('views.suggestions.topbar.sortBy') }}
                                            </span>
                                            <v-select
                                                :items="items"
                                                variant="solo"
                                                density="compact"
                                            />
                                        </v-col>
                                        <v-spacer />
                                        <v-col>
                                            <AddFeedbackDialog />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row
                        v-for="feedback in feedbacks"
                        :key="feedback.id"
                        class="cursor"
                    >
                        <FeedbackComponent
                            v-if="feedbacks.length > 0"
                            :feedback="feedback"
                            @click="onRedirect('feedback-detail', feedback.id)"
                        />
                        <EmptyFeedbackComponent v-else />
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Suggestions View.
 */
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiLightbulbOnOutline } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import AddFeedbackDialog from '@/components/Dialogs/AddFeedbackDialog.vue';
import FeedbackComponent from '@/components/Feedback/FeedbackComponent.vue';
import FrontendMentorBox from '@/components/FrontendMentorBox/FrontendMentorBox.vue';
import RoadmapBox from '@/components/RoadmapBox/RoadmapBox.vue';
import TagsBox from '@/components/TagsBox/TagsBox.vue';
import EmptyFeedbackComponent from '@/components/Feedback/EmptyFeedbackComponent.vue';
import feeedbacks from '@/database/feedbacks.json';

const { t } = useI18n();

const feedbacks = ref<Array<Feedback>>(feeedbacks);

const categories = computed(() => feedbacks.value.map((feedback) => feedback.category));

const items = [
    { title: t('views.suggestions.topbar.mostUpvotes') },
    { title: t('views.suggestions.topbar.leastUpvotes') },
    { title: t('views.suggestions.topbar.mostComments') },
    { title: t('views.suggestions.topbar.leastComments') }
];

</script>

<style scoped>
.special-background {
    background: rgb(96, 81, 231);
    background: radial-gradient(circle, rgba(96, 81, 231, 1) 10%, rgba(171, 33, 234, 1) 45%, rgba(244, 159, 133, 1) 100%);
}

.dot-orange {
    height: 10px;
    width: 10px;
    background-color: #F49F85;
    border-radius: 50%;
    display: inline-flex;
}

.dot-pink {
    height: 10px;
    width: 10px;
    background-color: #AD1FEA;
    border-radius: 50%;
    display: inline-flex;
}

.dot-teal {
    height: 10px;
    width: 10px;
    background-color: #62BCFA;
    border-radius: 50%;
    display: inline-flex;
}

.grid {
    width: 70% !important;
    margin: 0 auto;
}
</style>