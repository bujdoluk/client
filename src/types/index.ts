/**
 * @file Typescript interfaces and enums.
 */
export interface Comment {
    createdAt: string;
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
    createdAt: string;
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
    createdAt: string;
    description: string;
    docId: string;
    pinned: boolean;
    status: string;
    title: string;
    upvotes: number;
    userId: string;
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
