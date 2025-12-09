import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, RefreshCw, Trophy, Users } from "lucide-react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";
import Header from "./Header";
import { TELEGRAM_AUTH_URL, setAuthenticated } from "@/lib/auth";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTelegramLogin = () => {
    if (typeof window === "undefined") return;
    setAuthenticated();
    window.location.href = TELEGRAM_AUTH_URL;
  };

  return (
    <section
      id="overview"
      className="min-h-screen relative overflow-hidden bg-gradient-space z-12 pointer-events-auto parallax-section hero-mobile pb-32"
      style={{ isolation: "isolate" }}
    >
      <Header />

      {/* Orbital background elements */}
      <Parallax
        speed={-30}
        className="absolute inset-0 transform-gpu pointer-events-none z-0"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-[1200px] h-[1200px] border border-white/10 rounded-full animate-spin"
            style={{ animationDuration: "30s" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="/planet.svg"
                alt="Planet"
                className="w-3 h-3 opacity-30 animate-pulse"
              />
            </div>
          </div>

          <div
            className="absolute top-1/3 right-1/3 w-[900px] h-[900px] border border-white/5 rounded-full animate-spin"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="/planet.svg"
                alt="Planet"
                className="w-2 h-2 opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          <div
            className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin"
            style={{ animationDuration: "35s" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="/planet.svg"
                alt="Planet"
                className="w-2 h-2 opacity-25 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        </div>
      </Parallax>

      {/* Glow layer */}
      <Parallax
        speed={-20}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[white]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse" />
      </Parallax>

      {/* Content */}
      <Parallax
        speed={-15}
        className="relative z-10 px-4 sm:px-4 md:px-6 lg:px-8 min-h-screen flex items-center transform-gpu pointer-events-auto pt-24 sm:pt-0"
      >
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:gap-8 md:gap-10 items-center pointer-events-auto">
          {/* Main content block */}
          <motion.div
            className="pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block px-1 py-0 rounded-lg pointer-events-none mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs sm:text-sm text-[white] font-medium tracking-[0.25em] uppercase">
                RUF XP PROTOCOL
              </span>
            </motion.div>

            <motion.div
              className="space-y-3 sm:space-y-4 pointer-events-none lg:text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-tight leading-tight text-glow">
                RUF
                <motion.span
                  className="inline-block ml-2 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div className="absolute inset-1 bg-[white] rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  </div>
                </motion.span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Gamified XP system around the upcoming token{" "}
                <span className="font-semibold text-[white]">$RUF</span>. You
                earn XP for on-chain activity, social quests, holding and swaps
                — we convert XP into tokens using a{" "}
                <span className="font-semibold text-[white]">0.5–0.6</span>{" "}
                coefficient and build maximum FOMO before launch.
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                The protocol never holds or manages funds. We only read
                on-chain wallet activity and turn it into XP, ranks and
                potential RUF allocations.
              </p>
            </motion.div>

            <motion.div
              className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto justify-center lg:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button
                id="telegram-auth-cta"
                type="button"
                onClick={handleTelegramLogin}
                variant="hero"
                size="xl"
                className="w-full sm:w-auto"
              >
                Sign in with Telegram
              </Button>
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("xp-dashboard")}
                className="w-full sm:w-auto"
              >
                Start farming XP
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => scrollToSection("rewards")}
                className="border-white/40 text-white/80 text-sm sm:text-base bg-black/30 hover:bg-black/50 w-full sm:w-auto"
              >
                View rewards and ranks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Quick project overview */}
            <motion.div
              className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-[11px] sm:text-xs text-muted-foreground max-w-2xl mx-auto pointer-events-none"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex flex-col items-center gap-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
                <RefreshCw className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  Daily spin
                </span>
                <span className="text-[10px] text-muted-foreground">
                  XP every day
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  Quests & socials
                </span>
                <span className="text-[10px] text-muted-foreground">
                  XP for off/on-chain actions
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  Ranks & leaders
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Bronze → Brilliant
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  XP → RUF
                </span>
                <span className="text-[10px] text-muted-foreground">
                  0.5–0.6 coefficient
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Parallax>

      <Parallax
        speed={-40}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[white]/20 rounded-full blur-3xl animate-pulse pointer-events-none z-0"
      />
    </section>
  );
};

export default HeroSection;

