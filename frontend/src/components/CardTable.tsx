import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Sparkles } from "lucide-react";
import { pokemonCards, PokemonCard } from "@/data/pokemonCards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortField = "rank" | "price" | "change24h" | "change7d" | "volume24h" | "marketCap";
type SortDirection = "asc" | "desc";

const typeColors: Record<string, string> = {
  fire: "bg-type-fire/20 text-type-fire border-type-fire/30",
  water: "bg-type-water/20 text-type-water border-type-water/30",
  grass: "bg-type-grass/20 text-type-grass border-type-grass/30",
  electric: "bg-type-electric/20 text-type-electric border-type-electric/30",
  psychic: "bg-type-psychic/20 text-type-psychic border-type-psychic/30",
  dragon: "bg-type-dragon/20 text-type-dragon border-type-dragon/30",
};

const rarityColors: Record<string, string> = {
  "Common": "text-muted-foreground",
  "Uncommon": "text-foreground",
  "Rare": "text-primary",
  "Rare Holo": "text-primary",
  "Ultra Rare": "text-accent",
  "Secret Rare": "text-accent",
  "Illustration Rare": "text-type-psychic",
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  }
  return `$${num.toFixed(2)}`;
};

export const CardTable = () => {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const sortedCards = [...pokemonCards].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === "asc" ? 1 : -1;
    return (aValue - bValue) * modifier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <section className="py-8 pb-16">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold">All Cards</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Filters
            </Button>
            <Button variant="outline" size="sm">
              Sets
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden shadow-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Set</TableHead>
                <TableHead className="hidden sm:table-cell">Rarity</TableHead>
                <TableHead
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center gap-1">
                    Price
                    <SortIcon field="price" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("change24h")}
                >
                  <div className="flex items-center gap-1">
                    24h %
                    <SortIcon field="change24h" />
                  </div>
                </TableHead>
                <TableHead
                  className="hidden lg:table-cell cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("change7d")}
                >
                  <div className="flex items-center gap-1">
                    7d %
                    <SortIcon field="change7d" />
                  </div>
                </TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("volume24h")}
                >
                  <div className="flex items-center gap-1">
                    Volume (24h)
                    <SortIcon field="volume24h" />
                  </div>
                </TableHead>
                <TableHead
                  className="hidden lg:table-cell cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("marketCap")}
                >
                  <div className="flex items-center gap-1">
                    Market Cap
                    <SortIcon field="marketCap" />
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCards.map((card, index) => (
                <TableRow
                  key={card.id}
                  className="group hover:bg-secondary/30 border-border/30 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {card.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-8 rounded overflow-hidden bg-secondary/50 flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold truncate">{card.name}</span>
                          <Badge
                            variant="outline"
                            className={`hidden sm:flex text-[10px] px-1.5 py-0 ${typeColors[card.type]}`}
                          >
                            {card.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {card.set}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {card.set}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={`text-sm ${rarityColors[card.rarity]}`}>
                      {card.rarity}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${card.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        card.change24h >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {card.change24h >= 0 ? "+" : ""}
                      {card.change24h.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span
                      className={`font-medium ${
                        card.change7d >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {card.change7d >= 0 ? "+" : ""}
                      {card.change7d.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {formatNumber(card.volume24h)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {formatNumber(card.marketCap)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(card.id);
                      }}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          favorites.has(card.id)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button variant="outline">
            Show More Cards
          </Button>
        </div>
      </div>
    </section>
  );
};
