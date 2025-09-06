'use client'

import Image from 'next/image';
import { phases } from '@/data/roadmap';
import styles from './RoadmapSection.module.css';
import { useTranslations } from 'next-intl';

export default function RoadmapMobile() {
  const t = useTranslations('sections');
  const headerBg = '/assets/Mobileview/roadmap/phasetitlesbackground.svg';
  const goalBg = '/assets/roadmap/Goalfair.webp';

  return (
    <div className={`relative py-16 pb-20 ${styles.sectionRoot}`}>
      
      <div className="mb-6">
        <div className="relative max-w-md mx-auto text-center">
          <div className="relative inline-block">
            <Image
              src="/assets/Mobileview/roadmap/topline.svg"
              alt=""
              width={82}
              height={30}
              className="pointer-events-none absolute right-full mr-2 top-[0.2em]"
              loading="lazy"
              priority={false}
            />
            <h2 className="relative z-10 text-3xl font-primary font-bold px-1">
              {t('roadmap.title').split('$REKT').map((part, index) => (
                index === 0 ? (
                  <span key={index}>{part}<span className="text-cyan-400" style={{ textShadow: '0 0 8px #00ffff' }}>$REKT</span></span>
                ) : (
                  <span key={index}>{part}</span>
                )
              ))}
            </h2>
            <Image
              src="/assets/Mobileview/roadmap/topline.svg"
              alt=""
              width={82}
              height={30}
              className="pointer-events-none absolute left-full ml-2 top-[0.2em] -scale-x-100"
              loading="lazy"
              priority={false}
            />
          </div>
        </div>
        <p className="mt-3 text-[11px] text-gray-300 uppercase tracking-[0.12em] text-center">
          {t('roadmap.subtitle')}
        </p>
      </div>

      
      <div className="mx-auto max-w-md space-y-10">
        {phases.map((phase, index) => (
          <div key={phase.title} className="relative">
            
            {[0, 1, 2].includes(index) && (
              <div className="relative h-[210px] sm:h-[240px] mb-4">
                <Image
                  src={
                    index === 0
                      ? '/assets/Mobileview/roadmap/Phase1.svg'
                      : index === 1
                      ? '/assets/Mobileview/roadmap/phase2.svg'
                      : '/assets/Mobileview/roadmap/phase3.svg'
                  }
                  alt={`Phase ${index + 1} graphic`}
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-contain mx-auto"
                  priority={false}
                />
              </div>
            )}

            
            <div className={`${styles.phaseHeader} mb-3`}>
              <Image
                src={headerBg}
                alt=""
                fill
                sizes="100vw"
                className="object-fill pointer-events-none"
                aria-hidden="true"
              />
              <h3 className={`${styles.headerTitle} ${styles.mobileHeaderTitle}`}>{phase.title}</h3>
            </div>

            
            <div className={`${styles.goalBox} ${styles.mobileGoalBox} mt-2`}>
              <Image
                src={goalBg}
                alt=""
                fill
                sizes="100vw"
                className="object-fill object-left-top pointer-events-none"
                aria-hidden="true"
              />
              <p className={`${styles.goalLabel} text-sm`}>GOAL: {phase.goal}</p>
              <ul className={`${styles.goalList} space-y-2`}>
                {phase.items.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-0" aria-hidden>
        <Image
          src="/assets/Mobileview/roadmap/bottomline.svg"
          alt=""
          width={430}
          height={32}
          className="w-full h-auto opacity-90"
          loading="lazy"
          priority={false}
        />
      </div>
    </div>
  );
}
