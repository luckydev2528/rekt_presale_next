import {defineRouting} from 'next-intl/routing';
import {locales as supportedLocales} from '@/locales';

export const routing = defineRouting({

  locales: Array.from(supportedLocales as readonly string[]),

  defaultLocale: 'en',

  localePrefix: 'as-needed'
});
