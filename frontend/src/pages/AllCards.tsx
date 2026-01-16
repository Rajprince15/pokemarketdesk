import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Filter, X, ArrowLeft, Star, Sparkles } from "lucide-react";
import { pokemonCards, PokemonCard } from "@/data/pokemonCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

type SortOption = "rank" | "price-high" | "price-low" | "change24h" | "change7d" | "volume";

const AllCards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const { toggleWatchlist, isInWatchlist } = useAuth();

  // Get unique types and rarities
  const types = ["all", ...new Set(pokemonCards.map((card) => card.type))];
  const rarities = ["all", ...new Set(pokemonCards.map((card) => card.rarity))];

  // Filter and sort cards
  const filteredCards = pokemonCards
    .filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.set.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || card.type === selectedType;
      const matchesRarity = selectedRarity === "all" || card.rarity === selectedRarity;
      return matchesSearch && matchesType && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "change24h":
          return b.change24h - a.change24h;
        case "change7d":
          return b.change7d - a.change7d;
        case "volume":
          return b.volume24h - a.volume24h;
        default:
          return a.rank - b.rank;
      }
    });

  const activeFilters = [
    selectedType !== "all" && { type: "Type", value: selectedType, clear: () => setSelectedType("all") },
    selectedRarity !== "all" && { type: "Rarity", value: selectedRarity, clear: () => setSelectedRarity("all") },
  ].filter(Boolean) as Array<{ type: string; value: string; clear: () => void }>;

  const clearAllFilters = () => {
    setSelectedType("all");
    setSelectedRarity("all");
    setSearchQuery("");
  };

  const typeColors: Record<string, string> = {
    fire: "bg-type-fire/20 text-type-fire border-type-fire/30",
    water: "bg-type-water/20 text-type-water border-type-water/30",
    grass: "bg-type-grass/20 text-type-grass border-type-grass/30",
    electric: "bg-type-electric/20 text-type-electric border-type-electric/30",
    psychic: "bg-type-psychic/20 text-type-psychic border-type-psychic/30",
    dragon: "bg-type-dragon/20 text-type-dragon border-type-dragon/30",
  };

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
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">All Pokemon Cards</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{filteredCards.length} cards available</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or set..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.slice(1).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rarity Filter */}
            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger>
                <SelectValue placeholder="Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                {rarities.slice(1).map((rarity) => (
                  <SelectItem key={rarity} value={rarity}>
                    {rarity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mt-3 sm:mt-4 flex-wrap">
              <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Active Filters:
              </span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="gap-1 text-xs">
                  {filter.type}: {filter.value}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={filter.clear}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing {filteredCards.length} of {pokemonCards.length} cards
          </p>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="change24h">24h Change</SelectItem>
              <SelectItem value="change7d">7d Change</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div className="glass rounded-2xl p-8 sm:p-12 text-center border border-border/50">
            <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">No cards found</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearAllFilters} size="sm" className="sm:size-default">Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="group relative glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-primary/50 card-hover transition-all duration-300"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 sm:top-3 right-2 sm:right-3 h-7 w-7 sm:h-8 sm:w-8 z-10 ${
                    isInWatchlist(card.id)
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent"
                  }`}
                  onClick={() => toggleWatchlist(card.id)}
                >
                  <Star
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isInWatchlist(card.id) ? "fill-current" : ""}`}
                  />
                </Button>

                {card.trending && (
                  <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-destructive/90 text-white text-[10px] sm:text-xs shadow-lg">
                    Trending
                  </Badge>
                )}

                <div className="flex flex-col items-center mb-3 sm:mb-4">
                  <div
                    className={`w-full aspect-[2/3] rounded-lg ${typeColors[card.type] || "bg-secondary"} p-2 sm:p-3 flex items-center justify-center mb-2 sm:mb-3`}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <Badge variant="outline" className={`text-[10px] sm:text-xs ${typeColors[card.type]}`}>
                    {card.type}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-center">
                    <h3 className="font-bold text-sm sm:text-base line-clamp-1">{card.name}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{card.set}</p>
                  </div>

                  <div className="text-center pt-2 border-t border-border/50">
                    <p className="text-xl sm:text-2xl font-bold">${card.price.toLocaleString()}</p>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 text-[10px] sm:text-xs">
                      <span
                        className={`font-medium ${
                          card.change24h >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        24h: {card.change24h >= 0 ? "+" : ""}
                        {card.change24h}%
                      </span>
                      <span
                        className={`font-medium ${
                          card.change7d >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        7d: {card.change7d >= 0 ? "+" : ""}
                        {card.change7d}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <span className="line-clamp-1">{card.rarity}</span>
                    <span>#{card.rank}</span>
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

export default AllCards;
