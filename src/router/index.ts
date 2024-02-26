/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @file Router config.
 * @see https://router.vuejs.org/.
 */
import { createRouter, createWebHistory, type RouteComponent } from 'vue-router';

const FeedbackDetailView = async (): Promise<RouteComponent> => import('@/views/FeedbackDetailView.vue');
const LandingView = async (): Promise<RouteComponent> => import('@/views/LandingView.vue');
const RoadmapView = async (): Promise<RouteComponent> => import('@/views/RoadmapView.vue');
const SuggestionsView = async (): Promise<RouteComponent> => import('@/views/SuggestionsView.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            component: SuggestionsView,
            name: 'suggestions',
            path: '/suggestions'
        },
        {
            component: RoadmapView,
            name: 'roadmap',
            path: '/roadmap'
        },
        {
            component: LandingView,
            name: 'landing',
            path: '/'
        },
        {
            component: FeedbackDetailView,
            name: 'feedback-detail',
            path: '/suggestions/:id'
        }
    ]
});

export default router;
