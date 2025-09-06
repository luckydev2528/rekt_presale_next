"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const firstRowLinks = [
  "tokenomics",
  "roadmap", 
  "faq",
  "whitepaper",
  "audit"
];

const secondRowLinks = ["leaderboard", "lossClaim", "staking"];

export default function FooterMobile() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const router = useRouter();

  const handleLinkClick = (link: string) => {
    if (link === "lossClaim" || link === "staking") {
      const targetRoute = link === "lossClaim" ? "/loss-claim" : "/staking";
      router.push(targetRoute);
      return;
    }
    const targetId = link.toLowerCase().replace(/\s+/g, "");
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-purple-900/20">

      <div className="relative bg-[#3e008c] py-2 px-3 overflow-hidden">
        <div className="inline-block animate-scroll-infinite whitespace-nowrap text-[13px]">
          <span className="text-cyan-400 font-primary font-bold mr-1">Disclaimer:</span>
          Meme coin with utility. No guaranteed profits. Not financial advice. Use at your own risk. &nbsp; • &nbsp;
          <span className="text-cyan-400 font-primary font-bold mr-1">Disclaimer:</span>
          Meme coin with utility. No guaranteed profits. Not financial advice. Use at your own risk. &nbsp; • &nbsp;
          <span className="text-cyan-400 font-primary font-bold mr-1">Disclaimer:</span>
          Meme coin with utility. No guaranteed profits. Not financial advice. Use at your own risk. &nbsp; • &nbsp;
          <span className="text-cyan-400 font-primary font-bold mr-1">Disclaimer:</span>
          Meme coin with utility. No guaranteed profits. Not financial advice. Use at your own risk.
        </div>
      </div>


      <div className="relative py-8 w-full">

        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Image src="/assets/bg-2-1.webp" alt="Background" fill className="object-cover" />
        </div>

        <div className="relative z-10 max-w-md mx-auto">

          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/footer/logocoin%201.webp"
                alt="$REKT Mascot"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-cyan-400 font-bold text-lg">$</span>
                  <span className="text-white font-bold text-lg">REKT</span>
                </div>
                <p className="text-white text-xs leading-relaxed max-w-[200px]">
                  The revolutionary meme coin that turns your crypto losses into gains. Only losers win in the $REKT ecosystem.
                </p>
              </div>
            </div>


            <div className="flex space-x-3">

              <a
                href="https://t.me/REKT"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10"
              >
                <Image
                  src="/assets/hero-section/tg.svg"
                  alt="Telegram"
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
                <span className="sr-only">Telegram</span>
              </a>


              <a
                href="https://twitter.com/REKT"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10"
              >
                <Image
                  src="/assets/hero-section/socialmediax.svg"
                  alt="X"
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
                <span className="sr-only">Twitter/X</span>
              </a>
            </div>
          </div>




          <div className="text-center space-y-4 mb-6">

            <div className="flex flex-wrap justify-center gap-4">
              {firstRowLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className="text-white text-sm hover:text-cyan-400 transition-colors"
                >
                  {t(`links.${link}`)}
                </button>
              ))}
            </div>
            

            <div className="flex flex-wrap justify-center gap-4">
              {secondRowLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className="text-white text-sm hover:text-cyan-400 transition-colors"
                >
                  {t(`links.${link}`)}
                </button>
              ))}
            </div>
          </div>


          <div className="border-t border-cyan-400 pt-4">
            <p className="text-white text-center text-xs">
              Copyright © $REKT {year}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
