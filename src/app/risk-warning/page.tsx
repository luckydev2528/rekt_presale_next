'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';

function getSafeReturnPath(value: string | null): string {
  if (!value) return '/';
  try {

    const url = new URL(value, 'http://local');
    return url.pathname + (url.search || '') + (url.hash || '');
  } catch {
    return '/';
  }
}

export default function RiskWarningPage() {
  const searchParams = useSearchParams();
  const countryRaw = searchParams.get('country');
  const returnRaw = searchParams.get('return');
  const country = (countryRaw || 'XX').toUpperCase();
  const returnPath = getSafeReturnPath(returnRaw);
  const ackHref = `/api/risk-ack?return=${encodeURIComponent(returnPath)}`;
  const t = useTranslations('gating');
  const flagClass = `fi fi-${country.toLowerCase()} fis`;
  let countryNote = '';
  try {
    // Only try to get country notes for valid countries, skip default XX
    if (country && country !== 'XX') {
      countryNote = t(`warningCountryNotes.${country}`, { default: '' });
    }
  } catch {
    countryNote = '';
  }

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl card-default relative">
        <div className="flex items-center gap-3 mb-4">
          <span className={`${flagClass} rounded-full`} style={{ width: '2.5rem', height: '2.5rem' }} aria-label={country} />
          <span className="text-sm text-gray-400">{country}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('warningTitle')}</h1>
        <p className="text-sm text-gray-300 mb-6">{t('warningIntro', {country})}</p>

        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-200">
          <li>{t('bullets.info')}</li>
          <li>{t('bullets.restrictions')}</li>
          <li>{t('bullets.continue')}</li>
        </ul>

        {countryNote && (
          <div className="mt-4 rounded-md bg-yellow-500/10 border border-yellow-500/30 p-3 text-yellow-200 text-sm">
            {countryNote}
          </div>
        )}

        <div className="flex items-center gap-3 mt-8">
          <Link href={returnPath} className="btn-secondary">{t('back')}</Link>
          <Link href={ackHref} className="btn-primary">{t('continue')}</Link>
        </div>
      </div>
    </main>
  );
}
