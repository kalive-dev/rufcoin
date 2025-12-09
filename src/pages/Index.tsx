import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import XpDashboardSection from "@/components/XpDashboardSection";
import HowToBuySection from "@/components/HowToBuySection";
import MissionLogSection from "@/components/MissionLogSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import StepInSection from "@/components/StepInSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space overflow-x-hidden smooth-scroll">
      <main className="overflow-x-hidden smooth-scroll">
        <HeroSection />
        <XpDashboardSection />
        <HowToBuySection />
        <MissionLogSection />

        <TokenomicsSection />
        <StepInSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
