
export const languages = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  'zh-Hant': { name: 'Traditional Chinese', nativeName: '繁體中文', flag: '🇹🇼', rtl: false },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', rtl: false },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true },
  fa: { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true },
  uk: { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', rtl: false },
  sr: { name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', rtl: false },
  sw: { name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', rtl: false },
  kk: { name: 'Kazakh', nativeName: 'Қазақ тілі', flag: '🇰🇿', rtl: false },
  bg: { name: 'Bulgarian', nativeName: 'български', flag: '🇧🇬', rtl: false },
  cs: { name: 'Czech', nativeName: 'čeština', flag: '🇨🇿', rtl: false },
  nl: { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false },
  el: { name: 'Greek', nativeName: 'ελληνικά', flag: '🇬🇷', rtl: false },
  hu: { name: 'Hungarian', nativeName: 'magyar', flag: '🇭🇺', rtl: false },
  id: { name: 'Indonesian', nativeName: 'Indonesia', flag: '🇮🇩', rtl: false },
  pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', rtl: false },
  ro: { name: 'Romanian', nativeName: 'română', flag: '🇷🇴', rtl: false },
  sk: { name: 'Slovak', nativeName: 'slovenský', flag: '🇸🇰', rtl: false },
  sl: { name: 'Slovenian', nativeName: 'slovenščina', flag: '🇸🇮', rtl: false },
  th: { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
} as const;

export const rtlLanguages = ['ar', 'he', 'ur'] as const;
export const defaultLocale = 'en' as const;

export type LanguageKey = keyof typeof languages;
