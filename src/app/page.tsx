'use client'

import { useState, useEffect, Fragment } from 'react'
import Image from 'next/image'
import RektonomicsSection from '../components/Rektonomics/RektonomicsSection'
import LeaderboardSection from '../components/Leaderboard/LeaderboardSection'
import TeamSection from '@/components/Team/TeamSection'
import RoadmapSection from '@/components/Roadmap'
import WhitepaperSection from '@/components/Whitepaper'
import FAQSection from '@/components/FAQ'
import Footer from '@/components/Footer'
import AsSeenOnSection from '@/components/AsSeenOn/AsSeenOnSection'
import HeroMobile from '@/components/Hero/HeroMobile'
import Navigation from '@/components/Layout/Navigation'
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


function CountdownTimer() {
  const t = useTranslations('home')
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 10,
    minutes: 15,
    seconds: 15
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2">
      {Object.entries(timeLeft).map(([unit, value], idx, arr) => (
        <Fragment key={unit}>
          <div className="text-center relative">
            <div className="relative">
              <Image
                src="/assets/hero-section/box for the days.webp"
                alt="Timer Box"
                width={60}
                height={60}
                className="w-16 h-16 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-cyan-400 font-display text-xl font-bold">
                  {value.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase">{t(`countdown.${unit}`)}</div>
          </div>
          {idx < arr.length - 1 && (
            <Image
              src="/assets/hero-section/colon.webp"
              alt="Colon Separator"
              width={40}
              height={40}
              className="w-3 h-10 object-contain"
              aria-hidden="true"
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}


function PresaleCard() {
  const t = useTranslations('home')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'SOL' | 'USDT' | 'USDC'>('SOL')
  const { publicKey, connected, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const METHODS: Array<'SOL' | 'USDT' | 'USDC'> = ['SOL', 'USDT', 'USDC']
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
    <div className="w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl relative">

      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-2xl blur-sm opacity-80"></div>
      

      <div className="card-presale relative rounded-2xl border-2 border-cyan-400/60 backdrop-blur-lg overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%)',
        boxShadow: '0 0 20px 5px rgba(120, 0, 255, 0.5), inset 0 0 15px rgba(0, 255, 255, 0.25)'
      }}>

        <Image
          src="/assets/hero-section/circuit-bg.svg"
          alt="Circuit pattern"
          fill
          className="object-cover opacity-20 pointer-events-none"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(0,255,255,0.35)_0%,rgba(0,0,0,0)_70%)] blur-2xl"></div>
        </div>

        <h3 className="text-2xl font-primary font-bold text-center mb-4 text-white pt-6">
          {t('presale.title')}
        </h3>
      

        <div className="flex justify-between mb-4 px-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">{t('presale.currentPrice')}</div>
            <div className="text-lg font-display font-bold text-cyan-400">$0.001</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">{t('presale.nextPrice')}</div>
            <div className="text-lg font-display font-bold text-white">$0.002</div>
          </div>
        </div>
        

        <div className="relative mb-4 mx-6">
          <Image
            src="/assets/hero-section/price increase background.svg"
            alt="Price Increase Background"
            width={400}
            height={60}
            className="w-full h-auto"
            priority
          />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {t('presale.priceIncreaseNote')}
          </span>
        </div>
        

        <div className="mb-6 px-6">
          <CountdownTimer />
        </div>
        

        <div className="mb-6 px-6">
          <div className="flex justify-between text-sm mb-2">
            <div className='flex items-center justify-start gap-2'>
              <span className="text-gray-400">{t('presale.progress')}</span>
              <span className="text-gray-400 font-bold">67.5%</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              {t('presale.raised', { amount: '$2,024,000' })}
            </div>
          </div>
          <div className="relative rounded-full overflow-hidden">

            <Image
              src="/assets/hero-section/progress bar2.webp"
              alt="Progress Bar Base"
              width={400}
              height={20}
              className="w-full h-5 object-cover rounded-full"
            />

            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/assets/hero-section/progress bar 3.webp"
                alt="Progress Bar Fill"
                width={270}
                height={20}
                className="h-5 object-cover rounded-full"
                style={{ width: '67.5%' }}
              />
            </div>

            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/assets/hero-section/Progress bar.webp"
                alt="Progress Bar Overlay"
                width={270}
                height={20}
                className="h-5 object-cover rounded-full"
                style={{ width: '67.5%' }}
              />
            </div>
          </div>

          <div className="relative -mt-1 rounded-full overflow-hidden">
            <Image
              src="/assets/hero-section/progress 4.webp"
              alt="Progress Bar Bottom"
              width={400}
              height={20}
              className="w-full h-5 object-cover rounded-full"
            />
          </div>
        </div>
        

        <div className="mb-6 flex items-center justify-center gap-3 px-6">
          {METHODS.map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`group relative w-[113px] h-9 overflow-hidden rounded-full transition-transform duration-200 hover:scale-[1.02] ${
                paymentMethod === method ? 'opacity-100' : 'opacity-90 hover:opacity-100'
              }`}
            >

              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.4)_0%,transparent_70%)] transition-opacity duration-300 ${paymentMethod === method ? 'opacity-80' : 'opacity-0 group-hover:opacity-60'}`}></div>
              <Image
                src={method === 'SOL' 
                  ? "/assets/hero-section/buy with sol.svg"
                  : "/assets/hero-section/buy with usdt-usdc.svg"
                }
                alt={`Buy with ${method}`}
                width={113}
                height={36}
                className="w-full h-full object-contain select-none pointer-events-none"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap px-2">
                  {t('presale.buyWith', { method })}
                </span>
              </div>
            </button>
          ))}
        </div>
        

        <div className="mb-6 px-6">
          <div className="flex rounded-lg overflow-hidden border border-gray-600 focus-within:border-cyan-400 transition-colors">
            <input
              type="text"
              placeholder={t('presale.amountPlaceholder')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-black/50 px-4 py-3 text-white focus:outline-none placeholder-gray-400"
            />
            <button className="relative flex items-center justify-center hover:scale-105 transition-all duration-300">
              <Image
                src="/assets/hero-section/max.svg"
                alt="MAX Button"
                width={57}
                height={41}
                className="h-full object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-wider">
                {t('presale.max')}
              </span>
            </button>
          </div>
        </div>
        

        <div className="mb-4 px-6">
          <button onClick={handleConnect} className="w-full bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white hover:bg-gray-700/80 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{t('wallet.connect')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        

        <div className="px-6 pb-6">
          {paymentMethod === 'SOL' ? (
            <button onClick={handleBuy} className="w-full hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/50 transition-all duration-300 group">
              <div className="relative w-full h-14 rounded-lg border-glow overflow-hidden group-hover:brightness-110">

                <Image
                  src="/assets/hero-section/buywithsolsad.svg"
                  alt={t('presale.alt.buyWithSOL')}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  priority
                />

                <Image
                  src="/assets/hero-section/buywithsol.svg"
                  alt={t('presale.alt.buyWithSOLHover')}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  priority
                />
              </div>
            </button>
          ) : (
            <button onClick={handleBuy} className="w-full relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 border-glow hover:brightness-110">
              <div className="flex items-center justify-center space-x-3 flex-nowrap whitespace-nowrap">
                <span className="text-cyan-400 text-xl font-bold">&lt;</span>
                <div className="flex items-center space-x-2">
                  <span className="tracking-wider">{t('presale.buyWith', { method: paymentMethod })}</span>
                  <span className="text-xl">💀</span>
                </div>
                <span className="text-cyan-400 text-xl font-bold">&gt;</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


function HeroSection() {
  const t = useTranslations('home')
  return (
    <section className="min-h-[100svh] pt-32 lg:pt-36 pb-10 relative overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/assets/bg-2-1.webp"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-cyan-900/40"></div>
      </div>
      

      <div className="absolute inset-8 z-5">
        <Image
          src="/assets/hero-section/borderframeherosection.svg"
          alt="Hero Section Border"
          fill
          className="object-contain opacity-80"
        />
      </div>


      <div className="flex items-center justify-center space-x-6 absolute top-24   left-1/2 -translate-x-1/2 z-[999] w-full">

        <a
          href="https://t.me/REKT"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12"
        >
          <Image
            src="/assets/hero-section/tg.svg"
            alt="Telegram"
            fill
            className="object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
          />
          <span className="sr-only">Telegram</span>
        </a>


        <a
          href="https://twitter.com/REKT"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12"
        >
          <Image
            src="/assets/hero-section/socialmediax.svg"
            alt="Twitter / X"
            fill
            className="object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
          />
          <span className="sr-only">Twitter/X</span>
        </a>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-center">

          <div className="space-y-6 text-center lg:text-left">

            <div className="space-y-4">
              <div className="flex justify-center lg:justify-start group">
                <div className="relative">
                  <Image
                    src="/assets/hero-section/Rekts mascot.webp"
                    alt="REKT Mascot"
                    width={200}
                    height={200}
                    className="filter drop-shadow-lg animate-float hover:scale-110 hover:brightness-110 transition-all duration-300 cursor-pointer"
                  />
                  
                  <Image
                    src="/assets/hero-section/confitte.gif"
                    alt="Confetti animation"
                    width={300}
                    height={150}
                    unoptimized
                    className="absolute top-1/2 left-1/2 w-[300px] h-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: -5 }}
                  />

                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-xl -z-10 rounded-full"></div>
                </div>
              </div>
              

              <h1 className="text-4xl lg:text-5xl font-primary font-bold text-white leading-tight">
                {t('hero.title')}
              </h1>
              

              <h2 className="text-xl lg:text-2xl font-secondary text-gray-300">
                {t('hero.subtitle')}
              </h2>
            </div>
            

            <div className="relative bg-black/20 border border-cyan-400/50 rounded-xl p-6 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <Image
                  src="/assets/hero-section/how to buy background.webp"
                  alt="How to Buy Background"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10 rounded-xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-primary font-bold mb-4 text-cyan-400 flex items-center justify-center lg:justify-start">
                  <span className="mr-2">💡</span>
                  {t('howToBuy.title')}
                </h3>
                <ol className="space-y-3 text-gray-200">
                  <li className="flex items-center justify-center lg:justify-start">
                    <span className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mr-3">1</span>
                    {t('howToBuy.steps.connectWallet')}
                  </li>
                  <li className="flex items-center justify-center lg:justify-start">
                    <span className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mr-3">2</span>
                    {t('howToBuy.steps.choosePayment')}
                  </li>
                  <li className="flex items-center justify-center lg:justify-start">
                    <span className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mr-3">3</span>
                    {t('howToBuy.steps.enterAmount')}
                  </li>
                  <li className="flex items-center justify-center lg:justify-start">
                    <span className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold mr-3">4</span>
                    {t('howToBuy.steps.confirmTransaction')}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          

          <div className="flex justify-center items-end relative h-full min-h-[800px] lg:min-h-[900px] xl:min-h-[8  00px]">
            <Image
              src="/assets/hero-section/rekt_transparent bg-1.gif"
              alt="REKT Animation"
              width={800}
              height={800}
              unoptimized
              sizes="(min-width: 1536px) 1000px, (min-width: 1280px) 850px, (min-width: 1024px) 700px, 100vw"
              className="w-full max-w-[700px] xl:max-w-[850px] 2xl:max-w-[1000px] h-auto animate-pulse opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-500 cursor-pointer mb-2 lg:mb-10"
            />
          </div>
          

          <div className="flex justify-center lg:justify-center lg:ml-4 xl:ml-8">
            <div className="relative lg:mt-8 xl:mt-16">
              <PresaleCard />
            </div>
          </div>
        </div>
        
        <div className="container relative z-10">
        </div>
      </div>
      

      <div className="hidden">
        <Image
          src="/assets/hero-section/confitte.gif"
          alt="Confetti"
          width={40}
          height={40}
          className="opacity-60"
        />
      </div>
      <div className="absolute top-1/3 right-20 animate-float hover:scale-125 hover:-rotate-12 transition-all duration-300 cursor-pointer" style={{ animationDelay: '1s' }}>
        <Image
          src="/assets/rekt_confetti_3-3583c4.webp"
          alt="Confetti"
          width={30}
          height={30}
          className="opacity-60"
        />
      </div>
      <div
        className="absolute bottom-[120px] -left-3 animate-float hover:scale-110 transition-all duration-300 cursor-pointer rotate-180"
        style={{ animationDelay: '2s' }}
      >
        <Image
          src="/assets/hero-section/rocket.gif"
          alt="Rocket launching mirrored"
          width={167}
          height={167}
          unoptimized
          className="opacity-80 w-[167px] h-[167px]"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>
      <div className="absolute bottom-[160px] right-6 animate-float hover:scale-110 transition-all duration-300 cursor-pointer rotate-180" style={{ animationDelay: '2.5s' }}>
        <Image
          src="/assets/hero-section/rocket.gif"
          alt="Rocket launching mirrored right"
          width={250}
          height={250}
          unoptimized
          className="opacity-80 w-[250px] h-[250px]"
          style={{ transform: 'scaleY(-1) scaleX(-1)' }}
        />
      </div>
      <div className="absolute top-1/2 right-10 animate-float hover:scale-125 hover:rotate-180 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.5s' }}>
        <Image
          src="/assets/rekt_coindust.webp"
          alt="Coin Dust"
          width={35}
          height={35}
          className="opacity-50"
        />
      </div>
      
      
    </section>
  )
}

 


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="hero">
        <div className="block lg:hidden">
          <HeroMobile />
        </div>
        <div className="hidden lg:block">
          <HeroSection />
        </div>
      </div>
      <AsSeenOnSection />
      <div id="tokenomics"><RektonomicsSection /></div>
      <div id="lossclaim" className="min-h-[50px]"></div>
      <div id="staking" className="min-h-[50px]"></div>
      <div id="leaderboard"><LeaderboardSection /></div>
      <div id="team"><TeamSection /></div>
      <div id="roadmap"><RoadmapSection /></div>
      <div id="whitepaper"><WhitepaperSection /></div>
      <div id="faq"><FAQSection /></div>
      <Footer />
    </main>
  )
}