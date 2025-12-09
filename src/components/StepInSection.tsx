import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";

const StepInSection = () => {
  const [xp, setXp] = useState(5_000);
  const [coef, setCoef] = useState(0.55);
  const [price, setPrice] = useState(0.04);

  const tokens = xp * coef;
  const usd = tokens * price;

  return (
    <section
      id="calculator"
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-space z-50"
      style={{ isolation: "isolate" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Additional Parallax Elements */}
      <Parallax
        speed={-35}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-[white]/30 rounded-full blur-md animate-pulse" />
      </Parallax>

      {/* Content */}
      <Parallax
        speed={-5}
        className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 transform-gpu py-16 sm:py-20 md:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center lg:items-end pointer-events-none">
          {/* Left Side - Explanation */}
          <motion.div
            className="pointer-events-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="text-sm text-mission text-muted-foreground mb-2">
                RUF XP CALCULATOR
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 text-glow text-mission leading-tight">
                HOW MUCH IS YOUR XP WORTH?
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base">
              <p>
                Here you get an approximate calculation of how many{" "}
                <span className="font-semibold text-primary">RUF</span> tokens
                and what dollar value your XP could give at conversion.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Token price range:{" "}
                <span className="font-semibold text-foreground">
                  0.03–0.05 $
                </span>
                . XP → RUF conversion coefficient:{" "}
                <span className="font-semibold text-foreground">
                  0.5–0.6
                </span>
                . The actual coefficient and price will be announced separately
                to boost FOMO.
              </p>

              <div className="pointer-events-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 hover:scale-105 transition-transform duration-300 w-full sm:w-auto max-w-sm sm:max-w-none"
                  onClick={() =>
                    document
                      .getElementById("xp-dashboard")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Back to XP dashboard
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Calculator */}
          <motion.div
            className="text-center lg:text-right pointer-events-auto mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="text-sm text-mission text-muted-foreground mb-3 text-left lg:text-right">
              Enter your XP and play with the coefficient
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-primary/30 rounded-xl p-4 sm:p-6 space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm text-muted-foreground">
                  Your XP
                </label>
                <Input
                  type="number"
                  min={0}
                  value={xp}
                  onChange={(e) => setXp(Number(e.target.value) || 0)}
                  className="bg-black/60 border-primary/30 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-muted-foreground">
                    XP → RUF coefficient (0.5–0.6)
                  </label>
                  <Input
                    type="number"
                    step={0.01}
                    min={0.5}
                    max={0.6}
                    value={coef}
                    onChange={(e) =>
                      setCoef(
                        Math.min(0.6, Math.max(0.5, Number(e.target.value) || 0)),
                      )
                    }
                    className="bg-black/60 border-primary/30 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-muted-foreground">
                    RUF price (0.03–0.05 $)
                  </label>
                  <Input
                    type="number"
                    step={0.001}
                    min={0.03}
                    max={0.05}
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        Math.min(0.05, Math.max(0.03, Number(e.target.value) || 0)),
                      )
                    }
                    className="bg-black/60 border-primary/30 text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-primary/20 pt-4 mt-2 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">
                    Approximate number of tokens:
                  </div>
                  <div className="text-2xl font-bold text-primary text-glow">
                    {tokens.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-xs align-top">RUF</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">
                    Approximate value:
                  </div>
                  <div className="text-2xl font-bold text-primary text-glow">
                    $
                    {usd.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground mt-2">
                Final coefficient and price will depend on on-chain activity
                and the state of the XP pool.
              </div>
            </div>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default StepInSection;
