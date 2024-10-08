/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @file Router config.
 * @see https://router.vuejs.org/.
 */
import { createRouter, createWebHistory, type RouteComponent, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';
import { auth } from '@/firebase/init';

const FeedbackDetailView = async (): Promise<RouteComponent> => import('@/views/FeedbackDetailView.vue');
const LandingPageView = async (): Promise<RouteComponent> => import('@/views/LandingPageView.vue');
const RoadmapView = async (): Promise<RouteComponent> => import('@/views/RoadmapView.vue');
const SuggestionsView = async (): Promise<RouteComponent> => import('@/views/SuggestionsView.vue');
const LogIn = async (): Promise<RouteComponent> => import('@/components/Auth/LogIn.vue');
const SignUp = async (): Promise<RouteComponent> => import('@/components/Auth/SignUp.vue');
const ErrorView = async (): Promise<RouteComponent> => import('@/views/ErrorView.vue');
const ChangelogView = async (): Promise<RouteComponent> => import('@/views/ChangelogView.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
                if (auth().currentUser === null) {
                    next({ name: 'errorView' });
                }
                next();
            },
            component: SuggestionsView,
            name: 'suggestions',
            path: '/suggestions'
        },
        {
            beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
                if (auth().currentUser === null) {
                    next({ name: 'errorView' });
                }
                next();
            },
            component: RoadmapView,
            name: 'roadmap',
            path: '/roadmap'
        },
        {
            component: LandingPageView,
            name: 'landing',
            path: '/'
        },
        {
            beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
                if (auth().currentUser === null) {
                    next({ name: 'errorView' });
                }
                next();
            },
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
        },
        {
            component: ErrorView,
            name: 'errorView',
            path: '/error'
        },
        {
            beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
                if (auth().currentUser === null) {
                    next({ name: 'errorView' });
                }
                next();
            },
            component: ChangelogView,
            name: 'changelog',
            path: '/changelog'
        }
    ]
});

export default router;
