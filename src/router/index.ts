/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * @file Router config.
 * @see https://router.vuejs.org/.
 */
import { createRouter, createWebHistory, type RouteComponent, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';
import { auth } from '@/firebase/init';

const FeedbackDetailView = async (): Promise<RouteComponent> => import('@/views/FeedbackDetailView.vue');
const LandingPageView = async (): Promise<RouteComponent> => import('@/views/LandingPage/LandingPageView.vue');
const RoadmapView = async (): Promise<RouteComponent> => import('@/views/RoadmapView.vue');
const SuggestionsView = async (): Promise<RouteComponent> => import('@/views/SuggestionsView.vue');
const LogIn = async (): Promise<RouteComponent> => import('@/components/Auth/LogIn.vue');
const SignUp = async (): Promise<RouteComponent> => import('@/components/Auth/SignUp.vue');
const ErrorView = async (): Promise<RouteComponent> => import('@/views/ErrorView.vue');
const ChangelogView = async (): Promise<RouteComponent> => import('@/views/ChangelogView.vue');
const TermsOfUseView = async (): Promise<RouteComponent> => import('@/views/TermsOfUseView.vue');
const GdprView = async (): Promise<RouteComponent> => import('@/views/GdprView.vue');
const PrivacyPolicyView = async (): Promise<RouteComponent> => import('@/views/PrivacyPolicyView.vue');

const authReady = new Promise((resolve) => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
    });
});

const authGuard = async (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
    await authReady;
    if (auth().currentUser === null) {
        next({ name: 'errorView' });
    } else {
        next();
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            beforeEnter: authGuard,
            component: SuggestionsView,
            name: 'suggestions',
            path: '/suggestions'
        },
        {
            beforeEnter: authGuard,
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
            beforeEnter: authGuard,
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
            component: TermsOfUseView,
            name: 'terms',
            path: '/terms'
        },
        {
            component: GdprView,
            name: 'gdpr',
            path: '/gdpr'
        },
        {
            component: PrivacyPolicyView,
            name: 'privacy',
            path: '/privacy'
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'errorView' }
        },
        {
            beforeEnter: authGuard,
            component: ChangelogView,
            name: 'changelog',
            path: '/changelog'
        }
    ]
});

export default router;
