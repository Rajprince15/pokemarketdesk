import { Header } from "@/components/Header";
import { MarketStats } from "@/components/MarketStats";
import { TrendingCards } from "@/components/TrendingCards";
import { WatchlistSection } from "@/components/WatchlistSection";
import { NewsSection } from "@/components/NewsSection";
import { CardTable } from "@/components/CardTable";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main>
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
