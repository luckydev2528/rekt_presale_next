"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const firstRowLinks = [
  "tokenomics",
  "roadmap",
  "faq",
  "whitepaper",
  "audit",
  "leaderboard",
];

const secondRowLinks = ["lossClaim", "staking"];

export default function FooterSection() {
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
    <footer className="relative pt-0 pb-6 mt-0 border-t border-purple-500/50 overflow-hidden">
      {/* Disclaimer Banner */}
      <div className="w-full overflow-hidden bg-[#3e008c] py-2 px-3 lg:px-4">
        <div className="inline-block animate-scroll-infinite whitespace-nowrap text-[13px]">
          <span className="text-[var(--text-accent)] font-primary font-bold mr-1">{t('disclaimer')}</span>
          &nbsp; • &nbsp;
          <span className="text-[var(--text-accent)] font-primary font-bold mr-1">{t('disclaimer')}</span>
          &nbsp; • &nbsp;
          <span className="text-[var(--text-accent)] font-primary font-bold mr-1">{t('disclaimer')}</span>
          &nbsp; • &nbsp;
          <span className="text-[var(--text-accent)] font-primary font-bold mr-1">{t('disclaimer')}</span>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image src="/assets/bg-2-1.webp" alt="Background" fill className="object-cover" />
      </div>

      <div className="relative z-10 w-full px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 py-8 items-start">
        {/* Left Section */}
        <div className="max-w-sm space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/footer/logocoin%201.webp"
              alt="$REKT Coin"
              width={48}
              height={48}
              className="w-10 h-10"
            />
            <Image
              src="/assets/footer/Rekt%20wordmark%201.webp"
              alt="$REKT"
              width={120}
              height={40}
              className="w-[120px] h-auto"
            />
          </div>
          <p className="text-gray-300 text-[13px] leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-col items-center lg:items-center lg:justify-self-center text-[13px] text-gray-300 space-y-2">
          <div className="flex flex-wrap justify-center gap-10">
            {firstRowLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="hover:text-cyan-400 transition-colors"
              >
                {t(`links.${link}`)}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-10">
            {secondRowLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="hover:text-cyan-400 transition-colors"
              >
                {t(`links.${link}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex flex-col items-start lg:items-end space-y-4 lg:justify-self-end">
          <h4 className="text-white font-primary text-lg tracking-wide font-bold">{t('socialTitle')}</h4>
          <div className="flex space-x-4">
            {/* Telegram */}
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
                className="object-contain transition-all duration-300 group-hover:scale-110"
              />
              <span className="sr-only">Telegram</span>
            </a>

            {/* Twitter/X */}
            <a
              href="https://twitter.com/REKT"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12"
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
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-8 pt-4 border-t border-purple-500/30 text-center text-xs text-white px-3 lg:px-6">
        {t('copyright', { year })}
      </div>
    </footer>
  );
}
