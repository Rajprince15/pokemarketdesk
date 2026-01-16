import { Star, TrendingUp, TrendingDown, Eye, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { pokemonCards } from "@/data/pokemonCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const WatchlistSection = () => {
  const { user, isLoggedIn, toggleWatchlist } = useAuth();

  if (!isLoggedIn || !user) {
    return null; // Don't show watchlist section if not logged in
  }

  const watchlistCards = pokemonCards.filter((card) =>
    user.watchlist.includes(card.id)
  );

  if (watchlistCards.length === 0) {
    return null; // Don't show empty watchlist
  }

  // Show only first 4 cards as preview
  const previewCards = watchlistCards.slice(0, 4);

  return (
    <section className="py-8 border-b border-border/30">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Star className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Your Watchlist</h2>
            <Badge variant="secondary" className="ml-2">
              {watchlistCards.length} cards
            </Badge>
          </div>
          {watchlistCards.length > 4 && (
            <Link to="/watchlist">
              <Button variant="outline" size="sm" className="gap-2 hover:bg-secondary/50">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {previewCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative bg-gradient-card rounded-xl p-4 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-accent hover:text-accent/80 hover:bg-accent/10 transition-all hover:scale-110"
                onClick={() => toggleWatchlist(card.id)}
              >
                <Star className="h-4 w-4 fill-current" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-16 h-20 rounded-lg bg-secondary/50 p-1 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{card.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{card.set}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold group-hover:text-primary transition-colors">${card.price.toLocaleString()}</span>
                    <span
                      className={`flex items-center text-xs font-medium ${
                        card.change24h >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {card.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(card.change24h)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
