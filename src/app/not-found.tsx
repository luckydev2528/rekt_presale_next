import {Link} from '@/i18n/navigation'
import {getTranslations} from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <div className="min-h-screen bg-[#1a0733] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-audiowide text-[#00ffff] mb-4">404</h1>
        <h2 className="text-2xl font-audiowide text-white mb-6">{t('title')}</h2>
        <p className="text-gray-300 mb-8">{t('description')}</p>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#00ffff] text-white font-bold rounded-lg hover:scale-105 transition-transform"
          >
            {t('goHome')}
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link 
              href="/staking" 
              className="px-4 py-2 bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff] rounded-lg hover:bg-[#00ffff]/30 transition-colors"
            >
              {t('staking')}
            </Link>
            <Link 
              href="/loss-claim" 
              className="px-4 py-2 bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff] rounded-lg hover:bg-[#00ffff]/30 transition-colors"
            >
              {t('lossClaim')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
