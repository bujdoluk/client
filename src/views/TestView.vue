<template>
    <div>{{ user?.email }}</div>
    <div>{{ user?.displayName }}</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { db, auth } from '@/firebase/init';

const user = ref(auth().currentUser);
const users = ref<Array<string>>();

export interface User {
    email: string;
    userName: string;
}

// const users = db.collection('users');
// const user = db.collection('users').doc(userId);
const userfeedbacks = db.collection('users').doc(user.value?.uid).collection('feedbacks');
const userComments = db.collection('users').doc(user.value?.uid).collection('comments');
const userUpvotes = db.collection('users').doc(user.value?.uid).collection('upvotes');

watch((user), async (): Promise<void> => {
    if (user.value !== null) {
        db.collection('users').doc(user.value.uid).set({
            email: user.value.email,
            userName: user.value.displayName
        } as User);
    }
});

</script>/