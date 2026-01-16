import { Header } from "@/components/Header";
import { MarketStats } from "@/components/MarketStats";
import { TrendingCards } from "@/components/TrendingCards";
import { WatchlistSection } from "@/components/WatchlistSection";
import { NewsSection } from "@/components/NewsSection";
import { CardTable } from "@/components/CardTable";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Star, Newspaper, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
      <Header />
      <main className="px-4 relative z-10">
        <MarketStats />
        <TrendingCards />
        <WatchlistSection />
        <NewsSection />
        <CardTable />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
