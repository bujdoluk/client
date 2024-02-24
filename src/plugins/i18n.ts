/**
 * @file I18n config.
 * @see https://vue-i18n.intlify.dev/.
 */
import { createI18n, type I18nOptions } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const options: I18nOptions = {
    locale: 'en',
    messages
};

export default createI18n(options);

