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
const LogIn = async (): Promise<RouteComponent> => import('@/components/Auth/LogIn.vue');
const SignUp = async (): Promise<RouteComponent> => import('@/components/Auth/SignUp.vue');

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
        },
        {
            component: LogIn,
            name: 'login',
            path: '/login'
        },
        {
            component: SignUp,
            name: 'signup',
            path: '/signup'
        }
    ]
});

export default router;
