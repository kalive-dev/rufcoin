import { MessageCircle, Twitter, BarChart3, Headset } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="support"
      className="relative overflow-hidden py-20"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Call to Action */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-mission">
              FARM XP NOW,
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-primary text-glow mb-4 text-mission">
              REGRET LATER.
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md">
              The XP pool is finite, and ranks plus points record who was truly
              early. Everything you skip today will feel more expensive
              tomorrow.
            </p>
          </div>

          {/* Right Side - Navigation & Social & Support */}
          <div className="space-y-8">
            {/* Navigation */}
            <div>
              <div className="text-sm text-mission text-muted-foreground mb-4">
                [ navigation ]
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("overview")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ Overview
                </button>
                <button
                  onClick={() => scrollToSection("xp-dashboard")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ XP / spin / Top‑10
                </button>
                <button
                  onClick={() => scrollToSection("tasks")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ Tasks & socials
                </button>
                <button
                  onClick={() => scrollToSection("rewards")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ Ranks & referrals
                </button>
                <button
                  onClick={() => scrollToSection("holding-swap")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ Holding & SWAP rewards
                </button>
                <button
                  onClick={() => scrollToSection("calculator")}
                  className="block text-left text-foreground hover:text-primary transition-colors text-mission"
                >
                  ■ Calculator
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-sm text-mission text-muted-foreground mb-4">
                [ partners / socials ]
              </div>
              <div className="space-y-2">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={16} />
                  <span className="text-mission">Telegram community</span>
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                >
                  <Twitter size={16} />
                  <span className="text-mission">Twitter / X updates</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  <BarChart3 size={16} />
                  <span className="text-mission">
                    Partner dashboards and trackers (soon)
                  </span>
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <div className="text-sm text-mission text-muted-foreground mb-4">
                [ support ]
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Headset size={18} className="mt-1" />
                <p>
                  For questions about XP, ranks, bug reports or quest ideas,
                  write in the Telegram support chat or the pinned thread in X.
                  The site only shows quests, ranks and farming progress — it
                  never has access to user funds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of use
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              RUF XP — interface without custody or control of funds.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
