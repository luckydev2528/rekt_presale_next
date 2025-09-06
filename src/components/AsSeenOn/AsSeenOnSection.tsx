import AsSeenOnDesktop from './desktop/AsSeenOnDesktop'
import AsSeenOnMobile from './mobile/AsSeenOnMobile'
import { useTranslations } from 'next-intl'

export default function AsSeenOnSection() {
  const t = useTranslations('home')
  
  return (
    <section className="py-0.5 lg:py-4 bg-gradient-to-b from-transparent to-purple-900/10">

      <div className="hidden lg:block">
        <div className="container">
          <div className="text-center mb-2">
            <p className="mb-1 font-display lg:text-white/70 lg:text-2xl lg:font-display lg:mb-1 text-white text-[20px] font-normal">
              {t('asSeenOn.title')}
            </p>
          </div>
        </div>
      </div>
      

      <div className="block lg:hidden">
        <div className="text-center mb-2 mx-5">
          <p className="mb-1 font-display text-white text-[20px] font-normal">
            {t('asSeenOn.title')}
          </p>
        </div>
      </div>


      <div className="hidden lg:block">
        <AsSeenOnDesktop />
      </div>
      <div className="block lg:hidden mt-2">
        <AsSeenOnMobile />
      </div>
    </section>
  )
}
