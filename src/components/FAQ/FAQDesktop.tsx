'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { FAQItem } from '@/data/faqItems'
import { faqItems } from '@/data/faqItems'
import { useTranslations } from 'next-intl'

function PlusIcon({ open }: { open: boolean }) {
  const color = open ? 'var(--bright-cyan-glow)' : 'var(--text-primary)'
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {open ? (
        <rect x="4" y="11" width="16" height="2" rx="1" fill={color} />
      ) : (
        <>
          <rect x="4" y="11" width="16" height="2" rx="1" fill={color} />
          <rect x="11" y="4" width="2" height="16" rx="1" fill={color} />
        </>
      )}
    </svg>
  )
}

function FAQItemRowDesktop({ item, index, isOpen, onToggle, headerRef }: {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
  headerRef: (el: HTMLButtonElement | null) => void
}) {
  const panelId = `faq-panel-${item.id}`
  const headerId = `faq-header-${item.id}`


  const bgUrl = isOpen
    ? "/assets/Whitepaper/FAQ/opened_question.svg"
    : "/assets/Whitepaper/FAQ/unopened_question.svg"

  const frameHeightPx = 109
  const closedSvgHeightPx = 75
  const bgSize = `100% ${isOpen ? frameHeightPx : closedSvgHeightPx}px`

  return (
    <>
          <div
        className={`relative transition-all duration-300 ${
          isOpen ? 'min-h-[160px]' : 'h-[109px]'
        }`}
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: isOpen ? '100% 100%' : bgSize,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        
        <button
          ref={headerRef}
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="relative w-full text-left focus:outline-none rounded-lg"
          style={{ height: isOpen ? 'auto' : '109px' }}
        >
          <div className="flex items-center justify-between px-8 py-6">
            <h3 className="text-lg font-semibold text-white pr-4">
              {item.question}
            </h3>
            <div className="flex-shrink-0 ml-4">
              <PlusIcon open={isOpen} />
            </div>
          </div>

          {/* Answer Panel - now inside the button/background */}
          {isOpen && (
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="px-8 pb-6 pt-2"
            >
              <div className="text-gray-300 leading-relaxed">
                {item.answer}
              </div>
            </div>
          )}
        </button>
      </div>
    </>
  )
}

export default function FAQDesktop() {
  const t = useTranslations('sections')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onToggle = useCallback((index: number) => {
    setOpenIndex(current => current === index ? null : index)
  }, [])

  const setHeaderRef = useCallback((el: HTMLButtonElement | null, index: number) => {
    headerRefs.current[index] = el
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const direction = e.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (currentIndex + direction + faqItems.length) % faqItems.length
      headerRefs.current[nextIndex]?.focus()
    }
  }, [])

  useEffect(() => {

    headerRefs.current = headerRefs.current.slice(0, faqItems.length)
  }, [])

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-20 bg-gradient-to-b from-purple-900/10 to-transparent">

      <div className="absolute inset-x-0 top-12 bottom-12 md:top-16 md:bottom-16 lg:top-20 lg:bottom-20 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/assets/Whitepaper/FAQ/faq_background.gif"
          alt=""
          fill
          unoptimized
          className="object-cover opacity-40"
        />
      </div>

      <div className="absolute inset-x-0 top-12 bottom-12 md:top-16 md:bottom-16 lg:top-20 lg:bottom-20 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#120c24]/70 to-[#0b0218]/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.35)_0%,transparent_60%)]"></div>
      </div>
      
      <div className="container relative z-10">

        <div className="relative overflow-hidden w-screen -ml-[50vw] left-1/2 h-0.5 mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" aria-hidden="true"></div>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-primary font-bold leading-tight">
            <span className="text-cyan-400">F</span>requently <span className="text-purple-500">A</span>sked <span className="text-cyan-400">Q</span>uestions
          </h2>
          <p className="text-gray-300 mt-3 text-lg">{t('faq.subtitle')}</p>
        </div>

        <div className="max-w-[1051px] mx-auto space-y-4">
          {faqItems.map((item, i) => (
            <div key={item.id} onKeyDown={(e) => onKeyDown(e, i)}>
              <FAQItemRowDesktop
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={onToggle}
                headerRef={(el) => setHeaderRef(el, i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
