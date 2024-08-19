/**
 * @file Feedback interface.
 */
export interface Feedback {
    category: string;
    comments: number;
    createdAt: any;
    description: string;
    docId: string;
    pinned: boolean;
    status: string;
    title: string;
    upvotes: number;
    userId: string;
}
