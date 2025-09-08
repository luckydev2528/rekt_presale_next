'use client'

import Image from 'next/image';
import { phases } from '@/data/roadmap';
import styles from './RoadmapSection.module.css';
import { useTranslations } from 'next-intl';

export default function RoadmapDesktop() {
  const t = useTranslations('sections')
  const tRoadmap = useTranslations()
  const headerBg = '/assets/roadmap/background.svg';

  const phaseBadgeBgByIndex = [
    '/assets/roadmap/PHASE1%20background.webp',
    '/assets/roadmap/PHASE2%20background.webp',
    '/assets/roadmap/PHASE3%20background.webp'
  ];

  const phaseLabelImgByIndex = [
    '/assets/roadmap/phase1.webp',
    '/assets/roadmap/phase2.webp',
    '/assets/roadmap/phase3.webp'
  ];

  const goalBg = '/assets/roadmap/Goalfair.webp';

  return (
    <section className={`relative py-20 bg-gradient-to-b from-transparent to-purple-900/10 ${styles.sectionRoot}`}>
      
      <div className={`${styles.topSeparatorLeft} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/top%20line.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-right pointer-events-none"
        />
      </div>
      <div className={`${styles.topSeparatorRight} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/top%20line.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-left pointer-events-none"
        />
      </div>
      
      <div className={`${styles.topSeparatorMiddleLeft} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/middle%20line%20in%20the%20top.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-right pointer-events-none"
        />
      </div>
      <div className={`${styles.topSeparatorMiddleRight} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/middle%20line%20in%20the%20top.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-left pointer-events-none"
        />
      </div>
      
      <div className={`${styles.topSeparatorLowerLeft} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/top%20line.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-right pointer-events-none"
        />
      </div>
      <div className={`${styles.topSeparatorLowerRight} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/top%20line.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-left pointer-events-none"
        />
      </div>
      <div className="relative z-10 w-full">
        
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <Image
              src="/assets/roadmap/topbothsideline.svg"
              alt=""
              width={441}
              height={31}
              className="hidden md:block flex-grow basis-0 h-auto select-none"
              loading="lazy"
            />
            <h2 className="text-4xl font-primary font-bold whitespace-nowrap">
              {t('roadmap.title').split('$REKT').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}<span className="text-cyan-400" style={{ textShadow: '0 0 8px #00ffff' }}>$REKT</span></span>
                ) : (
                  <span key={index}>{part}</span>
                )
              ))}
            </h2>
            <Image
              src="/assets/roadmap/topbothsideline.svg"
              alt=""
              width={441}
              height={31}
              className="hidden md:block flex-grow basis-0 h-auto select-none"
              style={{ transform: 'scaleX(-1)' }}
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-400 uppercase tracking-wide text-center">
            {t('roadmap.subtitle')}
          </p>
        </div>

        
        <div className={`relative ${styles.timeline} mx-auto max-w-5xl`}>
          {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;
            const cardPositionClass = isLeft ? styles.left : styles.right;
            const badgeSideClass = isLeft ? styles.oppositeRight : styles.oppositeLeft;
            const badgeOrderClass = isLeft ? '' : styles.rowReverse;

            return (
              <div key={phase.titleKey} className="relative mb-28 flex items-start">
                
                <div className={`${styles.phaseCard} ${cardPositionClass} w-full lg:max-w-md`}>
                  
                  <div className={`${styles.phaseHeader} ${styles.desktopPhaseHeader}`}>
                    <Image
                      src={headerBg}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-contain pointer-events-none"
                      aria-hidden="true"
                    />
                    <h3 className={styles.headerTitle}>{tRoadmap(phase.titleKey)}</h3>
                  </div>

                  
                  <div className={styles.goalBox}>
                    <Image
                      src={goalBg}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-fill object-left-top pointer-events-none"
                      aria-hidden="true"
                    />
                    <p className={styles.goalLabel}>GOAL: {tRoadmap(phase.goalKey)}</p>
                    <ul className={styles.goalList}>
                      {phase.itemKeys.map((itemKey, i) => (
                        <li key={i} className={styles.listItem}>
                          <span className="text-sm text-gray-300">{tRoadmap(itemKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                
                <div className={`${styles.phaseBadge} ${badgeSideClass} ${badgeOrderClass} hidden lg:flex`}>
                  <div className={styles.badgeBox}>
                    
                    <div className={`${styles.badgeArrow} ${isLeft ? styles.arrowLeft : styles.arrowRight}`}>
                      <Image
                        src="/assets/roadmap/Arrow%20of%20the%20phase.svg"
                        alt=""
                        fill
                        sizes="34px"
                        className="object-contain pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                    <Image
                      src={phaseBadgeBgByIndex[index]}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-contain pointer-events-none"
                      aria-hidden="true"
                    />
                    <Image
                      src={phaseLabelImgByIndex[index]}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-contain pointer-events-none p-1 pl-8 pr-3 z-10"
                      aria-hidden="true"
                    />
                    <span className="sr-only">PHASE {index + 1}</span>
                  </div>
                  <Image
                    src="/assets/roadmap/SMIRK.webp"
                    alt={`Mascot for phase ${index + 1}`}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={`${styles.bottomSeparatorUpper} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/bottom%20line.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-contain pointer-events-none"
        />
      </div>
      
      <div className={`${styles.bottomSeparatorMiddle} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/middle%20line%20in%20the%20bottom.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-contain pointer-events-none"
        />
      </div>
      
      <div className={`${styles.bottomSeparator} hidden`} aria-hidden="true">
        <Image
          src="/assets/roadmap/bottom%20line.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-contain pointer-events-none"
        />
      </div>

      
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-0"
        aria-hidden={true}
      >
        <Image
          src="/assets/roadmap/bottom line.svg"
          alt=""
          width={1920}
          height={32}
          className="w-full h-auto opacity-90"
          loading="lazy"
          priority={false}
        />
      </div>
    </section>
  );
}
