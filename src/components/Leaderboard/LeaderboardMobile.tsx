"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type LeaderboardEntry = {
  rank: number;
  wallet: string;
  rektScore: number;
  totalLosses: number;
  purchase: number;
};

const COLORS = {
  textPrimary: "#ffffff",
  textAccent: "#ff4d4d",
  textCyan: "#13d2e6",
  pillBg: "rgba(0, 160, 176, 0.5)",
  pillBorder: "#00a0b0",
} as const;

export default function LeaderboardMobile() {
  const t = useTranslations('sections');
  const router = useRouter();
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load leaderboard");
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
  }, []);

  const formatNumber = (n: number) => n.toLocaleString(undefined);
  const formatCurrency = (n: number) =>
    `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const medalForRank = (rank: number) =>
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";


  const getCardStyles = (rank: number) => {
    if (rank === 1) {
      return {
        className:
          "rounded-xl border p-3 bg-gradient-to-r from-[#5B2ABF] via-[#6E2BF1] to-[#4B1A77] shadow-[0_0_12px_rgba(0,209,255,0.25)]",
        borderColor: "#00a0b0",
      } as const;
    }
    if (rank === 2) {
      return {
        className:
          "rounded-xl border p-3 bg-gradient-to-r from-[#0A3B69] via-[#134D8C] to-[#1A62A8] shadow-[0_0_12px_rgba(0,209,255,0.25)]",
        borderColor: "#00a0b0",
      } as const;
    }
    if (rank === 3) {
      return {
        className:
          "rounded-xl border p-3 bg-gradient-to-r from-[#5B3A2B] via-[#6E4A31] to-[#7B4B31] shadow-[0_0_12px_rgba(212,175,55,0.25)]",
        borderColor: "#D4AF37",
      } as const;
    }
    return {
      className: "rounded-xl border p-3 bg-transparent",
      borderColor: "rgba(0,160,176,0.55)",
    } as const;
  };

  return (
    <div className="py-2 relative" style={{ overflowX: 'hidden' }}>
      <div className="relative w-full">

        <Image
          src="/assets/Mobileview/leaderboard/leader_board.svg"
          alt="Loser Leaderboard (Mobile)"
          width={394}
          height={800}
          className="w-full h-auto"
          priority
        />


        <div className="pointer-events-none absolute left-2 top-[10%] w-[94px] h-[94px] z-10">
          <Image
            src="/assets/Mobileview/leaderboard/rekt_peeks.gif"
            alt="Leaderboard side animation left"
            fill
            unoptimized
            aria-hidden
            className="object-contain scale-x-[-1]"
          />
        </div>
        <div className="pointer-events-none absolute right-2 top-[10%] w-[94px] h-[94px] z-10">
          <Image
            src="/assets/Mobileview/leaderboard/rekt_peeks.gif"
            alt="Leaderboard side animation right"
            fill
            unoptimized
            aria-hidden
            className="object-contain"
          />
        </div>


        <div className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[88%] z-30">
          <div className="text-center mb-4">
            <h2 className="text-white text-2xl font-semibold mb-1">{t('leaderboard.title')}</h2>
            <p className="text-white/80 text-sm leading-snug">
              {t('leaderboard.subtitle')}
            </p>
          </div>
        </div>


        <div className="absolute left-1/2 -translate-x-1/2 top-[20%] w-[88%] bottom-[12%] z-20">

          <div className="relative h-full overflow-y-auto px-0.5">
            {loading && (
              <div className="p-4 text-center text-white">{t('leaderboard.loading')}</div>
            )}
            {error && !loading && (
              <div className="p-4 text-center text-red-400">{error}</div>
            )}
            {!loading && !error && rows.length === 0 && (
              <div className="p-4 text-center text-white">{t('leaderboard.noData')}</div>
            )}

            {!loading && !error && rows.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {rows.map((r) => {
                  const card = getCardStyles(r.rank);
                  return (
                    <div
                      key={r.rank}
                      className={card.className}
                      style={{ borderColor: card.borderColor }}
                    >

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex items-center gap-1 shrink-0">
                            {r.rank <= 3 ? (
                              <span className="text-base">
                                {medalForRank(r.rank)} {r.rank}
                              </span>
                            ) : (
                              <>
                                <span className="text-gray-400 text-xs">#{r.rank}</span>
                                <span className="text-white text-sm">{r.rank}</span>
                              </>
                            )}
                          </div>
                          <Image
                            src="/assets/leaderboard/Loser%20icon.svg"
                            alt="Loser icon"
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded-full shrink-0"
                          />
                          <div className="truncate text-white font-medium">
                            {r.wallet}
                          </div>
                        </div>
                        <span
                          className="text-[11px] text-white px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: COLORS.pillBg,
                            border: `1px solid ${COLORS.pillBorder}`,
                          }}
                        >
                          {formatNumber(r.rektScore)}
                        </span>
                      </div>


                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <div className="text-left">
                          <div className="text-[20px] font-semibold" style={{ color: COLORS.textAccent }}>
                            {formatCurrency(r.totalLosses)}
                          </div>
                          <div className="text-white/70 text-sm">Losses</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[20px] font-semibold" style={{ color: COLORS.textCyan }}>
                            {formatCurrency(r.purchase)}
                          </div>
                          <div className="text-white/70 text-sm">Purchases</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}


            <div className="text-center text-white/80 text-sm mt-4 pb-2">See more ▾</div>
          </div>
        </div>


        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] z-50">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Refresh Leaderboard"
              onClick={() => router.refresh()}
              className="block cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Image
                src="/assets/leaderboard/button.svg"
                alt="Refresh Leaderboard"
                width={180}
                height={51}
                unoptimized
                priority
                className="w-[180px] h-[51px] object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              />
            </button>
            <Link
              href="/loss-claim"
              aria-label="Open Loss Claim"
              className="block cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Image
                src="/assets/leaderboard/button2.svg"
                alt="Open Loss Claim"
                width={180}
                height={51}
                unoptimized
                priority
                className="w-[180px] h-[51px] object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
