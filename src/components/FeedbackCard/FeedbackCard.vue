<template>
    <v-card
        class="bg-surface pa-6"
        :max-height="250"
        :min-height="250"
    >
        <v-row align="center">
            <v-col class="pb-3">
                <span :class="lineColorClass" />
                <v-card-text>
                    <span :class="statusColorClass" />
                    <span class="pl-2 text-content">{{ props.feedback.status }}</span>
                </v-card-text>
                <v-card-title 
                    class="cursor font-weight-bold pb-0 text-dark-blue" 
                    @click="onRedirect(feedback.docId)"
                >
                    {{ props.feedback.title }}
                </v-card-title>
                <v-card-text class="description-height text-body-2 text-content text-truncate-multiple">
                    {{ props.feedback.description }}
                </v-card-text>
                <v-card-text class="pt-6">
                    <TagItem :category="props.feedback.category" />
                </v-card-text>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col class="pt-0">
                <v-btn
                    color="blue"
                    :variant="upvoteVariant"
                    @click.stop="onVote"
                >
                    <v-icon :icon="mdiChevronUp" />
                    {{ props.feedback.upvotes }}
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-icon 
                    :icon="mdiChat" 
                    color="background-primary"
                    class="mr-2"
                />
                <span class="font-weight-bold text-dark-blue">
                    {{ props.feedback.comments }}
                </span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
/**
 * @file FeedbackCard component.
 * @description Card displaying a single feedback item with upvote button and comment count.
 */
import { computed, shallowRef } from 'vue';
import { mdiChat, mdiChevronUp } from '@mdi/js';
import { type Feedback, Status } from '@/types/index.ts';
import TagItem from '@/components/TagItem/TagItem.vue';
import router from '@/router';

const props = defineProps<{
    feedback: Feedback;
}>();

const isActiveVote = shallowRef(false);
const upvoteVariant = computed<'flat' | 'tonal'>(() => (isActiveVote.value ? 'flat' : 'tonal'));

const onVote = (): void => {
    isActiveVote.value = !isActiveVote.value;
};

const onRedirect = async (id?: string): Promise<void> => {
    await router.push({ name: 'feedback-detail', params: { id } });
};

const statusColors = (status: string): string | undefined => {
    if (status === Status.Planned) {
        return 'dot-orange';
    } else if (status === Status.InProgress) {
        return 'dot-pink';
    }
    return 'dot-teal';
};

const lineColors = (status: string): string | undefined => {
    if (status === Status.Planned) {
        return 'top-line-orange';
    } else if (status === Status.InProgress) {
        return 'top-line-purple';
    }
    return 'top-line-teal';
};

const statusColorClass = computed<string | undefined>(() => statusColors(props.feedback.status));
const lineColorClass = computed<string | undefined>(() => lineColors(props.feedback.status));

</script>

<style scoped>
.description-height {
    height: 44px;
    line-height: 1.1
}

.text-truncate-multiple {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    white-space: normal;
}

.top-line-orange {
    border: 4px solid #F49F85;
    position: absolute;
    top: 0;
    left: -10px;
    width: 110%;
}

.top-line-purple {
    border: 4px solid #AD1FEA;
    position: absolute;
    width: 110%;
    top: 0;
    left: -10px;
}

.top-line-teal {
    border: 4px solid #62BCFA;
    position: absolute;
    width: 110%;
    top: 0;
    left: -10px;
}
</style>