'use client'

import Image from 'next/image'
import Navigation from '@/components/Layout/Navigation'
import Footer from '@/components/Footer'
import {useTranslations} from 'next-intl'

export default function StakingPage() {
  const t = useTranslations('staking')
  return (
    <div className="min-h-screen bg-[#1a0733] relative overflow-x-hidden">
      <Navigation />
      
      {}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {}
        <div className="relative mb-12">
          <div className="absolute inset-0 rounded-2xl border-2 border-[#e1fbfc] blur-[3px]" />
          <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#e1fbfc]/20">
            <div className="flex justify-center items-center mb-4">
              <Image 
                src="/assets/Rek Staking/Subtract.webp" 
                alt={t('header.alt')} 
                width={3000} 
                height={200}
                className="object-contain"
              />
            </div>
            <div className="absolute top-4 left-4">
              <Image 
                src="/assets/Rek Staking/Subtract.webp" 
                alt={t('header.logoAlt')} 
                width={40} 
                height={40}
                className="opacity-80"
              />
            </div>
          </div>
        </div>

        {}
        <p className="text-center text-white/90 text-lg mb-8 font-sans">{t('info')}</p>

        {}
        <div className="flex justify-center mb-16">
          <button className="relative group">
            <Image 
              src="/assets/Rek Staking/view leaderboard button.svg"
              alt={t('alts.viewLeaderboardImg')}
              width={200}
              height={60}
              className="transition-transform group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-wider">
              {t('buttons.viewLeaderboard')}
            </span>
          </button>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {}
          <div className="relative h-[260px]">
            <Image 
              src="/assets/Rek Staking/frame border.webp"
              alt={t('alts.frame')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between items-start p-8 py-8 pl-10">
              <h3 className="text-[#00ffff] text-base font-audiowide font-medium">{t('stats.yourStakedBalance')}</h3>
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <p className="text-white text-3xl font-audiowide font-bold">1,250,000 REKT</p>
                <div className="w-[90%] bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#8a2be2] to-[#00ffff] h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">{t('stats.unlockNote')}</p>
            </div>
          </div>

          {}
          <div className="relative h-[260px]">
            <Image 
              src="/assets/Rek Staking/frame border.webp"
              alt={t('alts.frame')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between items-start p-8 py-8 pl-10">
              <h3 className="text-[#00ffff] text-base font-audiowide font-medium">{t('stats.yourPoolShare')}</h3>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-4xl font-audiowide font-bold">0.85%</p>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">{t('stats.yourPoolShareDesc')}</p>
            </div>
          </div>

          {}
          <div className="relative h-[260px]">
            <Image 
              src="/assets/Rek Staking/frame border.webp"
              alt={t('alts.frame')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between items-start p-8 py-8 pl-10">
              <h3 className="text-[#00ffff] text-base font-audiowide font-medium">{t('stats.totalStaked')}</h3>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-2xl font-audiowide font-bold">150,000,000 REKT</p>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">{t('stats.totalStakedDesc')}</p>
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {}
          <div className="relative h-[220px]">
            <Image 
              src="/assets/Rek Staking/second frame border.webp"
              alt={t('alts.frame')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between items-start p-8 py-8 pl-10">
              <h3 className="text-[#00ffff] text-base font-audiowide font-medium">{t('stats.annualApy')}</h3>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-4xl font-audiowide font-bold">{t('stats.annualApyValue')}</p>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">{t('stats.annualApyDesc')}</p>
            </div>
          </div>

          {}
          <div className="relative h-[220px]">
            <Image 
              src="/assets/Rek Staking/second frame border.webp"
              alt={t('alts.frame')}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between items-start p-8 py-8 pl-10">
              <h3 className="text-[#00ffff] text-base font-audiowide font-medium">{t('stats.dailyRewards')}</h3>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white text-4xl font-audiowide font-bold">{t('stats.dailyRewardsValue')}</p>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">{t('stats.dailyRewardsDesc')}</p>
            </div>
          </div>
        </div>

        {}
        <div className="relative mb-12">
          <div className="relative h-[250px]">
            <Image 
              src="/assets/Rek Staking/long frame border.webp"
              alt={t('alts.longFrame')}
              fill
              className="object-cover"
            />
            
            {}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                >
                  <Image 
                    src="/assets/Rek Staking/logo spread in the long frame.webp" 
                    alt={t('alts.logoSpread')} 
                    width={24} 
                    height={24}
                    className="opacity-50 hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col justify-between items-center py-10">
              {}
              <h3 className="text-center text-[#00ffff] text-xl font-audiowide font-medium relative z-10">
                {t('rewards.title')}
              </h3>
              
              {}
              <p className="text-center text-white text-5xl font-audiowide font-bold relative z-10">
                15,640 REKT
              </p>
              
              {}
              <div className="flex justify-center relative z-10">
                <button className="relative group">
                  <Image 
                    src="/assets/Rek Staking/claim button.svg"
                    alt={t('alts.claimButton')}
                    width={120}
                    height={40}
                    className="transition-transform group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-wider">
                    {t('buttons.claim')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="text-center space-y-4">
          <p className="text-white/80 text-lg">{t('footer.notice')}</p>
          <p className="text-[#13d2e6]/60 text-sm">{t('footer.vestingNote')}</p>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) translateX(3px) rotate(5deg);
          }
          50% {
            transform: translateY(4px) translateX(-3px) rotate(-3deg);
          }
          75% {
            transform: translateY(-4px) translateX(6px) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
