'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {languages} from '@/i18n/languages';
import {useSearchParams} from 'next/navigation';
import {locales as supportedLocales, type Locale} from '@/locales';


const localeFlagMap: Record<string, string> = {
  en: 'us',
  es: 'es',
  zh: 'cn',
  'zh-Hant': 'tw',
  ja: 'jp',
  ko: 'kr',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ru: 'ru',
  ar: 'sa',
  hi: 'in',
  bn: 'bd',
  ur: 'pk',
  he: 'il',
  fa: 'ir',
  uk: 'ua',
  sr: 'rs',
  sw: 'tz',
  kk: 'kz',
  bg: 'bg',
  cs: 'cz',
  nl: 'nl',
  el: 'gr',
  hu: 'hu',
  id: 'id',
  pl: 'pl',
  ro: 'ro',
  sk: 'sk',
  sl: 'si',
  th: 'th',
  tr: 'tr',
  vi: 'vn',
};

const flagCodeFor = (locale: string) => localeFlagMap[locale] || 'us';


function getDisplayName(code: string): string {
  try {
    const DN = (Intl as typeof Intl & { DisplayNames?: unknown })?.DisplayNames;
    if (DN && typeof DN === 'function') {
      const dn = new (DN as new (locales: undefined, options: { type: string }) => { of: (code: string) => string | undefined })(undefined, { type: 'language' });
      return (dn.of(code) as string) || code;
    }
  } catch {}
  return code;
}

export default function Navigation() {
  const [activeLink, setActiveLink] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = useMemo(() => {
    if (pathname === '/') return true;

    return (supportedLocales as readonly string[]).some((l) => pathname === `/${l}`);
  }, [pathname]);

  const navItems = [
    { key: 'hero', type: 'anchor' as const },
    { key: 'tokenomics', type: 'anchor' as const },
    { key: 'lossClaim', type: 'route' as const, href: '/loss-claim' },
    { key: 'staking', type: 'route' as const, href: '/staking' },
    { key: 'leaderboard', type: 'anchor' as const },
    { key: 'team', type: 'anchor' as const },
    { key: 'roadmap', type: 'anchor' as const },
    { key: 'whitepaper', type: 'anchor' as const },
    { key: 'faq', type: 'anchor' as const }
  ];

  const router = useRouter();
  const locale = useLocale();
  const tNav = useTranslations('nav');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const searchParams = useSearchParams();
  const [hash, setHash] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash || '');
    }
  }, [pathname, searchParams]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {

        setTimeout(() => setIsLangOpen(false), 0);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isLangOpen]);

  const currentHref = useMemo(() => {
    const search = searchParams?.toString();
    return pathname + (search ? `?${search}` : '') + (hash || '');
  }, [pathname, searchParams, hash]);

  const localeList = useMemo(
    () => (supportedLocales as readonly string[]).map((code) => ({
      code,
      meta:
        (languages as Record<string, { name: string; nativeName: string; flag?: string; rtl?: boolean }>)[code] || {
          name: code.toUpperCase(),
          nativeName: getDisplayName(code),
          flag: '',
          rtl: false
        }
    })),
    []
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      try {
        const missingMeta = (supportedLocales as readonly string[]).filter((l) => !(l in languages));

        console.debug('[LangSwitch] entries:', localeList.length, 'supported:', (supportedLocales as readonly string[]).length);
        if (missingMeta.length) {

          console.debug('[LangSwitch] Missing metadata for locales:', missingMeta);
        }
      } catch {}
    }
  }, [localeList]);
  const handleLocaleChange = (code: Locale) => {

    let href = currentHref.replace(/\/[\[]locale\](?=\/|$)/gi, '');
    const re = new RegExp(`^/(${(supportedLocales as readonly string[])
      .map((l) => l.replace(/-/g, '\\-'))
      .join('|')})(?=/|$)`, 'i');
    href = href.replace(re, '');
    if (href === '') href = '/';
    router.replace(href, { locale: code });
    setIsLangOpen(false);
  };


  const normalizedPath = useMemo(() => {
    for (const l of supportedLocales as readonly string[]) {
      if (pathname === `/${l}`) return '/';
      if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
    }
    return pathname;
  }, [pathname]);


  useEffect(() => {
    if (normalizedPath.startsWith('/loss-claim')) {
      setActiveLink('lossClaim');
    } else if (normalizedPath.startsWith('/staking')) {
      setActiveLink('staking');
    } else if (normalizedPath === '/') {
      setActiveLink('hero');
    }
  }, [normalizedPath]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (key: string) => {
    const item = navItems.find((i) => i.key === key);
    if (!item) return;

    if (item.type === 'route' && item.href) {
      setActiveLink(key);
      router.push(item.href, { locale });
      return;
    }


    const targetId = key;
    if (isHome) {
      setActiveLink(key);
      setIsMobileMenuOpen(false);
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#' + targetId, { locale });
      }
      return;
    }
    router.push('/#' + targetId, { locale });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative">
          
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-60" />

          
          <div
            className="relative rounded-2xl border-2 border-cyan-400/40 backdrop-blur-lg"
            style={{
              background: '#05020a',
              boxShadow: '0 0 15px 3px rgba(0, 240, 255, 0.7)',
            }}
          >
            
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-30">
              <Image
                src="/assets/hero-section/navigation background.webp"
                alt="Navigation Background"
                fill
                className="object-cover"
              />
            </div>

            
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3">
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center relative">
                  <Image
                    src="/assets/hero-section/logocoin.webp"
                    alt="REKT Coin"
                    width={24}
                    height={24}
                    className="animate-pulse sm:w-8 sm:h-8"
                  />
                </div>
                <Image
                  src="/assets/hero-section/$rekt.webp"
                  alt="REKT Logo"
                  width={80}
                  height={24}
                  className="object-contain sm:w-[100px] sm:h-8"
                />
              </div>

              
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleLinkClick(item.key)}
                    className={`relative group flex flex-col items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:brightness-125 ${
                      activeLink === item.key ? 'text-white' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                    style={{
                      width: '90px',
                      height: '32px',
                      padding: 0,
                      border: 'none',
                      overflow: 'visible',
                    }}
                  >
                    
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        
                        <Image
                          src="/assets/hero-section/Tokenomics.svg"
                          alt=""
                          width={98}
                          height={30}
                          className={`w-full h-full object-contain transition-opacity duration-300 ${
                            activeLink === item.key ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                          }`}
                        />
                        
                        <Image
                          src="/assets/light_navbar.svg"
                          alt=""
                          width={98}
                          height={30}
                          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300 ${
                            activeLink === item.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                      <span className="relative z-10 font-bold text-white text-xs tracking-wider" style={{ transform: 'translateY(1px)' }}>
                        {tNav(item.key)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              
              <div className="flex items-center space-x-2">
                
                <div className="sm:hidden relative overflow-visible" ref={listRef}>
                  <button
                    onClick={() => setIsLangOpen((v) => !v)}
                    className="flex items-center space-x-2 transition-all hover:brightness-110"
                    style={{
                      background: '#000000',
                      border: '2px solid #ffffff',
                      color: '#ffffff',
                      borderRadius: '10px',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isLangOpen}
                    aria-label="Select language"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsLangOpen(true);
                
                        requestAnimationFrame(() => {
                          const first = listRef.current?.querySelector('[role="option"]') as HTMLElement | null;
                          first?.focus();
                        });
                      } else if (e.key === 'Escape') {
                        setIsLangOpen(false);
                      }
                    }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full overflow-hidden"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w40/${flagCodeFor(locale)}.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                      aria-label={`${locale.toUpperCase()} flag`}
                    />                    
                    <svg 
                      className={`w-3 h-3 text-white transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  
                  {isLangOpen && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-cyan-400/50 rounded-lg shadow-xl z-50"
                      role="listbox"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3">
                        <div className="text-xs text-gray-300 font-semibold mb-2 text-center">Select Language</div>
                        <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                          {localeList.map(({ code }) => (
                            <button
                              key={code}
                              role="option"
                              aria-selected={locale === code}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(currentHref, { locale: code as Locale });
                                setIsLangOpen(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  router.push(currentHref, { locale: code as Locale });
                                  setIsLangOpen(false);
                                } else if (e.key === 'Escape') {
                                  setIsLangOpen(false);
                                }
                              }}
                              className={`flex flex-col items-center p-1.5 rounded text-xs transition-all duration-200 ${
                                locale === code
                                  ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30'
                              }`}
                              tabIndex={0}
                            >
                              <div 
                                className="w-[18px] h-[13px] rounded-sm overflow-hidden mb-1"
                                style={{
                                  backgroundImage: `url(https://flagcdn.com/w36/${flagCodeFor(code)}.png)`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat'
                                }}
                                aria-label={`${code.toUpperCase()} flag`}
                              />
                              <span className="font-semibold">{code.toUpperCase()}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                
                <div className="hidden sm:block relative overflow-visible">
                  <button
                    onClick={() => setIsLangOpen((v) => !v)}
                    className="flex items-center space-x-2 transition-all hover:brightness-110"
                    style={{
                      background: '#000000',
                      border: '2px solid #ffffff',
                      color: '#ffffff',
                      borderRadius: '10px',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isLangOpen}
                    aria-label="Select language"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsLangOpen(true);
                
                        requestAnimationFrame(() => {
                          const first = listRef.current?.querySelector('[role="option"]') as HTMLElement | null;
                          first?.focus();
                        });
                      }
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full overflow-hidden"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w80/${flagCodeFor(String(locale))}.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                      aria-label={`${locale.toUpperCase()} flag`}
                    />

                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" style={{ strokeWidth: '2px' }} />
                    </svg>
                  </button>
                  {isLangOpen && (
                    <div
                      ref={listRef}
                      role="listbox"
                      aria-label="Languages"
                      className="absolute right-0 mt-2 w-52 max-h-80 overflow-auto rounded-lg border border-white/20 bg-black/80 backdrop-blur-md shadow-lg z-50 p-1"
                      onKeyDown={(e) => {
                        const options = Array.from(listRef.current?.querySelectorAll('[role="option"]') || []) as HTMLElement[];
                        const idx = options.findIndex((el) => el === document.activeElement);
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const next = options[idx + 1] || options[0];
                          next?.focus();
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const prev = options[idx - 1] || options[options.length - 1];
                          prev?.focus();
                        } else if (e.key === 'Escape') {
                          setIsLangOpen(false);
                        }
                      }}
                    >
                      {localeList.map(({ code, meta }) => (
                        <Link
                          key={code}
                          href={currentHref}
                          locale={code as Locale}
                          role="option"
                          aria-selected={code === locale}
                          tabIndex={0}
                          onClick={() => setIsLangOpen(false)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 rounded-md ${
                            code === locale ? 'bg-white/10' : ''
                          }`}
                        >
                          <div 
                            className="w-5 h-5 rounded-full overflow-hidden"
                            style={{
                              backgroundImage: `url(https://flagcdn.com/w40/${flagCodeFor(code)}.png)`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            }}
                            aria-label={`${code.toUpperCase()} flag`}
                          />
                          <span className="flex-1">
                            <span className="font-medium">{meta.nativeName}</span>
                            <span className="ml-2 text-xs opacity-70 uppercase">{code}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border-2 border-cyan-400/40 bg-purple-900/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:bg-purple-800/50 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/30"
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span
                      className={`bg-cyan-400 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                        isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                      }`}
                    />
                    <span
                      className={`bg-cyan-400 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                        isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <span
                      className={`bg-cyan-400 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                        isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 mt-2">
              <div className="relative">
                
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-60" />
                <div
                  className="relative rounded-2xl border-2 border-cyan-400/40 backdrop-blur-lg"
                  style={{ background: '#05020a', boxShadow: '0 0 15px 3px rgba(0, 240, 255, 0.7)' }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                    <Image
                      src="/assets/hero-section/navigation background.webp"
                      alt="Mobile Menu Background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative z-10 p-6 flex flex-col h-screen">
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                      {navItems.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleLinkClick(item.key)}
                          className={`text-lg font-primary tracking-wider px-4 py-2 transition-colors ${
                            activeLink === item.key ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                          }`}
                        >
                          <span className="font-bold text-xs tracking-wider">{tNav(item.key)}</span>
                        </button>
                      ))}
                      
                      
                      <div className="pt-6 border-t border-cyan-400/30 w-full">
                        <div className="flex flex-col items-center space-y-3">
                          <span className="text-sm text-gray-300 font-semibold tracking-wider">Language</span>
                          <div className="grid grid-cols-4 gap-3 max-w-xs">
                            {localeList.slice(0, 8).map(({ code }) => (
                              <button
                                key={code}
                                onClick={() => {
                                  router.push(currentHref, { locale: code as Locale });
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                                  locale === code
                                    ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30'
                                }`}
                              >
                                <div 
                                  className="w-5 h-4 rounded-sm overflow-hidden"
                                  style={{
                                    backgroundImage: `url(https://flagcdn.com/w40/${flagCodeFor(code)}.png)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                  }}
                                  aria-label={`${code.toUpperCase()} flag`}
                                />
                                <span className="text-xs mt-1 font-semibold">{code.toUpperCase()}</span>
                              </button>
                            ))}
                          </div>
                          {localeList.length > 8 && (
                            <details className="w-full">
                              <summary className="text-xs text-cyan-400 cursor-pointer hover:text-cyan-300 text-center list-none">
                                <span>Show More Languages ({localeList.length - 8})</span>
                              </summary>
                              <div className="grid grid-cols-4 gap-3 mt-3 max-w-xs mx-auto">
                                {localeList.slice(8).map(({ code }) => (
                                  <button
                                    key={code}
                                    onClick={() => {
                                      router.push(currentHref, { locale: code as Locale });
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                                      locale === code
                                        ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30'
                                    }`}
                                  >
                                    <div 
                                      className="w-5 h-4 rounded-sm overflow-hidden"
                                      style={{
                                        backgroundImage: `url(https://flagcdn.com/w40/${flagCodeFor(code)}.png)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                      }}
                                      aria-label={`${code.toUpperCase()} flag`}
                                    />
                                    <span className="text-xs mt-1 font-semibold">{code.toUpperCase()}</span>
                                  </button>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
