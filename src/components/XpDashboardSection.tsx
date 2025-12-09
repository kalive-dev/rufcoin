import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Parallax } from "react-scroll-parallax";
import { motion } from "motion/react";
import { Zap, Trophy, Wallet, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TELEGRAM_AUTH_URL, getIsAuthenticated, setAuthenticated } from "@/lib/auth";
import { getApiUrl } from "@/lib/utils";

type Leader = {
  rank: number;
  externalId: string;
  xp: number;
};

const TOTAL_XP_CAP = 10_000_000;

type SpinResult = 1 | 3 | 5 | 10;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const STORAGE_KEYS = {
  userId: "ruf_xp_user_id",
};

const getOrCreateUserId = () => {
  if (typeof window === "undefined") return null;

  // 1) If external_id is provided in the URL (e.g. from Telegram bot link),
  //    use it as the canonical user id and persist to localStorage.
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("external_id");
    if (fromUrl && fromUrl.trim()) {
      const clean = fromUrl.trim();
      window.localStorage.setItem(STORAGE_KEYS.userId, clean);
      return clean;
    }
  } catch {
    // Ignore URL parsing errors and fall back to localStorage / random id.
  }

  const existing = window.localStorage.getItem(STORAGE_KEYS.userId);
  if (existing) return existing;

  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(STORAGE_KEYS.userId, newId);
  return newId;
};

const XpDashboardSection = () => {
  const { toast } = useToast();

  const [userId, setUserId] = useState<string | null>(null);
  const [xpBalance, setXpBalance] = useState<number>(0);
  const [totalXpMined] = useState<number>(1_234_567);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [lastSpinResult, setLastSpinResult] = useState<SpinResult | null>(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLeadersLoading, setIsLeadersLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formatLeaderName = (externalId: string, rank: number) => {
    if (!externalId) {
      return `User #${rank.toString().padStart(2, "0")}`;
    }

    const trimmed = externalId.trim();

    if (trimmed.length <= 8) {
      return trimmed;
    }

    return `${trimmed.slice(0, 4)}…${trimmed.slice(-3)}`;
  };

  const handleTelegramLogin = () => {
    if (typeof window === "undefined") return;
    setAuthenticated();
    setIsAuthenticated(true);

    const base = TELEGRAM_AUTH_URL;
    const link =
      userId && userId.trim()
        ? `${base}?start=${encodeURIComponent(userId)}`
        : base;

    window.location.href = link;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsAuthenticated(getIsAuthenticated());

    const id = getOrCreateUserId();
    if (!id) return;

    setUserId(id);

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${getApiUrl()}/api/user?external_id=${encodeURIComponent(id)}`,
          {
            // Avoid 304 / cached responses that break JSON parsing and .ok checks
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to load user XP");
        }

        const data = await res.json();
        setXpBalance(typeof data.xp === "number" ? data.xp : 0);
        setHasSpunToday(Boolean(data.hasSpunToday));
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to load XP",
          description: "We could not sync your XP balance. Try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLeaders = async () => {
      try {
        const res = await fetch(`${getApiUrl()}/api/leaderboard`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load leaderboard");
        }

        const data = await res.json();
        const apiLeaders: Leader[] = Array.isArray(data?.leaders)
          ? data.leaders
          : Array.isArray(data)
            ? data
            : [];

        setLeaders(
          apiLeaders.map((entry, index) => ({
            rank:
              typeof entry.rank === "number"
                ? entry.rank
                : index + 1,
            externalId: String(
              // @ts-expect-error – coming from API
              entry.externalId ?? entry.external_id ?? "",
            ),
            xp: typeof entry.xp === "number" ? entry.xp : 0,
          })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLeadersLoading(false);
      }
    };

    void fetchUser();
    void fetchLeaders();
  }, [toast]);

  const handleSpin = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign-in required",
        description: "Please sign in with Telegram to use the XP wheel.",
      });

      if (typeof window !== "undefined") {
        const el = document.getElementById("telegram-auth-cta");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = TELEGRAM_AUTH_URL;
        }
      }

      return;
    }

    if (!userId) {
      toast({
        title: "User not ready",
        description: "Please wait a moment and try again.",
      });
      return;
    }

    if (hasSpunToday || isSpinning) {
      toast({
        title: "Spin already used",
        description: "Free spin is available once every 24 hours.",
      });
      return;
    }

    setIsSpinning(true);
    setLastSpinResult(null);

    // Make the wheel perform several full spins and slow down into the result
    const extraSpins = 3 + Math.floor(Math.random() * 3); // 3–5 full turns
    const randomOffset = Math.random() * 60 - 30; // small visual variance

    setSpinAngle((prev) => prev + extraSpins * 360 + randomOffset);

    try {
      const res = await fetch(`${getApiUrl()}/api/spin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ external_id: userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error === "spin_used") {
          setHasSpunToday(true);
          toast({
            title: "Spin already used",
            description: "Free spin is available once every 24 hours.",
          });
          return;
        }

        throw new Error(data?.error || "Spin failed");
      }

      const rewardNumber = Number(data.reward);
      if (![1, 3, 5, 10].includes(rewardNumber)) {
        throw new Error("Invalid reward value from server");
      }

      const reward = rewardNumber as SpinResult;
      const newXp =
        typeof data.xp === "number" ? (data.xp as number) : xpBalance + reward;

      setLastSpinResult(reward);
      setXpBalance(newXp);
      setHasSpunToday(true);

      toast({
        title: `+${reward} XP`,
        description: "Your RUF XP spin has landed. All odds are transparent.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Spin failed",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSpinning(false);
    }
  };

  const progress = Math.min((totalXpMined / TOTAL_XP_CAP) * 100, 100);

  return (
    <section
      id="xp-dashboard"
      className="relative overflow-hidden flex items-center justify-center bg-transparent z-30 py-16 sm:py-20 md:py-24"
      style={{ isolation: "isolate" }}
    >
      <Parallax
        speed={-20}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/5 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-16 h-16 bg-[white]/15 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-12 h-12 bg-accent/30 rounded-full blur-lg animate-pulse" />
      </Parallax>

      <Parallax
        speed={-10}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 transform-gpu"
      >
        <motion.div
          className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div className="text-xs sm:text-sm text-mission text-muted-foreground mb-2">
              [ RUF XP DASHBOARD ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-glow text-mission">
              INSIDE THE XP UNIVERSE
            </h2>
          </div>

          <div className="text-right text-xs sm:text-sm text-muted-foreground max-w-xs">
            The interface never holds user funds and only reads on-chain data,
            visualising XP, ranks and overall farming progress.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          {/* Left column — global XP counter */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-card/40 backdrop-blur-sm border border-primary/30 p-4 sm:p-5 lg:p-4 h-full lg:scale-95 lg:origin-center">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs sm:text-sm text-mission text-muted-foreground">
                  [ GLOBAL XP COUNTER ]
                </div>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                mined{" "}
                <span className="font-semibold text-primary">
                  {formatNumber(totalXpMined)}
                </span>{" "}
                out of {formatNumber(TOTAL_XP_CAP)} XP
              </div>

              <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-3">
                <div
                  className="h-full bg-primary transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mb-6">
                <span>{progress.toFixed(1)}% of XP pool mined</span>
                <span>XP → RUF (0.5–0.6)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">
                    Your current XP
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {isLoading ? "…" : formatNumber(xpBalance)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    used in the calculator and ranks
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">
                    Potential token value
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    $0.03–0.05 per RUF
                  </div>
                  <div className="text-xs text-muted-foreground">
                    XP × coefficient (0.5–0.6) = RUF
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Center column — roulette */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-card/40 backdrop-blur-sm border border-primary/60 shadow-intense p-6 sm:p-7 lg:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs sm:text-sm text-mission text-muted-foreground">
                  [ DAILY FREE SPIN ]
                </div>
                <RefreshCw
                  className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`}
                />
              </div>

              <motion.div
                className="relative mx-auto my-6 w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute inset-0 rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.25)]">
                  {/* Pointer indicator */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-primary drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
                  </div>

                  <motion.div
                    className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full border border-primary/70 flex items-center justify-center relative overflow-hidden bg-black/80"
                    animate={{ rotate: spinAngle }}
                    transition={{
                      duration: 1.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="absolute inset-[4px] rounded-full bg-black/90" />
                    <div className="relative z-10 grid grid-cols-2 grid-rows-2 w-full h-full text-[11px] sm:text-xs text-center font-semibold">
                      <div
                        className={`flex items-center justify-center border-b border-r border-primary/25 text-primary bg-gradient-to-br from-primary/10 to-transparent transform transition-all duration-300 ${
                          lastSpinResult === 1
                            ? "bg-primary/30 text-primary-glow shadow-[0_0_20px_rgba(255,255,255,0.7)] scale-[1.03]"
                            : ""
                        }`}
                      >
                        1 XP
                      </div>
                      <div
                        className={`flex items-center justify-center border-b border-primary/25 text-primary/80 bg-gradient-to-bl from-primary/10 to-transparent transform transition-all duration-300 ${
                          lastSpinResult === 3
                            ? "bg-primary/30 text-primary-glow shadow-[0_0_20px_rgba(255,255,255,0.7)] scale-[1.03]"
                            : ""
                        }`}
                      >
                        3 XP
                      </div>
                      <div
                        className={`flex items-center justify-center border-r border-primary/25 text-primary/90 bg-gradient-to-tr from-primary/10 to-transparent transform transition-all duration-300 ${
                          lastSpinResult === 5
                            ? "bg-primary/30 text-primary-glow shadow-[0_0_20px_rgba(255,255,255,0.7)] scale-[1.03]"
                            : ""
                        }`}
                      >
                        5 XP
                      </div>
                      <div
                        className={`flex items-center justify-center text-primary-glow bg-gradient-to-tl from-primary/15 to-transparent transform transition-all duration-300 ${
                          lastSpinResult === 10
                            ? "bg-primary/40 text-primary-glow shadow-[0_0_25px_rgba(255,255,255,0.9)] scale-[1.05]"
                            : ""
                        }`}
                      >
                        10 XP
                      </div>
                    </div>

                    {/* Center result pulse */}
                    {lastSpinResult && !isSpinning && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
                          <div className="relative px-4 py-2 rounded-full bg-black/80 border border-primary/60 shadow-[0_0_30px_rgba(255,255,255,0.6)] text-xs sm:text-sm font-semibold tracking-wide">
                            +{lastSpinResult} XP
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              <div className="text-xs text-muted-foreground mb-3 text-center">
                Odds: 1 XP — 60%, 3 XP — 25%, 5 XP — 12%, 10 XP — 3%.
                Rarest drop is 10 XP.
              </div>

              {lastSpinResult && (
                <div className="text-center text-sm mb-3">
                  Last result:{" "}
                  <span className="font-semibold text-primary">
                    +{lastSpinResult} XP
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <Button
                  type="button"
                  onClick={handleTelegramLogin}
                  variant="space"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Sign in with Telegram
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  disabled={isSpinning || hasSpunToday}
                  onClick={handleSpin}
                  className="w-full sm:flex-1 text-xs sm:text-sm"
                >
                  {hasSpunToday
                    ? "Today's spin used"
                    : isSpinning
                      ? "Spinning..."
                      : "Spin the wheel"}
                </Button>
              </div>

              <div className="text-[11px] text-muted-foreground text-center mt-auto">
                The spin is designed as part of on-chain activity and the
                account, without any access to user funds.
              </div>
            </Card>
          </motion.div>

          {/* Right column — top‑10 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-card/40 backdrop-blur-sm border border-primary/30 p-4 sm:p-5 lg:p-4 h-full lg:scale-95 lg:origin-center">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs sm:text-sm text-mission text-muted-foreground">
                  [ TOP 10 XP LEADERS ]
                </div>
                <Trophy className="w-4 h-4 text-primary" />
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {isLeadersLoading ? (
                  <div className="text-xs text-muted-foreground">
                    Loading leaderboard…
                  </div>
                ) : leaders.length === 0 ? (
                  <div className="text-xs text-muted-foreground">
                    No XP leaders yet. Be the first to farm XP.
                  </div>
                ) : (
                  leaders.map((leader) => (
                    <div
                      key={`${leader.rank}-${leader.externalId}`}
                      className="flex items-center justify-between py-1.5 rounded-md bg-black/40 px-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-muted-foreground w-6">
                          #{leader.rank.toString().padStart(2, "0")}
                        </span>
                        <span className="font-semibold">
                          {formatLeaderName(leader.externalId, leader.rank)}
                        </span>
                      </div>
                      <span className="font-mono text-primary">
                        {formatNumber(leader.xp)} XP
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  Live leaderboard will be based on on-chain activity.
                </span>
                <span>on-chain data</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
};

export default XpDashboardSection;


