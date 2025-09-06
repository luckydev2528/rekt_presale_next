import Image from 'next/image'

export default function AsSeenOnMobile() {
  const logos = [
    '/assets/hero-section/Betecho.svg',
    '/assets/hero-section/Bitcoin.svg',
    '/assets/hero-section/coin-telegraph 1.svg',
    '/assets/hero-section/Bitget.svg'
  ]

  return (
    <div className="w-full overflow-hidden h-[48px] mt-1 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900" />
      <div className="relative z-10 flex items-center h-full">
        <div className="flex animate-marquee-scroll">
          {/* Duplicate the logos array to create seamless loop */}
          {[...logos, ...logos].map((src, index) => (
            <div key={index} className="flex items-center justify-center mx-8 flex-shrink-0">
              <Image
                src={src}
                alt="As seen on logo"
                width={90}
                height={24}
                className="h-5 w-auto object-contain opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .animate-marquee-scroll {
          animation: marquee-scroll 20s linear infinite;
          display: flex;
          width: max-content;
        }
        
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
