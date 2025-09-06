
"use client"

import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { PRESALE_RECEIVER_SOL, USDT_MINT, USDC_MINT } from '@/lib/wallet/solanaConfig'
import { useTranslations } from 'next-intl'

function MobileCountdown() {
  const t = useTranslations('home')
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 10, minutes: 15, seconds: 15 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full">

      <div className="mb-1 mx-auto flex justify-between max-w-[280px] text-[10px] text-gray-300 uppercase tracking-widest">
        <span>{t('countdown.days').toUpperCase()}</span>
        <span>{t('countdown.hours').toUpperCase()}</span>
        <span>{t('countdown.minutes').toUpperCase()}</span>
        <span>{t('countdown.seconds').toUpperCase()}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        {Object.entries(timeLeft).map(([unit, value], idx, arr) => (
          <Fragment key={unit}>
            <div className="text-center">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src="/assets/Mobileview/hero_section/daysframe.svg"
                  alt={`${unit} frame`}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-300 font-display text-xl font-bold">
                    {value.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
            {idx < arr.length - 1 && (
              <Image src="/assets/Mobileview/hero_section/colon.svg" alt=":" width={14} height={56} className="h-14 w-3" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function HeroMobile() {
  const t = useTranslations('home')
  const [paymentMethod, setPaymentMethod] = useState<"SOL" | "USDT" | "USDC">("SOL")
  const [amount, setAmount] = useState("")
  const METHODS: Array<"SOL" | "USDT" | "USDC"> = ["SOL", "USDT", "USDC"]
  const { publicKey, connected, sendTransaction } = useWallet()
  const { setVisible } = useWalletModal()
  const { connection } = useConnection()
  const handleConnect = () => setVisible(true)
  const toBigIntAmount = (value: string, decimals: number): bigint => {
    const [int, frac = ''] = value.split('.')
    const fracPadded = (frac + '0'.repeat(decimals)).slice(0, decimals)
    const full = `${int}${fracPadded}`.replace(/^0+/, '')
    return BigInt(full || '0')
  }
  const handleBuy = () => {
    (async () => {
      try {
        if (!connected || !publicKey) return setVisible(true)

        const amt = amount.trim()
        if (!amt || Number(amt) <= 0) return alert('Enter a valid amount')
        if (!PRESALE_RECEIVER_SOL) return alert('Presale receiver address is not configured')

        const receiverPk = new PublicKey(PRESALE_RECEIVER_SOL)

        if (paymentMethod === 'SOL') {
          const lamports = Math.round(parseFloat(amt) * LAMPORTS_PER_SOL)
          if (!Number.isFinite(lamports) || lamports <= 0) return alert('Invalid SOL amount')
          const tx = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: receiverPk,
              lamports,
            })
          )
          tx.feePayer = publicKey
          tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
          const sig = await sendTransaction(tx, connection)
          alert(`Transaction sent: ${sig}`)
          return
        }

        const mintStr = paymentMethod === 'USDT' ? USDT_MINT : USDC_MINT
        if (!mintStr) return alert(`${paymentMethod} mint address is not configured`)
        const mint = new PublicKey(mintStr)
        const sourceATA = await getAssociatedTokenAddress(mint, publicKey)
        const destATA = await getAssociatedTokenAddress(mint, receiverPk)
        const destInfo = await connection.getAccountInfo(destATA)

        const decimals = 6
        const amountBn = toBigIntAmount(amt, decimals)
        const tx = new Transaction()
        if (!destInfo) {
          tx.add(
            createAssociatedTokenAccountInstruction(
              publicKey,
              destATA,
              receiverPk,
              mint,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          )
        }
        tx.add(
          createTransferCheckedInstruction(
            sourceATA,
            mint,
            destATA,
            publicKey,
            amountBn,
            decimals,
            [],
            TOKEN_PROGRAM_ID
          )
        )
        tx.feePayer = publicKey
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        const sig = await sendTransaction(tx, connection)
        alert(`Transaction sent: ${sig}`)
      } catch (err: unknown) {
        console.error(err)
        const message = err instanceof Error ? err.message : 'Transaction failed'
        alert(message)
      }
    })()
  }

  return (
    <section
      className="relative min-h-[1200px] overflow-visible"
      style={{ paddingTop: 'max(64px, env(safe-area-inset-top))', paddingBottom: 'max(32px, env(safe-area-inset-bottom))' }}
    >

      <div
        className="absolute -z-10 w-[100vw] h-auto"
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Image src="/assets/Mobileview/hero_section/background.svg" alt="Background" fill className="object-cover opacity-50" />
      </div>


      <div
        className="absolute pointer-events-none w-[100vw] h-[954px]"
        style={{ top: 121, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Image src="/assets/Mobileview/hero_section/border.svg" alt="Border" fill className="object-contain" />
      </div>


      <div
        className="absolute z-10"
        style={{ width: 115.4, height: 140, top: 184.09, left: 40.69 }}
      >
        <Image src="/assets/Mobileview/hero_section/Rekts mascot.svg" alt="Badge logo" fill className="object-contain drop-shadow-xl" />
      </div>


      <div
        className="absolute z-10"
        style={{ width: 272, height: 41, top: 331, left: 40.69 }}
      >
        <div className="text-white font-primary font-normal text-[32px] leading-none whitespace-nowrap">{t('hero.title')}</div>
      </div>


      <div
        className="absolute z-10"
        style={{ width: 168, height: 23, top: 384, left: 40.69 }}
      >
        <div className="text-white font-secondary font-normal text-[20px] leading-none whitespace-nowrap">{t('hero.subtitle')}</div>
      </div>


      <div className="mt-3 px-4">
        <div className="flex items-end gap-0">

          <div
            className="absolute z-0"
            style={{ width: 320.09, height: 340.19, top: 107, left: 151 }}
          >
            <Image src="/assets/Mobileview/hero_section/mainherogif.gif" alt="REKT mascot" fill unoptimized className="object-contain" />
          </div>
        </div>
      </div>


      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-4" style={{ top: 120 }}>
        <a href="https://t.me/REKT" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 drop-shadow-lg">
          <Image src="/assets/hero-section/tg.svg" alt="Telegram" fill className="object-contain" />
          <span className="sr-only">Telegram</span>
        </a>
        <a href="https://twitter.com/REKT" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 drop-shadow-lg">
          <Image src="/assets/hero-section/socialmediax.svg" alt="X" fill className="object-contain" />
          <span className="sr-only">Twitter/X</span>
        </a>
      </div>

      


      <div
        className="absolute z-10 w-[100vw] h-auto"
        style={{ top: 520, left: '50%', transform: 'translateX(-50%)' }}
      >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 rounded-[12px] p-1">
                      {/* Gradient border */}
                      <div 
                        className="w-full h-full rounded-[8px]"
                        style={{
                          background: 'linear-gradient(135deg, #00B2B9 0%, #8200FE 100%)'
                        }}
                      />
                      {/* Inner content area */}
                      <div className="absolute inset-[8px] bg-black/90 rounded-[8px]" />
                    </div>
                  </div>


        <div className="relative w-full h-full rounded-[12px] overflow-hidden">

          <div aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-6 rounded-xl bg-cyan-400/20 blur-2xl"></div>
            <div className="absolute inset-10 rounded-xl bg-purple-500/20 blur-2xl"></div>
          </div>


          <div
            className="absolute z-15 rounded-[4px] overflow-hidden w-full h-full"
            style={{ top: 17, left: 15 }}
          >
            <Image
              src="/assets/Mobileview/hero_section/Rectangle 4.svg"
              alt="Card background"
              fill
              className="object-cover opacity-40"
              style={{ filter: "blur(20px)" }}
            />
          </div>


          <div className="relative z-20 p-6 pt-20 space-y-6">
            <h3
              className="text-center text-white font-primary font-normal text-[24px] leading-none mb-4"
            >
              {t('presale.title')}
            </h3>

            

            <div className="flex items-center justify-between text-sm mb-4 px-4">
              <div className="text-center">
                <div className="text-gray-300">{t('presale.currentPrice')}</div>
                <div className="text-cyan-300 font-display font-bold">$0.001</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300">{t('presale.nextPrice')}</div>
                <div className="text-white font-display font-bold">$0.002</div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[320px] mb-4">
              <Image
                src="/assets/Mobileview/hero_section/Priceincreasewhengoalreached_bg.svg"
                alt="Price increase background"
                width={800}
                height={120}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{t('presale.priceIncreaseNote')}</span>
              </div>
            </div>


            <div className="mt-4">
              <MobileCountdown />
            </div>


            <div className="pt-2">
              <div className="flex items-center justify-center gap-8 text-xs text-gray-300 mb-2">
                <span>
                  {t('presale.progress')}: <span className="text-cyan-300 font-bold">67.5%</span>
                </span>
                <span>{t('presale.raised', { amount: '$2,024,000' })}</span>
              </div>
              <Image
                src="/assets/Mobileview/hero_section/progressbar.svg"
                alt="Progress"
                width={600}
                height={64}
                className="w-full h-auto"
              />
            </div>

            
            <div className="flex items-center justify-center gap-2 mb-4">
              {METHODS.map((method) => {
                const selected = paymentMethod === method
                return (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className="relative w-[104px] h-9 rounded-full overflow-hidden"
                    aria-pressed={selected}
                  >
                    <Image
                      src={selected ? "/assets/Mobileview/hero_section/highlightedlightbuywithbackground.svg" : "/assets/Mobileview/hero_section/unhighlighted.svg"}
                      alt={selected ? `Selected ${method}` : method}
                      fill
                      className="object-contain"
                    />
                    <span className="absolute inset-0 grid place-items-center text-[10px] font-bold tracking-wide text-white uppercase whitespace-nowrap px-1">
                      {t('presale.buyWith', { method })}
                    </span>
                  </button>
                )
              })}
            </div>

            
            <div className="flex overflow-hidden rounded-lg border border-white/20 focus-within:border-cyan-400 mb-4">
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-black/40 px-4 py-3 text-white placeholder-gray-400 outline-none"
              />
              <button className="px-4 py-3 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors shrink-0">
                {t('presale.max')}
              </button>
            </div>

            
            <button onClick={handleConnect} className="w-full h-11 bg-white/5 border border-white/20 rounded-lg px-4 text-white hover:border-cyan-400 transition-colors flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2Zm0 0v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2h-5a3 3 0 1 1 0-6h5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Zm16 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                </svg>
                <span className="font-medium">{t('wallet.connect')}</span>
              </span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            
            <button onClick={handleBuy} className="relative w-full h-14 active:scale-[0.99] transition-transform group">
              {paymentMethod === 'SOL' ? (
                <>
                  
                  <Image
                    src="/assets/hero-section/buywithsolsad.svg"
                    alt="Buy with SOL"
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0"
                    priority
                  />
                  
                  <Image
                    src="/assets/hero-section/buywithsol.svg"
                    alt="Buy with SOL hover"
                    fill
                    className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                    priority
                  />
                </>
              ) : (
                <>
                  <Image src="/assets/Mobileview/hero_section/Buy Button.svg" alt="Buy" fill className="object-contain" />
                  <span className="absolute inset-0 grid place-items-center text-white font-bold">
                    {t('presale.buyWith', { method: paymentMethod })}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div
        className="absolute -z-10 w-[100vw] h-auto"
        style={{ top: 970.95, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Image
          src="/assets/Mobileview/hero_section/rocket.gif"
          alt="Rocket"
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    </section>
  )
}