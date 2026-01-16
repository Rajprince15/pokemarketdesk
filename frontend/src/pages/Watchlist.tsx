import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star, TrendingUp, TrendingDown, Eye, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { pokemonCards } from "@/data/pokemonCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Watchlist = () => {
  const { user, isLoggedIn, toggleWatchlist } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
        <Header />
        <main className="container py-6 sm:py-8 px-4 relative z-10">\n          <Link to="/">
            <Button variant="ghost" className="mb-4 sm:mb-6" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="glass rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-border/50">
            <Eye className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Sign in to view your watchlist</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Track your favorite Pokemon cards and monitor their performance</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const watchlistCards = pokemonCards.filter((card) =>
    user.watchlist.includes(card.id)
  );

  return (
    <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
      <Header />
      <main className="container py-6 sm:py-8 px-4 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-4 sm:mb-6" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 shadow-lg">
            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-accent fill-current" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Your Watchlist</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {watchlistCards.length} {watchlistCards.length === 1 ? 'card' : 'cards'} tracked
            </p>
          </div>
        </div>

        {watchlistCards.length === 0 ? (
          <div className="glass rounded-2xl p-8 sm:p-12 text-center border border-border/50">
            <Star className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">No cards in your watchlist yet</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">Start tracking cards to monitor their performance</p>
            <Link to="/cards">
              <Button size="sm" className="sm:size-default">Browse All Cards</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {watchlistCards.map((card) => (
              <div
                key={card.id}
                className="group relative glass rounded-2xl p-4 sm:p-6 border border-border/50 hover:border-primary/50 card-hover transition-all duration-300"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 h-7 w-7 sm:h-8 sm:w-8 text-accent hover:text-accent/80"
                  onClick={() => toggleWatchlist(card.id)}
                >
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                </Button>

                <div className="flex flex-col items-center mb-3 sm:mb-4">
                  <div className={`w-24 h-32 sm:w-32 sm:h-40 rounded-lg bg-type-${card.type}/20 p-2 flex items-center justify-center mb-3 sm:mb-4`}>
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <Badge variant="outline" className={`text-xs bg-type-${card.type}/20 text-type-${card.type} border-type-${card.type}/30`}>
                    {card.type}
                  </Badge>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-base sm:text-lg mb-1">{card.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">{card.set}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl sm:text-2xl font-bold">${card.price.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">24h:</span>
                      <span className={`flex items-center font-semibold ${
                        card.change24h >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {card.change24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-0.5" />
                        )}
                        {Math.abs(card.change24h)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">7d:</span>
                      <span className={`flex items-center font-semibold ${
                        card.change7d >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {card.change7d >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-0.5" />
                        )}
                        {Math.abs(card.change7d)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Volume: ${(card.volume24h / 1000).toFixed(1)}K</span>
                      <span className="text-primary">{card.rarity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Watchlist;
