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
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main>
        <MarketStats />

        {/* Quick Access Navigation */}
        <section className="py-6 border-b border-border/50">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/cards">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold">Browse All Cards</p>
                    <p className="text-xs text-muted-foreground">Search & filter 45+ cards</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>

              <Link to="/predictions">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:border-accent/50 hover:bg-accent/5">
                  <Target className="h-6 w-6 text-accent" />
                  <div className="text-center">
                    <p className="font-semibold">Market Predictions</p>
                    <p className="text-xs text-muted-foreground">AI-powered buy/sell signals</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>

              <Link to="/watchlist">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5">
                  <Star className="h-6 w-6 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold">Your Watchlist</p>
                    <p className="text-xs text-muted-foreground">Track favorite cards</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>

              <Link to="/news">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5">
                  <Newspaper className="h-6 w-6 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold">Latest News</p>
                    <p className="text-xs text-muted-foreground">Market updates & releases</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
