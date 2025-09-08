"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import LeaderboardMobile from "./LeaderboardMobile";
import { useIsMobile } from "@/components/Rektonomics/utils/useIsMobile";


export default function LeaderboardSection() {
  const t = useTranslations('sections');
  const router = useRouter();
  const isMobile = useIsMobile();

  const COLORS = {
    headerBg: "#00a0b0",
    rowStandard: "#3a2a5e",
    rank1: "#40e0d0",
    rank2: "#3b5998",
    rank3: "#8b4513",
    textPrimary: "#ffffff",
    textAccent: "#ff4d4d",
    pillBg: "rgba(0, 160, 176, 0.5)",
    pillBorder: "#00a0b0",
  } as const;

  type LeaderboardEntry = {
    rank: number;
    wallet: string;
    rektScore: number;
    totalLosses: number;
    purchase: number;
  };

  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (isMobile) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        if (!res.ok) throw new Error(t('leaderboard.error'));
        const json = (await res.json()) as LeaderboardEntry[];
        if (!cancelled) setRows(json);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  const formatNumber = (n: number) => n.toLocaleString(undefined);
  const formatCurrency = (n: number) =>
    `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const rowBgForRank = (rank: number) => {
    if (rank === 1) return COLORS.rank1;
    if (rank === 2) return COLORS.rank2;
    if (rank === 3) return COLORS.rank3;
    return COLORS.rowStandard;
  };


  const rowBgSoftForRank = (rank: number) => {
    if (rank === 1) return "rgba(64, 224, 208, 0.22)"; // teal
    if (rank === 2) return "rgba(59, 89, 152, 0.25)"; // blue
    if (rank === 3) return "rgba(139, 69, 19, 0.28)"; // bronze
    return "rgba(58, 42, 94, 0.22)"; // standard
  };


  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative w-full p-0 m-0">
          <LeaderboardMobile />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative mt-8">
      <div className="relative max-w-7xl xl:max-w-screen-2xl mx-auto px-4">
        <Image
          src="/assets/leaderboard/frams.svg"
          alt="Loser Leaderboard"
          width={2000}
          height={800}
          className="w-full h-auto"
          priority
        />

        
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-start justify-center">
          <div className="mt-[80px] flex flex-col items-center justify-start">
            <div className="text-white text-[36px] font-display text-white  font-normal">{t('leaderboard.title')}</div>
            <div className="text-white text-[28px] ">{t('leaderboard.subtitle')}</div>
          </div>
        </div>


        <div className="absolute left-1/2 -translate-x-1/2 top-[24%] md:top-[23%] lg:top-[22%] w-[92%] md:w-[88%] lg:w-[82%] bottom-[14%] overflow-hidden z-20">
          <div
            className="relative h-full w-full rounded-xl overflow-hidden backdrop-blur-sm border-2 shadow-[0_0_20px_rgba(138,43,226,0.35)]"
            style={{
              borderColor: "#00d1ff",
              boxShadow: "0 0 18px rgba(0, 209, 255, 0.35), 0 0 28px rgba(138, 43, 226, 0.25)",
              backgroundColor: "rgba(26, 15, 43, 0.45)",
            }}
          >
            
            <div className="absolute inset-x-0 top-0 h-[4px] bg-[#00d1ff] shadow-[0_0_10px_rgba(0,209,255,0.8)]" />
            
            <div className="absolute top-0 bottom-0 left-4 right-4 pointer-events-none z-[1]">
              <div className="absolute top-0 bottom-0 left-[20%] w-px bg-[rgba(0,209,255,0.18)]" />
              <div className="absolute top-0 bottom-0 left-[40%] w-px bg-[rgba(0,209,255,0.18)]" />
              <div className="absolute top-0 bottom-0 left-[60%] w-px bg-[rgba(0,209,255,0.18)]" />
              <div className="absolute top-0 bottom-0 left-[80%] w-px bg-[rgba(0,209,255,0.18)]" />
            </div>
            
            
            <div
              className="px-4 py-3 sticky top-0 z-10 backdrop-blur-sm"
              style={{
                background: "linear-gradient(180deg, rgba(0,209,255,0.12) 0%, rgba(44,29,74,0.65) 100%)",
                color: COLORS.textPrimary,
                borderBottom: "1px solid rgba(0, 209, 255, 0.25)",
              }}
            >
              <div className="grid grid-cols-5 text-sm font-semibold divide-x divide-[rgba(0,209,255,0.18)]">
                <div className="px-2">{t('leaderboard.columns.rank')}</div>
                <div className="px-2">{t('leaderboard.columns.loser')}</div>
                <div className="px-2 text-right">{t('leaderboard.columns.rektScore')}</div>
                <div className="px-2 text-right">{t('leaderboard.columns.totalLosses')}</div>
                <div className="px-2 text-right">{t('leaderboard.columns.purchase')}</div>
              </div>
            </div>

            
            <div className="h-[calc(100%-48px)] overflow-y-auto relative z-[2]">
              {loading && (
                <div className="p-6 text-center" style={{ color: COLORS.textPrimary }}>
                  {t('leaderboard.loading')}
                </div>
              )}
              {error && !loading && (
                <div className="p-6 text-center text-red-400">{error}</div>
              )}
              {!loading && !error && rows.length === 0 && (
                <div className="p-6 text-center" style={{ color: COLORS.textPrimary }}>
                  {t('leaderboard.noData')}
                </div>
              )}

              {!loading && !error &&
                rows.map((r) => (
                  <div
                    key={r.rank}
                    className="px-4 py-2 grid grid-cols-5 items-center divide-x divide-[rgba(0,209,255,0.12)]"
                    style={{
                      backgroundColor: rowBgSoftForRank(r.rank),
                      color: COLORS.textPrimary,
                      borderBottom: "1px solid rgba(0, 209, 255, 0.2)",
                    }}
                  >
                    <div className="px-2 flex items-center gap-2">
                      <span className="text-base">
                        {r.rank === 1
                          ? "🥇 1"
                          : r.rank === 2
                          ? "🥈 2"
                          : r.rank === 3
                          ? "🥉 3"
                          : r.rank >= 4 && r.rank <= 10
                          ? (
                              <>
                                <span className="text-gray-400 text-xs mr-2">#{r.rank}</span>
                                <span className="font-semibold">{r.rank}</span>
                              </>
                            )
                          : `#${r.rank}`}
                      </span>
                    </div>
                    <div className="px-2 font-medium min-w-0 flex items-center gap-2">
                      <Image
                        src="/assets/leaderboard/Loser%20icon.svg"
                        alt="Loser icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full shrink-0"
                      />
                      <span className="truncate" title={r.wallet}>{r.wallet}</span>
                    </div>
                    <div className="px-2 text-right">
                      <span
                        className="inline-block"
                        style={{
                          backgroundColor: COLORS.pillBg,
                          borderRadius: 16,
                          padding: "4px 10px",
                          border: `1px solid ${COLORS.pillBorder}`,
                        }}
                      >
                        {formatNumber(r.rektScore)}
                      </span>
                    </div>
                    <div className="px-2 text-right">
                      <span
                        className="inline-block"
                        style={{
                          backgroundColor: COLORS.pillBg,
                          borderRadius: 16,
                          padding: "4px 10px",
                          border: `1px solid ${COLORS.pillBorder}`,
                          color: COLORS.textAccent,
                        }}
                      >
                        {formatCurrency(r.totalLosses)}
                      </span>
                    </div>
                    <div className="px-2 text-right">
                      <span
                        className="inline-block"
                        style={{
                          backgroundColor: COLORS.pillBg,
                          borderRadius: 16,
                          padding: "4px 10px",
                          border: `1px solid ${COLORS.pillBorder}`,
                        }}
                      >
                        {formatCurrency(r.purchase)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        
        <div className="pointer-events-none absolute left-10 top-[8%] w-40 h-40 z-10">
          <Image
            src="/assets/leaderboard/Animation%20bothside%20Loser%20Leaderboard.gif"
            alt="Leaderboard side animation left"
            fill
            unoptimized
            aria-hidden
            className="object-contain scale-x-[-1]"
          />
        </div>
        <div className="pointer-events-none absolute right-10 top-[8%] w-40 h-40 z-10">
          <Image
            src="/assets/leaderboard/Animation%20bothside%20Loser%20Leaderboard.gif"
            alt="Leaderboard side animation right"
            fill
            unoptimized
            aria-hidden
            className="object-contain"
          />
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 ml-[-2px] bottom-[8%] md:bottom-[8%] lg:bottom-[8%] z-[60]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t('leaderboard.buttons.refreshLeaderboard')}
              onClick={() => router.refresh()}
              className="block cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 relative "
            >
              <Image
                src="/assets/leaderboard/button.svg"
                alt={t('leaderboard.buttons.refreshLeaderboard')}
                width={200}
                height={48}
                unoptimized
                priority
                className="object-contain drop-shadow-[0_0_12px_rgba(0,255,255,0.35)]"
              />
              <div className="absolute text-white text-[14px] font-display font-normal top-0 left-0 right-0 bottom-0
                 flex items-center justify-center
              " >
                {t('leaderboard.buttons.refreshLeaderboard')}
              </div>
            </button>
            <Link
              href="/loss-claim"
              aria-label={t('leaderboard.buttons.claimYourLoss')}
              className="relative block cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Image
                src="/assets/leaderboard/button.svg"
                alt={t('leaderboard.buttons.claimYourLoss')}
                width={200}
                height={48}
                unoptimized
                priority
                className="object-contain drop-shadow-[0_0_12px_rgba(0,255,255,0.35)]"
              />
              <div className="absolute text-white text-[14px] font-display font-normal top-0 left-0 right-0 bottom-0
                 flex items-center justify-center
              " >
                {t('leaderboard.buttons.claimYourLoss')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

