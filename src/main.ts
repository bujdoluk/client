/**
 * @file Entry point of the application.
 */
import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';
import router from '@/router/index';
import vuetify from '@/plugins/vuetify';

createApp(App)
    .use(router)
    .use(i18n)
    .use(createPinia())
    .use(vuetify)
    .mount('#app');

