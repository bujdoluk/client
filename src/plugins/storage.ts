/**
 * @file Storage.
 * @description Firebase storage for images.
 */

import { type Ref, ref } from 'vue';
import { auth, storage } from '@/firebase/init';
import { handleError } from '@/plugins/error';

const filePath = ref<string | null>(null);
const url = ref<string | null>(null);

const uploadImage = async (file: File): Promise<void> => {
    const { currentUser } = auth();
    if (!currentUser) throw new Error('User not authenticated');
    url.value = null;
    filePath.value = `profilePictures/${currentUser.uid}/${file.name}`;
    const snapshot = await storage().ref(filePath.value).put(file);
    url.value = await snapshot.ref.getDownloadURL();
};

const deleteImage = async (path: string): Promise<void> => {
    try {
        await storage().ref(path).delete();
    } catch (err: unknown) {
        handleError(err);
    }
};

const getImage = async (): Promise<string | null> => {
    try {
        if (filePath.value) {
            url.value = await storage().ref(filePath.value).getDownloadURL();
            return url.value;
        }
        return null;
    } catch (err: unknown) {
        handleError(err);
        return null;
    }
};

interface UseStorage {
    deleteImage: (path: string) => Promise<void>;
    getImage: () => Promise<string | null>;
    uploadImage: (file: File) => Promise<void>;
    url: Ref<string | null>;
}

const useStorage = (): UseStorage => ({ deleteImage, getImage, uploadImage, url });

export { useStorage };

