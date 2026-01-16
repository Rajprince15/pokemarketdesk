import { TrendingUp, DollarSign, Layers, PieChart } from "lucide-react";
import { marketStats } from "@/data/pokemonCards";

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

const stats = [
  {
    label: "Market Cap",
    value: formatNumber(marketStats.totalMarketCap),
    icon: DollarSign,
    change: "+4.2%",
    positive: true,
  },
  {
    label: "24h Volume",
    value: formatNumber(marketStats.totalVolume24h),
    icon: TrendingUp,
    change: "+12.8%",
    positive: true,
  },
  {
    label: "Listed Cards",
    value: marketStats.totalCards.toLocaleString(),
    icon: Layers,
    change: "+156",
    positive: true,
  },
  {
    label: "Charizard Dominance",
    value: `${marketStats.dominance.charizard}%`,
    icon: PieChart,
    change: "-0.8%",
    positive: false,
  },
];

export const MarketStats = () => {
  return (
    <section className="py-6 border-b border-border/30">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-4 sm:p-5 rounded-xl glass border border-border/50 hover:border-primary/30 hover:glow-hover transition-all duration-300 animate-fade-in card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 shadow-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground truncate font-medium">{stat.label}</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-lg sm:text-xl font-bold">{stat.value}</span>
                  <span
                    className={`text-xs font-semibold ${
                      stat.positive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
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
