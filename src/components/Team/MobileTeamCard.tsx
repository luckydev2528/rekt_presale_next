"use client"

import Image from 'next/image'
import type { TeamMember } from '@/data/teamData'


export default function MobileTeamCard({ name, role, desc, avatar, splitAfter }: TeamMember) {

  const segments: string[] = []
  if (splitAfter) {
    if (Array.isArray(splitAfter)) {
      let remaining = desc
      splitAfter.forEach((marker) => {
        const idx = remaining.indexOf(marker)
        if (idx !== -1) {
          const cut = idx + marker.length
          segments.push(remaining.slice(0, cut).trim())
          remaining = remaining.slice(cut).trim()
        }
      })
      if (remaining) segments.push(remaining)
    } else {
      const idx = desc.indexOf(splitAfter)
      if (idx !== -1) {
        const cut = idx + splitAfter.length
        segments.push(desc.slice(0, cut).trim())
        segments.push(desc.slice(cut).trim())
      }
    }
  }
  return (
    <div className="w-full max-w-[408px] mx-auto">
      
      <div className="relative mx-auto w-full" style={{ maxWidth: 408 }}>
        
        <Image
          src="/assets/Mobileview/team/teamframecard.svg"
          alt=""
          width={408}
          height={275}
          className="w-full h-auto select-none"
          priority={false}
        />

        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
          <div
            className="relative w-[100px] h-[100px] rounded-full border-[3px] overflow-hidden"
            style={{ borderColor: 'var(--bright-cyan-glow)', boxShadow: '0 0 15px var(--bright-cyan-glow)' }}
          >
            
            <Image
              src="/assets/Team/icons circle background.svg"
              alt=""
              fill
              className="object-contain opacity-70 pointer-events-none select-none"
              aria-hidden={true}
              sizes="100px"
              loading="lazy"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={avatar}
                alt={`${name} avatar`}
                width={72}
                height={72}
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        
        <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-20 pb-6 text-center z-[10]">
          <h3 className="text-[22px] font-primary font-bold text-white leading-tight word-wrap break-words px-2">
            {name}
          </h3>
          <p className="text-[14px] font-semibold mt-1 word-wrap break-words hyphens-auto px-2 leading-tight" style={{ color: 'var(--bright-cyan-glow)' }}>
            {role}
          </p>
          <p className="text-[14px] text-text-secondary leading-relaxed mt-3 px-2 word-wrap break-words hyphens-auto flex-grow">
            {segments.length > 0 ? (
              segments.map((seg, i) => (
                <span key={i}>
                  {seg}
                  {i < segments.length - 1 && <br />}
                </span>
              ))
            ) : (
              desc
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
