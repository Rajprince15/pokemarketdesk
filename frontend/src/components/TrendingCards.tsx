import { Flame, TrendingUp } from "lucide-react";
import { pokemonCards } from "@/data/pokemonCards";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const typeColors: Record<string, string> = {
  fire: "bg-type-fire/20 text-type-fire border-type-fire/30",
  water: "bg-type-water/20 text-type-water border-type-water/30",
  grass: "bg-type-grass/20 text-type-grass border-type-grass/30",
  electric: "bg-type-electric/20 text-type-electric border-type-electric/30",
  psychic: "bg-type-psychic/20 text-type-psychic border-type-psychic/30",
  dragon: "bg-type-dragon/20 text-type-dragon border-type-dragon/30",
};

interface TrendingCardsProps {
  limit?: number;
}

export const TrendingCards = ({ limit }: TrendingCardsProps = {}) => {
  const navigate = useNavigate();
  const trendingCards = pokemonCards.filter((card) => card.trending).slice(0, limit);

  return (
    <section className="py-8 sm:py-10 border-b border-border/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Flame className="h-4 w-4 text-accent" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Trending Cards</h2>
          <Badge variant="secondary" className="ml-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Hot
          </Badge>
        </div>

        {/* Optimized Grid for All Breakpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {trendingCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-card border border-border/50 p-3 sm:p-4 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.03] hover:-translate-y-1 touch-manipulation"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/card/${card.id}`)}
            >
              {/* Rank Badge */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-background/80 text-[10px] sm:text-xs font-bold backdrop-blur-sm border border-primary/30 group-hover:border-primary/60 transition-colors">
                  #{card.rank}
                </span>
              </div>

              {/* Trending Badge */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30">
                  <Flame className="h-3 w-3 text-accent animate-pulse" />
                  <span className="text-[10px] font-bold text-accent">HOT</span>
                </div>
              </div>

              {/* Card Image */}
              <div className="relative mb-3 sm:mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-secondary/30">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Info */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {card.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 flex-shrink-0 ${typeColors[card.type]} transition-all group-hover:scale-110`}
                  >
                    {card.type}
                  </Badge>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{card.set}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors">${card.price.toFixed(2)}</span>
                  <span
                    className={`text-[10px] sm:text-xs font-medium flex items-center gap-1 ${
                      card.change24h >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    <TrendingUp className={`h-3 w-3 ${card.change24h < 0 ? 'rotate-180' : ''}`} />
                    {card.change24h >= 0 ? "+" : ""}
                    {card.change24h.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
