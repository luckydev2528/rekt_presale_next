import {NextRequest, NextResponse} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';
import {locales as supportedLocales} from '@/locales';


const WARNING = new Set([
  'US', 'IN', 'VN', 'TH', 'TR', 'NG', 'UA',
  'RS', 'BG', 'HU', 'CZ', 'SK', 'SI', 'PL'
]);

const BLOCKED = new Set([
  'RU', 'CN', 'BD', 'NP', 'BO', 'DZ', 'MA', 'QA', 'EG'
]);

const handleI18nRouting = createMiddleware({
  ...routing,
  localeDetection: false
});

function getMockCountry(req: NextRequest): string | undefined {

  const hdr = req.headers.get('x-mock-country')?.toUpperCase();
  if (hdr) return hdr;
  const url = req.nextUrl;
  const q = url.searchParams.get('mockCountry');
  return q ? q.toUpperCase() : undefined;
}


function getRealCountry(req: NextRequest): string | undefined {
  const h = req.headers;
  const fromGeo = (req as NextRequest & { geo?: { country?: string } }).geo?.country as string | undefined;
  const candidates = [
    fromGeo,
    h.get('x-vercel-ip-country') || undefined,
    h.get('cf-ipcountry') || undefined,
    h.get('x-country-code') || undefined,
    h.get('x-appengine-country') || undefined
  ];
  for (const c of candidates) {
    if (c && /^[A-Za-z]{2}$/.test(c)) return c.toUpperCase();
  }
  return undefined;
}

function deriveLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && supportedLocales.includes(first as (typeof supportedLocales)[number])) {
    return first;
  }
  return routing.defaultLocale;
}

export default function middleware(req: NextRequest) {
  // For static export, skip all geo-blocking and just handle i18n routing
  return handleI18nRouting(req);
}

export const config = {

  matcher: '/((?!api|trpc|_next|_vercel|.*\..*).*)'
};
