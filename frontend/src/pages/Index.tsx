import { Header } from "@/components/Header";
import { MarketStats } from "@/components/MarketStats";
import { TrendingCards } from "@/components/TrendingCards";
import { WatchlistSection } from "@/components/WatchlistSection";
import { NewsSection } from "@/components/NewsSection";
import { CardTable } from "@/components/CardTable";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10">
        

             

        {/* Main Content Sections with Optimized Spacing */}
        <MarketStats />
        <TrendingCards limit={5} />
       
        <CardTable />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
