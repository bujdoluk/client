/**
 * @file Feedback interface.
 */
export interface Feedback {
    category: string;
    comments: number;
    description: string;
    docId: string;
    status: string;
    title: string;
    upvotes: number;
    userId: string;
}
