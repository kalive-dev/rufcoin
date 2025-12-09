import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";

const HowToBuySection = () => {
  return (
    <section
      id="tasks"
      className="min-h-screen w-full py-16 sm:py-20 md:py-24 relative overflow-hidden flex items-center justify-center bg-transparent z-9"
      style={{ isolation: "isolate" }}
    >
      {/* Additional Parallax Elements */}
      <Parallax
        speed={-20}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-[white]/25 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-2/3 left-1/5 w-12 h-12 bg-accent/30 rounded-full blur-md animate-pulse" />
      </Parallax>

      {/* Content */}
      <Parallax
        speed={-10}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center transform-gpu"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-glow text-mission">
              TASKS & ACTIONS
            </h2>
            <p className="text-lg sm:text-xl text-primary font-skmodernist mb-2">
              Everything that earns you XP: dailies, socials, referrals,
              quests and comments.
            </p>
            <div className="w-24 h-1  mx-auto rounded-full" />
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 max-w-6xl mx-auto pointer-events-none text-left">
            {/* Daily actions */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <Card className="bg-card/30 backdrop-blur-sm border border-primary/20 p-5 sm:p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-500">
                <div className="mb-3 text-xs text-mission text-muted-foreground">
                  [ DAILY ACTIONS ]
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <span className="font-semibold text-primary">
                      Daily login — 5 XP
                    </span>
                  </li>
                  <li>
                    7 days of consecutive logins —{" "}
                    <span className="font-semibold">35 XP</span>
                  </li>
                  <li>
                    30 days of consecutive logins —{" "}
                    <span className="font-semibold">180 XP</span>
                  </li>
                  <li>
                    Connect wallet —{" "}
                    <span className="font-semibold">25 XP</span>
                  </li>
                  <li>
                    Daily free spin —{" "}
                    <span className="font-semibold">1 / 3 / 5 / 10 XP</span>{" "}
                    (10 XP is the rarest outcome)
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Socials & referrals */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Card className="bg-card/30 backdrop-blur-sm border border-primary/20 p-5 sm:p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-500">
                <div className="mb-3 text-xs text-mission text-muted-foreground">
                  [ SOCIALS / REFERRALS ]
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    Follow on Twitter —{" "}
                    <span className="font-semibold">10 XP</span>
                  </li>
                  <li>
                    Join Telegram —{" "}
                    <span className="font-semibold">20 XP</span>
                  </li>
                  <li>
                    Referral system:
                    <br />
                    for each invited user —{" "}
                    <span className="font-semibold">50 XP</span>
                  </li>
                  <li className="text-[11px] text-muted-foreground">
                    Additionally, if we track that a referral deposits up to the
                    Silver level, we can give{" "}
                    <span className="font-semibold text-foreground">
                      150 XP
                    </span>
                    .
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Quest chains & comments */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Card className="bg-card/30 backdrop-blur-sm border border-primary/20 p-5 sm:p-6 hover:border-primary/60 hover:shadow-glow transition-all duration-500">
                <div className="mb-3 text-xs text-mission text-muted-foreground">
                  [ QUESTS / COMMENTS ]
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    Quest chain (example):
                    <br />
                    connect wallet + 1 swap + hold 20 USDT for 3 days —{" "}
                    <span className="font-semibold">120 XP</span>
                  </li>
                  <li>
                    Comments under a tweet:
                    <br />
                    first — 30 XP, second — 20 XP, third — 20 XP, cap —{" "}
                    <span className="font-semibold">70 XP per week</span>, at
                    least 3 words.
                  </li>
                  <li className="text-[11px] text-muted-foreground">
                    Comment link verification can be mostly formal (valid link,
                    same Twitter account, correct tweet), while the front-end
                    can simply simulate deep checks.
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg mb-6 sm:mb-8 text-foreground pointer-events-none max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            All actions above are just XP sources. Conversion XP → RUF will be
            handled by a separate mechanic with a 0.5–0.6 coefficient and a
            $0.03–0.05 price range to create constant FOMO for every missed
            quest.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              variant="mission"
              size="lg"
              onClick={() =>
                document
                  .getElementById("xp-dashboard")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Go to XP spin
            </Button>
            <span className="text-sm text-muted-foreground">
              All rewards are calculated on the front-end, without custody or
              control of funds.
            </span>
          </motion.div>

          {/* Navigation Indicators */}
          <motion.div
            className="flex items-center justify-between mt-8 sm:mt-12 text-xs text-muted-foreground text-mission pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span>→ daily / social / quests</span>
            <span>XP FLOW ←</span>
          </motion.div>
        </motion.div>
      </Parallax>
    </section>
  );
};

export default HowToBuySection;
