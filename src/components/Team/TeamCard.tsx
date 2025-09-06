"use client"

import Image from 'next/image'
import styles from './TeamSection.module.css'
import type { TeamMember } from '@/data/teamData'

export default function TeamCard({ name, role, desc, avatar, splitAfter }: TeamMember) {


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

  const descClasses =
    'text-text-secondary text-xs leading-relaxed max-w-[40ch] md:max-w-[46ch] lg:max-w-[50ch] xl:max-w-[52ch] mx-auto mt-3'
  return (
    <article className={`${styles.cardFrame} text-center relative w-full`}>
      
      <div className={styles.avatarCircle}>
          
          <Image
            src="/assets/Team/icons circle background.svg"
            alt=""
            fill
            className="object-contain opacity-70"
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
  
      
      <h3 className="text-lg md:text-xl lg:text-2xl font-primary font-bold mb-2 text-white">{name}</h3>
      <p className={`${styles.roleText} text-sm font-semibold mb-3`}>{role}</p>
      
      <p className={descClasses}>
        {segments.length > 0 ? (
          segments.map((seg, i) => (
            <span key={i} className={i < segments.length - 1 ? 'md:whitespace-nowrap' : undefined}>
              {seg}
              {i < segments.length - 1 && (
                <br className="hidden md:block" />
              )}
            </span>
          ))
        ) : (
          desc
        )}
      </p>
    </article>
  )
}

