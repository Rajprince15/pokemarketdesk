import { Newspaper, Clock, ExternalLink, TrendingUp, Flame, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: "market" | "release" | "auction" | "analysis";
  timeAgo: string;
  image: string;
  featured?: boolean;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Charizard VMAX Hits All-Time High as Collector Demand Surges",
    excerpt: "The iconic Shining Fates Charizard VMAX has reached a new record price of $450, driven by increased collector interest and limited supply.",
    category: "market",
    timeAgo: "2 hours ago",
    image: "https://images.pokemontcg.io/swsh45/107_hires.png",
    featured: true,
  },
  {
    id: 2,
    title: "New Scarlet & Violet Prismatic Evolutions Set Announced",
    excerpt: "The Pokémon Company reveals the upcoming expansion featuring 200+ new cards with special holographic treatments.",
    category: "release",
    timeAgo: "5 hours ago",
    image: "https://images.pokemontcg.io/swsh7/215_hires.png",
  },
  {
    id: 3,
    title: "Rare 1st Edition Base Set Pikachu Sells for $125,000",
    excerpt: "A PSA 10 graded 1st Edition Pikachu from the original Base Set sold at Heritage Auctions, setting a new benchmark.",
    category: "auction",
    timeAgo: "8 hours ago",
    image: "https://images.pokemontcg.io/swsh4/188_hires.png",
  },
];

const categoryConfig = {
  market: { label: "Market", icon: TrendingUp, color: "bg-primary/20 text-primary" },
  release: { label: "New Release", icon: Flame, color: "bg-type-fire/20 text-type-fire" },
  auction: { label: "Auction", icon: Award, color: "bg-accent/20 text-accent" },
  analysis: { label: "Analysis", icon: Newspaper, color: "bg-type-psychic/20 text-type-psychic" },
};

export const NewsSection = () => {
  const featuredNews = newsData.find((n) => n.featured);
  const otherNews = newsData.filter((n) => !n.featured);

  return (
    <section className="py-8 sm:py-10 border-b border-border/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold">Latest News</h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:text-primary/80 transition-all hover:gap-2 touch-manipulation min-h-[44px] sm:min-h-auto items-center"
          >
            View All News
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Optimized News Grid for All Screen Sizes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Featured News - Better Mobile Layout */}
          {featuredNews && (
            <div className="lg:col-span-2 group cursor-pointer animate-fade-in touch-manipulation">
              <div className="relative h-full glass rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 bg-gradient-to-br from-type-fire/10 to-transparent p-6 sm:p-8 flex items-center justify-center">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-28 h-36 sm:w-36 sm:h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge className={`${categoryConfig[featuredNews.category].color} transition-all group-hover:scale-105`}>
                        {categoryConfig[featuredNews.category].label}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredNews.timeAgo}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {featuredNews.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mb-4">
                      {featuredNews.excerpt}
                    </p>
                    <span className="text-xs sm:text-sm text-primary group-hover:underline flex items-center gap-1">
                      Read More
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other News - Optimized for Mobile */}
          <div className="space-y-4">
            {otherNews.map((news, index) => {
              const CategoryIcon = categoryConfig[news.category].icon;
              return (
                <div
                  key={news.id}
                  className="group cursor-pointer glass rounded-lg p-4 sm:p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in touch-manipulation"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${categoryConfig[news.category].color} transition-all group-hover:scale-105`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categoryConfig[news.category].label}
                    </Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {news.timeAgo}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {news.title}
                  </h4>
                  <span className="text-xs sm:text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Read More
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
