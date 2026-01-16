import { Star, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { pokemonCards } from "@/data/pokemonCards";
import { Button } from "@/components/ui/button";

export const WatchlistSection = () => {
  const { user, isLoggedIn, toggleWatchlist } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Your Watchlist</h2>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8 text-center">
            <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Sign in to track your favorite cards</p>
          </div>
        </div>
      </section>
    );
  }

  const watchlistCards = pokemonCards.filter((card) =>
    user.watchlist.includes(card.id)
  );

  if (watchlistCards.length === 0) {
    return (
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Your Watchlist</h2>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8 text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No cards in your watchlist yet</p>
            <p className="text-sm text-muted-foreground mt-2">Click the star icon on any card to add it</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Your Watchlist</h2>
            <span className="text-sm text-muted-foreground">({watchlistCards.length} cards)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchlistCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-accent hover:text-accent/80"
                onClick={() => toggleWatchlist(card.id)}
              >
                <Star className="h-4 w-4 fill-current" />
              </Button>

              <div className="flex items-center gap-3">
                <div className={`w-16 h-20 rounded-lg bg-type-${card.type}/20 p-1 flex items-center justify-center`}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{card.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{card.set}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold">${card.price.toLocaleString()}</span>
                    <span
                      className={`flex items-center text-xs ${
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
