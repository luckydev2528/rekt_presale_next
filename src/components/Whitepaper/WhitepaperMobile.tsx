import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function WhitepaperMobile() {
  const t = useTranslations('sections');
  return (
    <div className="relative py-12 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="relative z-10 w-full">
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          
          <div className="flex items-center justify-center mb-6">
            <Image 
              src="/assets/Mobileview/whitepaper/topline.svg" 
              alt="Decorative line" 
              width={82} 
              height={30} 
              className="transform scale-x-[-1]"
            />
            <h2 className="text-3xl font-primary font-bold leading-tight mx-4">
              {t('whitepaper.title')}
            </h2>
            <Image 
              src="/assets/Mobileview/whitepaper/topline.svg" 
              alt="Decorative line" 
              width={82} 
              height={30} 
            />
          </div>
          <p className="text-gray-300 mt-2 text-base">{t('whitepaper.subtitle')}</p>
          <p className="text-xs text-gray-400">{t('whitepaper.description')}</p>
        </div>

        
        <div className="space-y-1/4">
          
          <div className="relative w-full max-w-sm mx-auto min-h-[500px]">
            <Image
              src="/assets/Whitepaper/border%20of%20white%20paper.webp"
              alt="Whitepaper Card Border"
              fill
              className="object-contain pointer-events-none select-none"
            />
            <div className="relative pt-20 px-6 pb-8 flex flex-col items-center text-center">
              <Image src="/assets/Whitepaper/REKT.webp" alt="Whitepaper Icon" width={80} height={80} />
              <h3 className="text-xl font-primary font-bold text-white mt-4">{t('whitepaper.whitepaper.title')}</h3>
              <p className="text-gray-300 text-xs mt-2 max-w-xs">
                {t('whitepaper.whitepaper.description')}
              </p>
              <ul className="mt-4 space-y-1.5 text-left">
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
                      width={20}
                      height={20}
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-300 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block relative group hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/Whitepaper/view%20whitepaper%20background%20button.svg"
                  alt="View Whitepaper Button"
                  width={180}
                  height={40}
                  className="pointer-events-none select-none"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-xs tracking-wider">
                  {t('whitepaper.whitepaper.button')}
                </span>
              </a>
            </div>
          </div>

          
          <span id="audit" className="block absolute -top-24" aria-hidden="true"></span>
          
          
          <div className="relative w-full max-w-sm mx-auto min-h-[500px]">
            <Image
              src="/assets/Whitepaper/border_of_audit_mobile.svg"
              alt="Audit Card Border"
              fill
              className="object-contain pointer-events-none select-none"
            />
            <div className="relative pt-20 px-6 pb-8 flex flex-col items-center text-center">
              <div className="relative flex justify-center mb-3">
                <Image
                  src="/assets/Whitepaper/square%20border%20o%20audit.svg"
                  alt="Icon Frame"
                  width={100}
                  height={100}
                  className="pointer-events-none select-none"
                />
                <Image
                  src="/assets/Whitepaper/material-symbols-light_security-rounded.svg"
                  alt="Security Icon"
                  width={60}
                  height={60}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <h3 className="text-xl font-primary font-bold text-white mt-4">{t('whitepaper.audit.title')}</h3>
              <p className="text-gray-300 text-xs mt-2 max-w-xs">
                {t('whitepaper.audit.description')}
              </p>
              
              <div className="flex items-center justify-center gap-12 mt-4">
                <Image src="/assets/Whitepaper/check.svg" alt="Check Icon" width={24} height={24} />
                <Image src="/assets/Whitepaper/check.svg" alt="Check Icon" width={24} height={24} />
              </div>
              
              <div className="flex flex-col items-center justify-center gap-4 mt-4">
                <Image src="/assets/Whitepaper/coinsult_full_new_web.webp" alt="Coinsult" width={100} height={35} />
                <Image src="/assets/Whitepaper/solidproof.webp" alt="SolidProof" width={100} height={35} />
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block relative group hover:scale-105 transition-transform"
              >
                <Image
                  src="/assets/Whitepaper/view%20audit%20background%20button.svg"
                  alt="View Audit Report Button"
                  width={180}
                  height={40}
                  className="pointer-events-none select-none"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-xs tracking-wider">
                  {t('whitepaper.audit.button')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
