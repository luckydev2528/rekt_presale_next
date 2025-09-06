'use client'

import WhitepaperDesktop from './WhitepaperDesktop'
import WhitepaperMobile from './WhitepaperMobile'

export default function WhitepaperSection() {
  return (
    <>
      
      <div className="lg:hidden">
        <section className="relative">
        <div className="relative w-full p-0 m-0">
            <WhitepaperMobile />
          </div>
        </section>
      </div>
      

      <div className="hidden lg:block">
        <WhitepaperDesktop />
      </div>
    </>
  )
}
