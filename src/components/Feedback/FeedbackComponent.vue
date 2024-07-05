<template>
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
                            class="text-caption"
                            color="background-primary"
                            :prepend-icon="mdiChevronUp"
                            density="compact"
                            variant="tonal"
                            flat
                            size="40"
                        >
                            {{ props.feedback.upvotes }}
                        </v-btn>
                    </v-col>
                    <v-col
                        class="pt-0"
                        cols="8"
                    >
                        <v-card>
                            <v-card-title class="font-weight-bold">
                                {{ props.feedback.title }}
                            </v-card-title>
                            <v-card-text class="text-truncate width">
                                {{ props.feedback.description }}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn 
                                    density="compact"
                                    variant="tonal"
                                    flat
                                    color="background-primary"
                                >
                                    {{ props.feedback.category }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col
                        class="align-center d-flex"
                        cols="2"
                    >
                        <v-icon 
                            :icon="mdiChat" 
                            color="background-primary"
                            class="mr-2"
                        />
                        {{ props.feedback.comments }}
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
/**
 * @file Feedback component.
 */
import { mdiChat, mdiChevronUp } from '@mdi/js';
import type { Feedback } from '@/models/Feedback';

const props = defineProps<{
    feedback: Feedback;
}>();

</script>