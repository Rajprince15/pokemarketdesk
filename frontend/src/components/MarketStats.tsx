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
    <section className="py-6 border-b border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold">{stat.value}</span>
                  <span
                    className={`text-xs font-medium ${
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
