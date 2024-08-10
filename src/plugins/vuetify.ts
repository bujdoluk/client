/**
 * @file Vuetify config.
 * @see https://vuetifyjs.com/.
 */
import 'vuetify/styles';
import '@/styles/settings.scss';
import * as labs from 'vuetify/labs/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { createVuetify } from 'vuetify';
import i18n from '@/plugins/i18n';
import type { ThemeDefinition } from 'vuetify';
import { useI18n } from 'vue-i18n';

const feedbackApp: ThemeDefinition = {
    colors: {
        'background': '#F7F8FD',
        'background-primary': '#CDD2EE',
        'background-secondary': '#F2F4FF',
        'blue': '#4661E6',
        'blue-hover': '#7C91F9',
        'darkBlue': '#373F68',
        'darkBlue-hover': '#656EA3',
        'error': '#DB1F35',
        'info': '#1994C1',
        'purple': '#AD1FEA',
        'purple-hover': '#C75AF6',
        'purple-light': '#F3D5FF',
        'success': '#50B246',
        'warning': '#E68418',
        'white': '#FFFFFF'
    },
    dark: false
};

export default createVuetify(
    {
        components: { ...labs },
        defaults: {
            VBtn: {
                class: 'text-none font-weight-bold',
                elevation: 0,
                ripple: false,
                rounded: 'lg'
            },
            VCard: {
                elevation: 0,
                rounded: 'lg'
            },
            VCardText: {
                class: 'py-0 px-0'
            },
            VCardTitle: {
                class: 'pt-3 px-0'
            },
            VContainer: {
                class: 'pa-3'
            },
            VDialog: {
                transition: false
            },
            VDivider: {
                class: 'mx-4',
                inset: true,
                vertical: true
            },
            VSheet: {
                class: 'pa-3',
                color: 'white',
                rounded: true
            },
            VTabs: {
                class: 'bg-white pt-3',
                color: 'primary'
            },
            VTextField: {
                class: 'mb-1'
            }
        },
        icons: {
            aliases,
            defaultSet: 'mdi',
            sets: {
                mdi
            }
        },
        locale: {
            // @ts-expect-error bad i18n dts
            adapter: createVueI18nAdapter({ i18n, useI18n })
        },
        theme: {
            defaultTheme: 'feedbackApp',
            themes: {
                feedbackApp
            },
            variations: {
                colors: ['primary', 'secondary'],
                darken: 5,
                lighten: 5
            }
        }
    }
);
