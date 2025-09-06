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
      width="20"
      height="20"
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

function FAQItemRowMobile({ item, index, isOpen, onToggle, headerRef }: {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
  headerRef: (el: HTMLButtonElement | null) => void
}) {
  const panelId = `faq-panel-${item.id}`
  const headerId = `faq-header-${item.id}`


  const bgUrl = isOpen
    ? "/assets/Mobileview/faq/openquestionbackground.svg"
    : "/assets/Mobileview/faq/closequestionbackground.svg"

      return (
    <div className="relative w-full">

            <div className="relative w-full transition-all duration-300">
        <button
          ref={headerRef}
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="relative w-full text-left focus:outline-none rounded-lg flex flex-col z-10"
        >
          {/* Background layer that follows content */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${bgUrl}')`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: -1,
            }}
          />

          <div className="flex items-center justify-between flex-shrink-0 px-4 py-4 min-h-[90px]">
            <h3 className="text-base font-semibold text-white pr-4 leading-relaxed">
              {item.question}
            </h3>
            <div className="flex-shrink-0 ml-2">
              <PlusIcon open={isOpen} />
            </div>
          </div>

          {/* Answer Panel */}
          {isOpen && (
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="px-4 pb-4"
            >
              <div className="text-sm text-gray-300 leading-relaxed w-full">
                {item.answer}
              </div>
            </div>
          )}
        </button>
        </div>
    </div>
  )
}

export default function FAQMobile() {
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
    <div className="relative py-12 w-full">

      <div className="relative h-0.5 mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" aria-hidden="true"></div>
      

      <div className="text-center mb-8">
        <h2 id="faq-heading-mobile" className="text-2xl md:text-3xl font-primary font-bold leading-tight">
          <span className="text-cyan-400">F</span>requently <span className="text-purple-500">A</span>sked <span className="text-cyan-400">Q</span>uestions
        </h2>
        <p className="text-gray-300 mt-2 text-sm">{t('faq.subtitle')}</p>
      </div>


      <div className="space-y-4 px-2">
        {faqItems.map((item, i) => (
          <div key={item.id} onKeyDown={(e) => onKeyDown(e, i)}>
            <FAQItemRowMobile
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
  )
}
