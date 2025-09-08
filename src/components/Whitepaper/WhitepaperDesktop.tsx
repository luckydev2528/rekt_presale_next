import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function WhitepaperSection() {
  const t = useTranslations('sections')
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent to-purple-900/10">
      
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <Image src="/assets/Whitepaper/neonborderframe.svg" alt="Section Frame" fill className="object-contain" />
      </div>

      <div className="container relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-primary font-bold leading-tight">
            {t('whitepaper.title')}
          </h2>
          <p className="text-gray-300 mt-3 text-lg">{t('whitepaper.subtitle')}</p>
          <p className="text-sm text-gray-400">{t('whitepaper.description')}</p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          
          <div className="relative w-full max-w-md mx-auto min-h-[640px]">
            <Image
              src="/assets/Whitepaper/border%20of%20white%20paper.webp"
              alt="Whitepaper Card Border"
              fill
              className="object-contain pointer-events-none select-none"
            />
            <div className="relative pt-28 px-10 pb-10 flex flex-col items-center text-center">
              <Image src="/assets/Whitepaper/REKT.webp" alt="Whitepaper Icon" width={100} height={100} />
              <h3 className="text-2xl font-primary font-bold text-white mt-6">{t('whitepaper.whitepaper.title')}</h3>
              <p className="text-gray-300 text-sm mt-3 max-w-sm">
                {t('whitepaper.whitepaper.description')}
              </p>
              <ul className="mt-6 space-y-2 text-left">
                {[
                  t('whitepaper.whitepaper.features.tokenomics'),
                  t('whitepaper.whitepaper.features.technical'),
                  t('whitepaper.whitepaper.features.roadmap'),
                  t('whitepaper.whitepaper.features.risk')
                ].map(item => (
                  <li key={item} className="flex items-start space-x-2">
                    <Image
                      src="/assets/Whitepaper/check.svg"
                      alt="Checkmark"
                      width={24}
                      height={24}
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block relative group hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/Whitepaper/view%20whitepaper%20background%20button.svg"
                  alt="View Whitepaper Button"
                  width={220}
                  height={50}
                  className="pointer-events-none select-none"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm tracking-wider">
                  {t('whitepaper.whitepaper.button')}
                </span>
              </a>
            </div>
          </div>

          
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
            <Image src="/assets/Whitepaper/middle%20logo.webp" alt="Mascot" width={250} height={550} priority />
          </div>

          
          <span id="audit" className="block absolute -top-24" aria-hidden="true"></span>
          
          <div className="relative w-full max-w-md mx-auto min-h-[640px]">
            <Image
              src="/assets/Whitepaper/border%20of%20audit.webp"
              alt="Audit Card Border"
              fill
              className="object-contain pointer-events-none select-none"
            />
            <div className="relative pt-28 px-10 pb-10 flex flex-col items-center text-center">
              <div className="relative flex justify-center mb-4">
                <Image
                  src="/assets/Whitepaper/square%20border%20o%20audit.svg"
                  alt="Icon Frame"
                  width={124}
                  height={124}
                  className="pointer-events-none select-none"
                />
                <Image
                  src="/assets/Whitepaper/material-symbols-light_security-rounded.svg"
                  alt="Security Icon"
                  width={80}
                  height={80}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <h3 className="text-2xl font-primary font-bold text-white mt-6">{t('whitepaper.audit.title')}</h3>
              <p className="text-gray-300 text-sm mt-3 max-w-sm">
                {t('whitepaper.audit.description')}
              </p>
              
              <div className="flex items-center justify-center gap-16 mt-6">
                <Image src="/assets/Whitepaper/check.svg" alt="Check Icon" width={28} height={28} />
                <Image src="/assets/Whitepaper/check.svg" alt="Check Icon" width={28} height={28} />
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-6">
                <Image src="/assets/Whitepaper/coinsult_full_new_web.webp" alt="Coinsult" width={120} height={40} />
                <Image src="/assets/Whitepaper/solidproof.webp" alt="SolidProof" width={120} height={40} />
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block relative group hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/Whitepaper/view%20audit%20background%20button.svg"
                  alt="View Audit Report Button"
                  width={220}
                  height={50}
                  className="pointer-events-none select-none"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm tracking-wider">
                  {t('whitepaper.audit.button')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
