import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newspaper, Clock, ExternalLink, TrendingUp, Flame, Award, ArrowLeft, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
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
    content: "The iconic Shining Fates Charizard VMAX has reached a new record price of $450, marking a 15% increase from last month. Market analysts attribute this surge to increased collector interest and limited supply in the secondary market.",
    category: "market",
    timeAgo: "2 hours ago",
    image: "https://images.pokemontcg.io/swsh45/107_hires.png",
    featured: true,
  },
  {
    id: 2,
    title: "New Scarlet & Violet Prismatic Evolutions Set Announced",
    excerpt: "The Pokémon Company reveals the upcoming expansion featuring 200+ new cards with special holographic treatments.",
    content: "The Pokémon Company International has officially announced Prismatic Evolutions, the next expansion in the Scarlet & Violet series. The set will feature over 200 cards with innovative holographic patterns.",
    category: "release",
    timeAgo: "5 hours ago",
    image: "https://images.pokemontcg.io/swsh7/215_hires.png",
  },
  {
    id: 3,
    title: "Rare 1st Edition Base Set Pikachu Sells for $125,000",
    excerpt: "A PSA 10 graded 1st Edition Pikachu from the original Base Set sold at Heritage Auctions, setting a new benchmark.",
    content: "A pristine PSA 10 graded 1st Edition Pikachu from the original 1999 Base Set has sold for $125,000 at Heritage Auctions. This sale represents one of the highest prices ever paid for this particular card.",
    category: "auction",
    timeAgo: "8 hours ago",
    image: "https://images.pokemontcg.io/swsh4/188_hires.png",
  },
  {
    id: 4,
    title: "Market Analysis: Dragon-Type Cards Show 15% Weekly Gain",
    excerpt: "Our weekly analysis reveals dragon-type cards are outperforming other types, with Rayquaza VMAX leading the charge.",
    content: "This week's market analysis shows dragon-type cards experiencing a 15% average increase in value. Rayquaza VMAX from Evolving Skies leads the trend with a 17.3% gain.",
    category: "analysis",
    timeAgo: "12 hours ago",
    image: "https://images.pokemontcg.io/swsh7/218_hires.png",
  },
  {
    id: 5,
    title: "PSA Grading Backlog Decreases to 3-Week Turnaround",
    excerpt: "Professional Sports Authenticator announces faster processing times for standard submissions, good news for collectors.",
    content: "PSA has announced improved turnaround times for standard grading submissions, now averaging just 3 weeks. This is a significant improvement from the 6-month delays experienced in 2021.",
    category: "market",
    timeAgo: "1 day ago",
    image: "https://images.pokemontcg.io/pgo/31_hires.png",
  },
  {
    id: 6,
    title: "Umbreon VMAX Secret Rare Breaks $300 Barrier",
    excerpt: "The popular Evolving Skies chase card continues its upward trajectory, now valued at $305 for near-mint condition.",
    content: "Umbreon VMAX Secret Rare from Evolving Skies has officially crossed the $300 mark, with recent sales averaging $305 for near-mint condition cards.",
    category: "market",
    timeAgo: "1 day ago",
    image: "https://images.pokemontcg.io/swsh7/215_hires.png",
  },
  {
    id: 7,
    title: "Pokemon GO Collaboration Set Sees Renewed Interest",
    excerpt: "Cards from the Pokemon GO crossover set are experiencing a resurgence in popularity among collectors.",
    content: "The Pokemon GO themed Trading Card Game set, released in 2022, is experiencing renewed interest. Mewtwo VSTAR and Radiant Charizard are seeing significant price increases.",
    category: "analysis",
    timeAgo: "2 days ago",
    image: "https://images.pokemontcg.io/pgo/31_hires.png",
  },
  {
    id: 8,
    title: "Vintage WOTC Cards See 25% Increase in Q1 2025",
    excerpt: "Original Wizards of the Coast era cards from 1999-2003 continue to appreciate in value across all grades.",
    content: "Cards from the original Wizards of the Coast era (1999-2003) have seen an average 25% increase in value during the first quarter of 2025, outpacing modern cards.",
    category: "market",
    timeAgo: "3 days ago",
    image: "https://images.pokemontcg.io/swsh4/188_hires.png",
  },
  {
    id: 9,
    title: "Japanese Exclusive Sets Create Premium Market Opportunities",
    excerpt: "Collectors increasingly turning to Japanese exclusives as English market becomes saturated.",
    content: "Japanese exclusive sets and promotional cards are commanding premium prices in the international market as collectors seek unique additions to their collections.",
    category: "analysis",
    timeAgo: "3 days ago",
    image: "https://images.pokemontcg.io/swsh9/184_hires.png",
  },
  {
    id: 10,
    title: "Evolving Skies Booster Box Prices Stabilize After Reprint",
    excerpt: "Recent reprints of the popular Evolving Skies set have helped stabilize secondary market prices.",
    content: "The Pokemon Company's decision to reprint Evolving Skies has brought booster box prices down from $400 to a more reasonable $180-200 range, making the set more accessible.",
    category: "release",
    timeAgo: "4 days ago",
    image: "https://images.pokemontcg.io/swsh7/197_hires.png",
  },
];

const categoryConfig = {
  market: { label: "Market", icon: TrendingUp, color: "bg-primary/20 text-primary" },
  release: { label: "New Release", icon: Flame, color: "bg-type-fire/20 text-type-fire" },
  auction: { label: "Auction", icon: Award, color: "bg-accent/20 text-accent" },
  analysis: { label: "Analysis", icon: Newspaper, color: "bg-type-psychic/20 text-type-psychic" },
};

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredNews = selectedCategory === "all" 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pokemon Card News</h1>
            <p className="text-muted-foreground">Latest updates from the trading card market</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All News
          </Button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((news) => {
            const CategoryIcon = categoryConfig[news.category].icon;
            return (
              <div
                key={news.id}
                className={`group cursor-pointer bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 ${
                  news.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`flex ${news.featured ? "flex-col md:flex-row" : "flex-col"}`}>
                  <div className={`bg-gradient-to-br from-type-${news.category === 'market' ? 'fire' : news.category === 'release' ? 'electric' : news.category === 'auction' ? 'water' : 'psychic'}/20 to-transparent p-8 flex items-center justify-center ${
                    news.featured ? "md:w-1/3" : ""
                  }`}>
                    <img
                      src={news.image}
                      alt={news.title}
                      className={`object-contain group-hover:scale-105 transition-transform duration-300 ${
                        news.featured ? "w-40 h-52" : "w-32 h-40"
                      }`}
                    />
                  </div>
                  <div className={`p-6 flex flex-col justify-center ${news.featured ? "flex-1" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={categoryConfig[news.category].color}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {categoryConfig[news.category].label}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.timeAgo}
                      </span>
                    </div>
                    <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${
                      news.featured ? "text-xl" : "text-lg"
                    }`}>
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {news.content}
                    </p>
                    <Button variant="ghost" size="sm" className="w-fit">
                      Read More
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
