import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Sparkles } from "lucide-react";
import { pokemonCards, PokemonCard } from "@/data/pokemonCards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const { toggleWatchlist, isInWatchlist } = useAuth();
  const navigate = useNavigate();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold">All Cards</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Filters
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Sets
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50 bg-secondary/20">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Set</TableHead>
                  <TableHead className="hidden sm:table-cell">Rarity</TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap group-hover:text-primary">
                      Price
                      <SortIcon field="price" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => handleSort("change24h")}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap group-hover:text-primary">
                      24h %
                      <SortIcon field="change24h" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden lg:table-cell cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => handleSort("change7d")}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap group-hover:text-primary">
                      7d %
                      <SortIcon field="change7d" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => handleSort("volume24h")}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap group-hover:text-primary">
                      Volume (24h)
                      <SortIcon field="volume24h" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden lg:table-cell cursor-pointer hover:text-foreground transition-colors group"
                    onClick={() => handleSort("marketCap")}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap group-hover:text-primary">
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
                    className="group hover:bg-secondary/50 border-border/30 cursor-pointer animate-fade-in transition-all duration-200 hover:shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => navigate(`/card/${card.id}`)}
                  >
                    <TableCell className="font-medium text-muted-foreground text-xs sm:text-sm">
                      {card.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-8 w-6 sm:h-10 sm:w-8 rounded overflow-hidden bg-secondary/50 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="font-semibold truncate text-xs sm:text-sm group-hover:text-primary transition-colors">{card.name}</span>
                            <Badge
                              variant="outline"
                              className={`hidden sm:flex text-[10px] px-1.5 py-0 ${typeColors[card.type]} transition-all group-hover:scale-110`}
                            >
                              {card.type}
                            </Badge>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground md:hidden truncate block">
                            {card.set}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-xs sm:text-sm">
                      {card.set}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className={`text-xs sm:text-sm ${rarityColors[card.rarity]}`}>
                        {card.rarity}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-xs sm:text-sm whitespace-nowrap group-hover:text-primary transition-colors">
                      ${card.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={`font-medium text-xs sm:text-sm ${
                          card.change24h >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        {card.change24h >= 0 ? "+" : ""}
                        {card.change24h.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell whitespace-nowrap">
                      <span
                        className={`font-medium text-xs sm:text-sm ${
                          card.change7d >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        {card.change7d >= 0 ? "+" : ""}
                        {card.change7d.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-xs sm:text-sm">
                      {formatNumber(card.volume24h)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-xs sm:text-sm">
                      {formatNumber(card.marketCap)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(card.id);
                        }}
                      >
                        <Star
                          className={`h-3 w-3 sm:h-4 sm:w-4 transition-all ${
                            isInWatchlist(card.id)
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
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button variant="outline" size="sm" className="sm:size-default">
            Show More Cards
          </Button>
        </div>
      </div>
    </section>
  );
};
