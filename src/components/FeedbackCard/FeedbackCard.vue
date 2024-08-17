<template>
    <v-card
        class="bg-white pa-6"
        max-height="250px"
        min-height="250px"
    >
        <v-row align="center">
            <v-col class="pb-3">
                <span :class="lineColors(props.feedback.status)" />
                <v-card-text>
                    <span :class="statusColors(props.feedback.status)" /> 
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
                    <Tag :category="props.feedback.category" />
                </v-card-text>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col class="pt-0">
                <v-btn 
                    color="blue"
                    variant="tonal"
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
 */
import { mdiChat, mdiChevronUp } from '@mdi/js';
import { type Feedback } from '@/models/Feedback';
import Tag from '@/components/Tag/Tag.vue';
import router from '@/router';
import { Status } from '@/models/Status';

const props = defineProps<{
    feedback: Feedback;
}>();

const onRedirect = (id?: string): void => {
    router.push({ name: 'feedback-detail', params: { id } });
};

const statusColors = (status: string) => {
    if (status === Status.Planned) {
        return 'dot-orange';
    } else if (status === Status.InProgress) {
        return 'dot-pink';
    } else if (status === Status.Live) {
        return 'dot-teal';
    }
};

const lineColors = (status: string) => {
    if (status === Status.Planned) {
        return 'top-line-orange';
    } else if (status === Status.InProgress) {
        return 'top-line-purple';
    } else if (status === Status.Live) {
        return 'top-line-teal';
    }
};

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
    -webkit-line-clamp: 3;
    white-space: normal;
}

.top-line-orange {
    border: 4px solid #F49F85;
    position: absolute;
    width: 110%;
    top: 0;
    left: -10px;
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