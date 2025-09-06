"use client"

import Image from 'next/image'
import MobileTeamCard from './MobileTeamCard'
import styles from './TeamSection.module.css'
import { teamMembers } from '@/data/teamData'
import { useTranslations } from 'next-intl'

export default function TeamMobile() {
  const t = useTranslations('sections')
  
  return (
    <div className={`${styles.section} py-16 relative w-full`} style={{ overflowX: 'hidden' }}>
      
      <div className={styles.connector} aria-hidden={true} />

      
      <div className="relative z-10 w-full text-center mb-20">
        <div className="relative max-w-md mx-auto">
          <div className="relative inline-block">
            <Image
              src="/assets/Mobileview/team/topline.svg"
              alt=""
              width={77}
              height={30}
              className="pointer-events-none absolute right-full mr-2 top-[0.15em]"
              loading="lazy"
              priority={false}
            />
            <h2 className="relative z-10 text-3xl font-primary font-bold px-1">
              {t('team.title').split('$REKT').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}<span className="neon-glow-cyan" style={{ color: 'var(--bright-cyan-glow)' }}>$REKT</span></span>
                ) : (
                  <span key={index}>{part}</span>
                )
              ))}
            </h2>
            <Image
              src="/assets/Mobileview/team/topline.svg"
              alt=""
              width={77}
              height={30}
              className="pointer-events-none absolute left-full ml-2 top-[0.15em] -scale-x-100"
              loading="lazy"
              priority={false}
            />
          </div>
        </div>
        <p className="text-base text-gray-300 max-w-xl mx-auto mt-3">
          {t('team.subtitle')}
        </p>
      </div>

      
      <div className="grid grid-cols-1 gap-12 max-w-md mx-auto pt-20">
        {teamMembers.map((m) => (
          <MobileTeamCard key={m.name} {...m} />
        ))}
      </div>

      
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-0" aria-hidden={true}>
        <Image
          src="/assets/Mobileview/team/bottomline.svg"
          alt=""
          width={430}
          height={32}
          className="w-full h-auto opacity-90"
          loading="lazy"
          priority={false}
        />
      </div>
    </div>
  )
}
