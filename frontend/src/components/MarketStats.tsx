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
    <section className="py-6 sm:py-8 border-b border-border/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-xl glass border border-border/50 hover:border-primary/40 transition-all duration-300 animate-fade-in hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 min-h-[80px] sm:min-h-[96px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground truncate font-medium group-hover:text-foreground transition-colors">{stat.label}</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">{stat.value}</span>
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
