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
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 border-b border-border/30">
          <div className="container px-4">
            <div className="text-center space-y-4 sm:space-y-6 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Track Your <span className="text-gradient-vibrant">Pokémon Card</span> Portfolio
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-time prices, market insights, and portfolio tracking for collectors and investors
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/cards">
                  <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <Sparkles className="h-4 w-4" />
                    Browse Cards
                  </Button>
                </Link>
                <Link to="/predictions">
                  <Button size="lg" variant="outline" className="gap-2 hover:bg-secondary/50">
                    <Target className="h-4 w-4" />
                    Market Predictions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

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
