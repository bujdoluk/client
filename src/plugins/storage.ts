/**
 * @file Storage.
 * @description Firebase storage for images.
 */

import { ref } from 'vue';
import { auth, storage } from '@/firebase/init';
import { handleError } from '@/plugins/error';

const user = ref(auth().currentUser);
const error = ref<string | null>(null);
const filePath = ref<string | null>(null);
const url = ref<string | null>(null);

const uploadImage = async (file: any): Promise<void> => {
    try {
        if (user.value) {
            filePath.value = `profilePictures/${user.value.uid}/${file[0].name}`;
            const res = await storage().ref(filePath.value).put(file);
            url.value = await res.ref.getDownloadURL();
        }
    } catch (error: any) {
        handleError(error);
        error.value = error;
    }
};

const deleteImage = async (path: any): Promise<void> => {
    try {
        await storage().ref(path).delete();
    } catch (error: any) {
        handleError(error);
        error.value = error;
    }
};

const getImage = async (): Promise<void> => {
    try {
        if (filePath.value) {
            await storage().ref(filePath.value).getDownloadURL();
        }
    } catch (error: any) {
        handleError(error);
        error.value = error;
    }
};

const useStorage = () => ({ deleteImage, error, filePath, getImage, uploadImage, url });

export { useStorage };

