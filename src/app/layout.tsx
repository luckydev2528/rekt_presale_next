import type { Metadata } from 'next'
import { Inter, Orbitron, Audiowide } from 'next/font/google'
import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import 'flag-icons/css/flag-icons.min.css'
import PageTransitionLoader from '@/components/Layout/PageTransitionLoader'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getLocale, getTranslations} from 'next-intl/server'
import {rtlLanguages} from '@/i18n/languages'
import SolanaProviders from '@/lib/wallet/SolanaProviders'
import {routing} from '@/i18n/routing'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const fallbackTitle = '$REKT - Only losers win';
  const fallbackDescription = 'Embrace the crash. The first memecoin that rewards your losses.';
  let title = fallbackTitle;
  let description = fallbackDescription;
  try {
    const t = await getTranslations('seo');
    title = t('title', { default: fallbackTitle });
    description = t('description', { default: fallbackDescription });
  } catch {}

  const languages = Object.fromEntries([
    ...routing.locales.map((l) => [l, l === routing.defaultLocale ? '/' : `/${l}`]),
    ['x-default', '/']
  ]);

  return {
    title,
    description,
    alternates: { languages },
    openGraph: {
      title,
      description,
      locale,
      siteName: '$REKT'
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image'
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRtl = (rtlLanguages as readonly string[]).includes(locale as string);
  const dir = isRtl ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} ${orbitron.variable} ${audiowide.variable} bg-background-main text-text-primary antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SolanaProviders>
            <PageTransitionLoader />
            {children}
          </SolanaProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
