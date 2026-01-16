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
  {
    id: 4,
    title: "Market Analysis: Dragon-Type Cards Show 15% Weekly Gain",
    excerpt: "Our weekly analysis reveals dragon-type cards are outperforming other types, with Rayquaza VMAX leading the charge.",
    category: "analysis",
    timeAgo: "12 hours ago",
    image: "https://images.pokemontcg.io/swsh7/218_hires.png",
  },
  {
    id: 5,
    title: "PSA Grading Backlog Decreases to 3-Week Turnaround",
    excerpt: "Professional Sports Authenticator announces faster processing times for standard submissions, good news for collectors.",
    category: "market",
    timeAgo: "1 day ago",
    image: "https://images.pokemontcg.io/pgo/31_hires.png",
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
    <section className="py-8 border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Latest News</h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured News */}
          {featuredNews && (
            <div className="lg:col-span-2 group cursor-pointer">
              <div className="relative h-full bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 bg-gradient-to-br from-type-fire/20 to-type-fire/5 p-6 flex items-center justify-center">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-32 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={categoryConfig[featuredNews.category].color}>
                        {categoryConfig[featuredNews.category].label}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredNews.timeAgo}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {featuredNews.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {featuredNews.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other News */}
          <div className="space-y-4">
            {otherNews.slice(0, 3).map((news) => {
              const CategoryIcon = categoryConfig[news.category].icon;
              return (
                <div
                  key={news.id}
                  className="group cursor-pointer bg-secondary/30 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${categoryConfig[news.category].color}`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categoryConfig[news.category].label}
                    </Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {news.timeAgo}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
