/**
 * @file Auth.
 * @description Firebase user authentification.
 */

import { ref } from 'vue';
import { auth, firebase } from '@/firebase/init';

const errorMessage = ref<string | null>(null);
const isPending = ref<boolean>(false);

const login = async (email: string, password: string): Promise<void> => {
    errorMessage.value = null;
    isPending.value = true;

    try {
        await auth().signInWithEmailAndPassword(email, password);
        errorMessage.value = (null);
        isPending.value = false;
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const logout = async (): Promise<void> => {
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

const signup = async (email: string, password: string, displayName: string): Promise<void> => {
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
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const skipAuth = async (): Promise<void> => {
    errorMessage.value = (null);
    isPending.value = true;

    try {
        await auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth().signInAnonymously();
        errorMessage.value = (null);
        isPending.value = false;
    } catch(error: any) {
        errorMessage.value = error.message;
        isPending.value = false;
    }
};

const useSignup = () => ({ errorMessage, isPending, signup });
const useLogin = () => ({ errorMessage, isPending, login });
const useLogout = () => ({ errorMessage, isPending, logout });
const useSkipAuth = () => ({ errorMessage, isPending, skipAuth });

export { useLogin, useLogout, useSignup, useSkipAuth };
