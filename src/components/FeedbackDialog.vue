<template>
    <v-dialog 
        width="500"
        :transition="false"
        persistent
    >
    <template v-slot:activator="{ props }">
        <v-btn 
            v-bind="props" 
            text="Add Feedback"
            class="bg-btn-pink"
        >
        </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
        <v-form v-model="valid">
            <v-card title="Create New Feedback">
                <v-card-text class="py-0">
                    Feedback title
                </v-card-text>
                <v-card-text class="text-caption py-0 text-disabled">
                    Short description of the feedback
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        v-model="title"
                        label="Name"
                        required
                        density="compact"
                        variant="outlined"
                        :rules="[v => !!v || 'Name is required']"
                        class="bg-background-secondary"
                        hide-details
                        counter="45"
                    >
                    </v-text-field>
                </v-card-text>

                <v-card-text class="py-0">
                    Category
                </v-card-text>
                <v-card-text class="text-caption py-0 text-disabled">
                    Choose a category
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        v-model="category"
                        label="Category"
                        required
                        density="compact"
                        variant="outlined"
                        :rules="[v => !!v || 'Name is required']"
                        class="bg-background-secondary"
                    >
                    </v-text-field>
                </v-card-text>

                <v-card-text class="py-0">
                    Feedback detail
                </v-card-text>
                <v-card-text class="text-caption py-0 text-disabled">
                    Include any specific comments on what should be improved
                </v-card-text>
                <v-card-text>
                    <v-textarea 
                        v-model="detail"
                        variant="plain"
                        density="compact"
                        clearable
                        no-resize
                        rows="3"
                        class="bg-background-secondary"
                        rounded="5"
                    >
                    </v-textarea>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="Close Dialog"
                        class="bg-btn-black"
                        @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                        text="Add Feedback"
                        class="bg-btn-pink"
                        @click="isActive.value = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </template>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const valid = ref(false);
const title = ref('');
const category = ref('');
const detail = ref('');

</script>