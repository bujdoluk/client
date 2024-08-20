/**
 * @file I18n config.
 * @see https://vue-i18n.intlify.dev/.
 */
import { createI18n, type I18nOptions } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const options: I18nOptions = {
    availableLocales: ['English', 'Slovak'],
    fallbackLocale: 'English',
    legacy: false,
    locale: localStorage.getItem('lang') ?? 'English',
    messages
};

export default createI18n(options);

