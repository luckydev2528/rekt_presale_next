'use client'

import { useIsMobile } from '@/components/Rektonomics/utils/useIsMobile'
import FAQMobile from './FAQMobile'
import FAQDesktop from './FAQDesktop'

export default function FAQSection() {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative w-full p-0 m-0">
          <FAQMobile />
        </div>
      </section>
    )
  }
  
  return <FAQDesktop />
}
