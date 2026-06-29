/**
 * @file Typescript interfaces and enums.
 */
import type { firebase } from '@/firebase/init';

export interface Comment {
    createdAt: firebase.firestore.Timestamp;
    docId: string;
    email: string;
    feedbackId: string;
    picture: string;
    text: string;
    userId: string;
    userName: string;
}

export interface Reply {
    commentEmail: string;
    commentId: string;
    createdAt: firebase.firestore.Timestamp;
    docId: string;
    email: string;
    feedbackId: string;
    picture: string;
    text: string;
    userId: string;
    userName: string;
}

export interface Feedback {
    category: string;
    comments: number;
    createdAt: firebase.firestore.Timestamp;
    description: string;
    docId: string;
    pinned: boolean;
    status: string;
    title: string;
    upvotes: number;
    userId: string;
}

export interface FeedbackForm {
    category: string;
    description: string;
    status: string;
    title: string;
}

export enum Status {
    InProgress = 'In Progress',
    Live = 'Live',
    Planned = 'Planned'
}

export interface User {
    email: string;
    picture: string;
    userId: string;
    userName: string;
}
