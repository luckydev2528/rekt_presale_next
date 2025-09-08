"use client"

import Image from 'next/image'
import TeamCard from './TeamCard'
import styles from './TeamSection.module.css'
import { getTeamMembers } from '@/data/teamData'
import { useTranslations } from 'next-intl'

export default function TeamDesktop() {
  const t = useTranslations()
  const teamMembers = getTeamMembers(t)
  
  return (
    <section className={`${styles.section} py-20 relative`}>
      
      <div className={styles.connector} aria-hidden={true} />

      
      <div className="relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <Image
              src="/assets/Team/topbothsideline.svg"
              alt=""
              width={441}
              height={31}
              className="hidden md:block flex-grow basis-0 h-auto select-none"
              loading="lazy"
            />
            <h2 className="text-4xl font-primary font-bold whitespace-nowrap">
              {t('sections.team.title').split('$REKT').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}<span className="neon-glow-cyan" style={{ color: 'var(--bright-cyan-glow)' }}>$REKT</span></span>
                ) : (
                  <span key={index}>{part}</span>
                )
              ))}
            </h2>
            <Image
              src="/assets/Team/topbothsideline.svg"
              alt=""
              width={441}
              height={31}
              className="hidden md:block flex-grow basis-0 h-auto select-none"
              style={{ transform: 'scaleX(-1)' }}
              loading="lazy"
            />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('sections.team.subtitle')}
          </p>
        </div>

        
        <div className="grid gap-y-10 gap-x-4 md:[grid-template-columns:repeat(2,390px)] lg:[grid-template-columns:repeat(3,390px)] justify-center">
          {teamMembers.map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </div>

      
      <div className="absolute top-10 right-10 opacity-10" aria-hidden={true}>
        <Image
          src="/assets/rekt_rocket_1.webp"
          alt=""
          width={80}
          height={80}
          className="animate-float"
          loading="lazy"
        />
      </div>

      
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-0"
        aria-hidden={true}
      >
        <Image
          src="/assets/Team/bottom line.svg"
          alt=""
          width={1920}
          height={32}
          className="w-full h-auto opacity-90"
          loading="lazy"
          priority={false}
        />
      </div>
    </section>
  )
}
