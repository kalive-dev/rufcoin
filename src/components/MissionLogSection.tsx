import { Card } from "@/components/ui/card";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";

const MissionLogSection = () => {
  return (
    <section
      id="rewards"
      className="relative overflow-hidden flex items-center justify-center z-30 py-16 sm:py-20 md:py-24 pb-32"
      style={{ isolation: "isolate" }}
    >
      {/* Background Layer */}
      <Parallax
        speed={-20}
        className="absolute inset-0 bg-transparent transform-gpu"
      />

      {/* Additional Parallax Elements */}
      <Parallax
        speed={-30}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/3 left-1/5 w-20 h-20 bg-primary/15 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-16 h-16 bg-[white]/25 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-2/3 left-1/2 w-12 h-12 bg-accent/20 rounded-full blur-md animate-pulse" />
      </Parallax>

      {/* Content */}
      <Parallax
        speed={-18}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 transform-gpu pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start pointer-events-none">
          {/* Left Side - Ranks */}
          <motion.div
            className="pointer-events-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-mission text-muted-foreground">
                  RUF XP RANKS
                </span>
                <span className="text-sm text-mission text-muted-foreground">
                  BRONZE → BRILLIANT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-mission">
                Ranks and rank-based rewards
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed">
              <p>
                Ranks are built on accumulated XP and unlock additional rewards
                for reaching each level. The higher the rank, the stronger the
                feeling of missed opportunity for those who lag behind.
              </p>

              <Card className="bg-card/30 backdrop-blur-sm border border-primary/30 p-4 sm:p-6 pointer-events-none">
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-[10px] sm:text-xs text-muted-foreground text-mission">
                    <span>Rank</span>
                    <span>XP range</span>
                    <span className="text-center">Reach reward</span>
                    <span className="text-right">Note</span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="grid grid-cols-4 gap-2 items-center py-1.5 rounded-md bg-black/30">
                      <span className="font-semibold text-foreground">
                        Bronze
                      </span>
                      <span>0 – 999 XP</span>
                      <span className="text-center font-mono">0 XP</span>
                      <span className="text-right text-muted-foreground">
                        starting point
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-center py-1.5 rounded-md bg-black/40">
                      <span className="font-semibold text-foreground">
                        Silver
                      </span>
                      <span>1 000 – 4 999 XP</span>
                      <span className="text-center font-mono">+100 XP</span>
                      <span className="text-right text-muted-foreground">
                        minimum referral level
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-center py-1.5 rounded-md bg-black/30">
                      <span className="font-semibold text-foreground">
                        Gold
                      </span>
                      <span>5 000 – 19 999 XP</span>
                      <span className="text-center font-mono">+400 XP</span>
                      <span className="text-right text-muted-foreground">
                        FOMO starts to hurt
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-center py-1.5 rounded-md bg-black/40">
                      <span className="font-semibold text-foreground">
                        Brilliant
                      </span>
                      <span>20 000 – 49 999 XP</span>
                      <span className="text-center font-mono">+1 200 XP</span>
                      <span className="text-right text-muted-foreground">
                        RUF farming elite
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Additionally, you can issue{" "}
                <span className="font-semibold text-foreground">
                  rank points
                </span>{" "}
                (separate from XP) purely for status and FOMO. They don&apos;t
                convert back into tokens but highlight the &quot;missed&quot;
                upside.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Referral & Wallet */}
          <motion.div
            className="pointer-events-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="bg-card/30 backdrop-blur-sm border border-primary/30 p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm text-mission text-muted-foreground">
                  [ REFERRAL SYSTEM ]
                </span>
                <span className="text-xs text-muted-foreground">
                  XP for invitations
                </span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  For every invited user, the referrer receives{" "}
                  <span className="font-semibold">50 XP</span>. If we can track
                  that the referral deposits up to Silver level (on-chain), we
                  add another{" "}
                  <span className="font-semibold">150 XP</span> for a
                  high-quality participant.
                </p>
                <p className="text-muted-foreground text-[11px] sm:text-xs">
                  In production, referrals should be tied to a connected wallet
                  and signature, not just to a link — to minimise multi-account
                  abuse.
                </p>
              </div>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border border-primary/30 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm text-mission text-muted-foreground">
                  [ WALLETS & ON-CHAIN ]
                </span>
                <span className="text-xs text-muted-foreground">
                  TRX / EVM / others
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  A user connects with any supported wallet (TRX, EVM, other
                  networks), makes swaps, holds balance and earns XP for
                  on-chain activity.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>connect wallet — +25 XP</li>
                  <li>first deposit / minimum deposit — separate quests</li>
                  <li>we see wallet rank, activity and XP</li>
                </ul>
                <p className="text-[11px] text-muted-foreground">
                  We do not custody or manage any funds — we only read
                  on-chain activity to calculate XP and ranks.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default MissionLogSection;

