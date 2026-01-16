import { Flame, TrendingUp } from "lucide-react";
import { pokemonCards } from "@/data/pokemonCards";
import { Badge } from "@/components/ui/badge";

const trendingCards = pokemonCards.filter((card) => card.trending);

const typeColors: Record<string, string> = {
  fire: "bg-type-fire/20 text-type-fire border-type-fire/30",
  water: "bg-type-water/20 text-type-water border-type-water/30",
  grass: "bg-type-grass/20 text-type-grass border-type-grass/30",
  electric: "bg-type-electric/20 text-type-electric border-type-electric/30",
  psychic: "bg-type-psychic/20 text-type-psychic border-type-psychic/30",
  dragon: "bg-type-dragon/20 text-type-dragon border-type-dragon/30",
};

export const TrendingCards = () => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Flame className="h-4 w-4 text-accent" />
          </div>
          <h2 className="text-xl font-bold">Trending Cards</h2>
          <Badge variant="secondary" className="ml-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Hot
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-card border border-border/50 p-4 hover:border-primary/50 hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rank Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-xs font-bold backdrop-blur-sm">
                  #{card.rank}
                </span>
              </div>

              {/* Card Image */}
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-secondary/30">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                    {card.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 ${typeColors[card.type]}`}
                  >
                    {card.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{card.set}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold">${card.price.toFixed(2)}</span>
                  <span
                    className={`text-xs font-medium ${
                      card.change24h >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
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
