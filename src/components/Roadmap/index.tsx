'use client'

import { useIsMobile } from '@/components/Rektonomics/utils/useIsMobile'
import RoadmapDesktop from './RoadmapDesktop'
import RoadmapMobile from './RoadmapMobile'

export default function RoadmapSection() {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative w-full p-0 m-0">
          <RoadmapMobile />
        </div>
      </section>
    )
  }
  
  return <RoadmapDesktop />
}
