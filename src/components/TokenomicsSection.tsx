import { Card } from "@/components/ui/card";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";

const TokenomicsSection = () => {
  return (
    <section
      id="holding-swap"
      className="relative overflow-hidden flex items-center justify-center bg-transparent z-40 py-16 sm:py-20 md:py-24 pb-32"
      style={{ isolation: "isolate" }}
    >
      {/* Dark Space Background */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Animated Stars */}
      <Parallax speed={-15} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary-glow rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-pulse opacity-80" />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/3 right-2/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse" />
      </Parallax>

      {/* Additional Parallax Elements */}
      <Parallax
        speed={-25}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-18 h-18 bg-[white]/15 rounded-full blur-xl animate-pulse" />
      </Parallax>

      {/* Content */}
      <Parallax
        speed={-12}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 text-center transform-gpu pb-24"
      >
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-8 text-sm text-mission text-muted-foreground">
            <span>→ HOLD / SWAP</span>
            <span>XP REWARDS ←</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-glow text-mission">
            HOLDING & SWAP REWARDS
          </h2>

          <p className="max-w-3xl mx-auto text-xs sm:text-sm text-muted-foreground">
            Everything a user does on-chain — deposit, holding, swaps — earns
            XP. Below is a basic payout table for holding balance and swap
            volume.
          </p>
        </motion.div>

        {/* Main XP Rewards Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 max-w-5xl mx-auto pointer-events-none text-left">
          {/* Daily holding */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card/30 backdrop-blur-sm border border-primary/20 p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-300 pointer-events-none">
              <div className="mb-3 text-xs text-mission text-muted-foreground">
                [ DAILY HOLDING ]
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-3">
                Daily payouts based on total deposit on the connected wallet:
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1.5">
                  <span>10–49 USDT</span>
                  <span className="font-mono text-primary">2 XP / day</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1.5">
                  <span>50–199 USDT</span>
                  <span className="font-mono text-primary">6 XP / day</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1.5">
                  <span>200–599 USDT</span>
                  <span className="font-mono text-primary">20 XP / day</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1.5">
                  <span>600–1 999 USDT</span>
                  <span className="font-mono text-primary">80 XP / day</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Weekly / Monthly holding */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card/30 backdrop-blur-sm border border-primary/20 p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-300 pointer-events-none">
              <div className="mb-3 text-xs text-mission text-muted-foreground">
                [ WEEKLY / MONTHLY ]
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-3">
                Additional XP payouts at the end of the holding period:
              </div>
              <div className="space-y-3 text-[11px] sm:text-xs">
                <div>
                  <div className="mb-1 text-muted-foreground">
                    Weekly payout:
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1">
                      <span>10–49 USDT</span>
                      <span className="font-mono text-primary">8 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1">
                      <span>50–199 USDT</span>
                      <span className="font-mono text-primary">20 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1">
                      <span>200–599 USDT</span>
                      <span className="font-mono text-primary">60 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1">
                      <span>600–1 999 USDT</span>
                      <span className="font-mono text-primary">200 XP</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">
                    Monthly payout:
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1">
                      <span>10–49 USDT</span>
                      <span className="font-mono text-primary">30 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1">
                      <span>50–199 USDT</span>
                      <span className="font-mono text-primary">80 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/30 rounded-md px-3 py-1">
                      <span>200–599 USDT</span>
                      <span className="font-mono text-primary">250 XP</span>
                    </div>
                    <div className="flex items-center justify-between bg-black/40 rounded-md px-3 py-1">
                      <span>600–1 999 USDT</span>
                      <span className="font-mono text-primary">900 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Swap rewards */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full justify-center items-center bg-card/30 backdrop-blur-sm border border-primary/20 p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-300 pointer-events-none">
              <div className="mb-3 text-xs text-mission text-muted-foreground text-left">
                [ SWAP REWARDS ]
              </div>
              <div className="space-y-3 text-[11px] sm:text-xs text-left">
                <div>
                  <div className="mb-1 text-muted-foreground">
                    Bonuses for first swaps:
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>first swap from 20 USDT → +80 XP</li>
                    <li>second swap → +40 XP</li>
                    <li>third swap → +30 XP</li>
                  </ul>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">
                    Bonuses for total volume:
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>100 USDT total volume → +60 XP</li>
                    <li>500 USDT → +180 XP</li>
                    <li>2 000 USDT → +600 XP</li>
                    <li>5 000 USDT → +1 500 XP</li>
                  </ul>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Swaps must be done from a{" "}
                  <span className="font-semibold text-foreground">
                    connected wallet
                  </span>
                  . We never custody funds or control them — we only read
                  on-chain data to calculate XP.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Footer note */}
        <div className="mb-6 sm:mb-8 pointer-events-none">
          <Card className="bg-card/20 backdrop-blur-sm border border-primary/30 p-4 sm:p-6 inline-block pointer-events-none">
            <div className="text-center">
              <div className="text-sm text-mission text-muted-foreground mb-2">
                HOLDING + SWAP COMBINATIONS
              </div>
              <div className="font-skmodernist text-xs sm:text-sm text-primary max-w-xl">
                Quest chains (for example, holding 20 USDT for 3 days + 1 swap)
                can aggregate XP from several tables and add a fixed bonus on
                top. This amplifies FOMO and motivates users to keep funds in
                the system.
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between text-xs text-mission text-muted-foreground pointer-events-none">
          <span>HOLD &amp; SWAP ECONOMY</span>
          <span>XP ONLY</span>
          <span>NO CUSTODY</span>
        </div>
      </Parallax>
    </section>
  );
};

export default TokenomicsSection;

