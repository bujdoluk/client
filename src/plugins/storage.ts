/**
 * @file Storage.
 * @description Firebase storage for images.
 */

import { ref } from 'vue';
import { auth, storage } from '@/firebase/init';

const user = ref(auth().currentUser);
const error = ref<string | null>(null);
const filePath = ref<string | null>(null);
const url = ref<string | null>(null);

const uploadImage = async (file: any): Promise<void> => {
    if (user.value) {
        filePath.value = `profilePictures/${user.value.uid}/${file.name}`;
    }
    try {
        if (filePath.value) {
            const res = await storage().ref(filePath.value).put(file);
            url.value = await res.ref.getDownloadURL();
        }
    } catch (error: any) {
        console.log(error);
        error.value = error;
    }
};

const deleteImage = async (path: any): Promise<void> => {
    try {
        await storage().ref(path).delete();
    } catch (error: any) {
        console.log(error);
        error.value = error;
    }
};

const getImage = async (): Promise<void> => {
    try {
        if (filePath.value) {
            await storage().ref(filePath.value).getDownloadURL();
        }
    } catch (error: any) {
        console.log(error);
        error.value = error;
    }
};

const useStorage = () => ({ deleteImage, error, filePath, getImage, uploadImage, url });

export { useStorage };

