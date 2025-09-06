'use client'

import FooterSection from './FooterSection'
import FooterMobile from './FooterMobile'

export default function Footer() {
  return (
    <>

      <div className="lg:hidden">
        <footer className="relative">
        <div className="relative w-full p-0 m-0">
            <FooterMobile />
          </div>
        </footer>
      </div>
      

      <div className="hidden lg:block">
        <FooterSection />
      </div>
    </>
  )
}
