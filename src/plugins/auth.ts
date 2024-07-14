/**
 * @file Auth.
 * @description User authentification.
 */

import { ref } from 'vue';
import { auth } from '@/firebase/init';

const error = ref<string>('');
const isPending = ref<boolean>(false);

const login = async (email: string, password: string): Promise<any> => {
    error.value = '';
    isPending.value = true;

    try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        error.value = '';
        isPending.value = false;
        return res;
    } catch(err: unknown) {
        error.value = 'Incorrect login credentials';
        isPending.value = false;
    }
};

const logout = async (): Promise<void> => {
    error.value = '';
    isPending.value = true;

    try {
        await auth().signOut();
        isPending.value = false;
    } catch(err: any) {
        error.value = err.message;
        isPending.value = false;
    }
};

const signup = async (email: string, password: string, displayName: string) => {
    error.value = '';
    isPending.value = true;

    try {
        const res = await auth().createUserWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error('Could not complete signup');
        }
        if (res.user) {
            await res.user.updateProfile({ displayName });
        }
        error.value = '';
        isPending.value = false;

        return res;
    } catch(err: any) {
        console.log(err.message);
        error.value = err.message;
        isPending.value = false;
    }
};

const useSignup = () => ({ error, isPending, signup });
const useLogin = () => ({ error, isPending, login });
const useLogout = () => ({ error, isPending, logout });

export { useLogin, useLogout, useSignup };
