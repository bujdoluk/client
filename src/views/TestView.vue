<template>
    <div>{{ user?.email }}</div>
    <div>{{ user?.displayName }}</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { db, auth } from '@/firebase/init';

const user = ref(auth().currentUser);

export interface User {
    email: string;
    userName: string;
}

watch((user), async (): Promise<void> => {
    if (user.value !== null) {
        db.collection('users').doc(user.value.uid).set({
            email: user.value.email,
            userName: user.value.displayName
        } as User);
    }
});

</script>/