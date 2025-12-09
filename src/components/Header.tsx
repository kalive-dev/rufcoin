import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  BarChart3,
  CornerDownRight,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SiX } from "react-icons/si";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="absolute top-0 w-full border-gray-800 z-50"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 80%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 md:py-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between sm:hidden">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="RUF XP Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex space-x-3">
            <button
              onClick={() => scrollToSection("overview")}
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("xp-dashboard")}
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              XP
            </button>
            <button
              onClick={() => scrollToSection("tasks")}
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              Tasks
            </button>
          </nav>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="bg-[#131412] border-white/50 text-white transition-all duration-300 px-2 py-1 h-6 rounded-none hover:bg-[#131412]/80 text-xs"
            onClick={() => scrollToSection("calculator")}
          >
            <CornerDownRight size={10} className="mr-1 text-white" />
            calculator
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="RUF XP Logo"
              className="w-28 h-28 md:w-32 md:h-32 object-contain"
            />
          </div>

          {/* Current Time - Show on tablet and desktop */}
          <div className="text-center hidden md:block">
            <div className="text-xs text-gray-400 mb-1">
              [ CURRENT TIME UTC ]
            </div>
            <div className="text-sm lg:text-base font-mono text-white">
              {currentTime}
            </div>
          </div>

          {/* Navigation - Show on tablet and desktop */}
          <div className="text-left hidden sm:block">
            <div className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
              [ navigation ]
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => scrollToSection("overview")}
                className="header-link text-xs md:text-sm"
              >
                ■ Overview
              </button>
              <button
                onClick={() => scrollToSection("xp-dashboard")}
                className="header-link text-xs md:text-sm"
              >
                ■ XP / Spin / Top‑10
              </button>
              <button
                onClick={() => scrollToSection("tasks")}
                className="header-link text-xs md:text-sm"
              >
                ■ Tasks & socials
              </button>
              <button
                onClick={() => scrollToSection("rewards")}
                className="header-link text-xs md:text-sm"
              >
                ■ Ranks & rewards
              </button>
              <button
                onClick={() => scrollToSection("calculator")}
                className="header-link text-xs md:text-sm"
              >
                ■ Calculator
              </button>
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-left">
            <div className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
              [ socials ]
            </div>
            <div className="space-y-1">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="header-link text-xs md:text-sm"
              >
                [<MessageCircle size={12} className="inline mx-1" />] Telegram
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="header-link text-xs md:text-sm"
              >
                [<SiX size={12} className="inline mx-1" />] Twitter
              </a>
              <button
                onClick={() => scrollToSection("support")}
                className="header-link text-xs md:text-sm text-left"
              >
                [<Bell size={12} className="inline mx-1" />] Support / alerts
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-left">
            <div className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
              [ &gt;&gt;&gt; ]
            </div>
            <Button
              variant="outline"
              className="bg-[#131412] border-white/50 text-white transition-all duration-300 px-2 py-1 h-6 md:h-7 rounded-none hover:bg-[#131412]/80 text-xs md:text-sm"
              onClick={() => scrollToSection("xp-dashboard")}
            >
              <CornerDownRight size={12} className="mr-1 md:mr-2 text-white" />
              Start farming XP
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
