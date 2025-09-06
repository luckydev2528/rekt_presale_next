import { getRequestConfig } from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';

import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import zhHant from './locales/zh-Hant.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import ur from './locales/ur.json';
import he from './locales/he.json';
import fa from './locales/fa.json';
import uk from './locales/uk.json';
import sr from './locales/sr.json';
import sw from './locales/sw.json';
import kk from './locales/kk.json';
import bg from './locales/bg.json';
import cs from './locales/cs.json';
import nl from './locales/nl.json';
import el from './locales/el.json';
import hu from './locales/hu.json';
import id from './locales/id.json';
import pl from './locales/pl.json';
import ro from './locales/ro.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import th from './locales/th.json';
import tr from './locales/tr.json';
import vi from './locales/vi.json';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (isPlainObject(v) && isPlainObject(out[k])) {
      out[k] = deepMerge(out[k] as Record<string, unknown>, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export default getRequestConfig(async ({requestLocale}) => {

  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? (requested as string)
    : routing.defaultLocale;


  const messagesMap: Record<string, Record<string, unknown>> = {
    en: en as Record<string, unknown>,
    es: es as Record<string, unknown>,
    zh: zh as Record<string, unknown>,
    'zh-Hant': zhHant as Record<string, unknown>,
    ja: ja as Record<string, unknown>,
    ko: ko as Record<string, unknown>,
    fr: fr as Record<string, unknown>,
    de: de as Record<string, unknown>,
    it: it as Record<string, unknown>,
    pt: pt as Record<string, unknown>,
    ru: ru as Record<string, unknown>,
    ar: ar as Record<string, unknown>,
    hi: hi as Record<string, unknown>,
    bn: bn as Record<string, unknown>,
    ur: ur as Record<string, unknown>,
    he: he as Record<string, unknown>,
    fa: fa as Record<string, unknown>,
    uk: uk as Record<string, unknown>,
    sr: sr as Record<string, unknown>,
    sw: sw as Record<string, unknown>,
    kk: kk as Record<string, unknown>,
    bg: bg as Record<string, unknown>,
    cs: cs as Record<string, unknown>,
    nl: nl as Record<string, unknown>,
    el: el as Record<string, unknown>,
    hu: hu as Record<string, unknown>,
    id: id as Record<string, unknown>,
    pl: pl as Record<string, unknown>,
    ro: ro as Record<string, unknown>,
    sk: sk as Record<string, unknown>,
    sl: sl as Record<string, unknown>,
    th: th as Record<string, unknown>,
    tr: tr as Record<string, unknown>,
    vi: vi as Record<string, unknown>
  };

  const base = en as Record<string, unknown>;
  const selected = (messagesMap[locale] ?? {}) as Record<string, unknown>;
  const messages = deepMerge(base, selected);

  return {
    locale,
    messages
  };
});

