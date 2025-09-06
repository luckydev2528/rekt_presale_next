"use client"

import { useIsMobile } from '@/components/Rektonomics/utils/useIsMobile'
import TeamMobile from './TeamMobile'
import TeamDesktop from './TeamDesktop'

export default function TeamSection() {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative w-full p-0 m-0">
          <TeamMobile />
        </div>
      </section>
    )
  }
  
  return <TeamDesktop />
}
