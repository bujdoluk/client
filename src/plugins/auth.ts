/**
 * @file Auth.
 * @description User authentification.
 */

import { ref } from 'vue';
import { auth } from '@/firebase/init';

const errorMessage = ref<string | null>(null);
const isPending = ref<boolean>(false);

const login = async (email: string, password: string) => {
    errorMessage.value = null;
    isPending.value = true;

    try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        errorMessage.value = (null);
        isPending.value = false;
        return res;
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const logout = async () => {
    errorMessage.value = (null);
    isPending.value = true;

    try {
        await auth().signOut();
        isPending.value = false;
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const signup = async (email: string, password: string, displayName: string) => {
    errorMessage.value = (null);
    isPending.value = true;

    try {
        const res = await auth().createUserWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error('Could not complete signup');
        }
        if (res.user) {
            await res.user.updateProfile({ displayName });
        }
        errorMessage.value = (null);
        isPending.value = false;

        return res;
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const useSignup = () => ({ errorMessage, isPending, signup });
const useLogin = () => ({ errorMessage, isPending, login });
const useLogout = () => ({ errorMessage, isPending, logout });

export { useLogin, useLogout, useSignup };
