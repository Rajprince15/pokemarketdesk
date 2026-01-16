import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, Sparkles, AlertCircle, CheckCircle, Target } from "lucide-react";
import { pokemonCards } from "@/data/pokemonCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

type Signal = "BUY" | "SELL" | "HOLD";

interface Prediction {
  card: typeof pokemonCards[0];
  signal: Signal;
  confidence: number;
  momentum: number;
  volatility: "Low" | "Medium" | "High";
  recommendation: string;
  reasons: string[];
}

// Algorithmic prediction model
const generatePrediction = (card: typeof pokemonCards[0]): Prediction => {
  // Calculate momentum (based on 24h and 7d changes)
  const shortTermMomentum = card.change24h;
  const longTermMomentum = card.change7d / 7; // Average daily change
  const momentum = (shortTermMomentum * 0.6 + longTermMomentum * 0.4);

  // Calculate volatility (difference between 24h and 7d trends)
  const volatilityScore = Math.abs(card.change24h - card.change7d);
  const volatility: "Low" | "Medium" | "High" = 
    volatilityScore < 5 ? "Low" : volatilityScore < 15 ? "Medium" : "High";

  // Volume analysis (higher volume = more confidence)
  const volumeScore = card.volume24h / 10000; // Normalize
  
  // Calculate confidence (0-100)
  let confidence = 50;
  if (Math.abs(momentum) > 5) confidence += 20;
  if (Math.abs(momentum) > 10) confidence += 15;
  if (volatility === "Low") confidence += 15;
  if (volumeScore > 5) confidence += 10;
  confidence = Math.min(95, Math.max(30, confidence));

  // Generate signal
  let signal: Signal = "HOLD";
  let recommendation = "";
  const reasons: string[] = [];

  if (momentum > 5 && card.change7d > 3) {
    signal = "BUY";
    recommendation = "Strong upward momentum detected";
    reasons.push(`Strong ${card.change24h > 0 ? 'bullish' : 'bearish'} momentum: ${card.change24h.toFixed(1)}% (24h)`);
    if (card.change7d > 10) reasons.push(`Sustained growth: ${card.change7d.toFixed(1)}% (7d)`);
    if (volumeScore > 5) reasons.push("High trading volume indicates strong interest");
    if (volatility === "Low") reasons.push("Low volatility suggests stable growth");
  } else if (momentum < -5 && card.change7d < -3) {
    signal = "SELL";
    recommendation = "Declining trend detected";
    reasons.push(`Negative momentum: ${card.change24h.toFixed(1)}% (24h)`);
    if (card.change7d < -5) reasons.push(`Sustained decline: ${card.change7d.toFixed(1)}% (7d)`);
    if (volatility === "High") reasons.push("High volatility increases risk");
    reasons.push("Consider selling to minimize losses");
  } else if (momentum > 3 && card.change24h > card.change7d) {
    signal = "BUY";
    recommendation = "Accelerating upward trend";
    reasons.push("Recent price acceleration detected");
    reasons.push(`24h change (${card.change24h.toFixed(1)}%) outpacing 7d trend`);
    if (card.trending) reasons.push("Card is currently trending");
  } else if (momentum < -3 && card.change24h < card.change7d) {
    signal = "SELL";
    recommendation = "Weakening momentum";
    reasons.push("Recent price deceleration detected");
    reasons.push("Consider taking profits or cutting losses");
  } else {
    signal = "HOLD";
    recommendation = "Stable market conditions";
    reasons.push("Price showing stable behavior");
    reasons.push(`Moderate momentum: ${momentum.toFixed(1)}%`);
    if (volatility === "Low") reasons.push("Low volatility - wait for clearer signals");
    else reasons.push("Monitor closely for trend changes");
  }

  return {
    card,
    signal,
    confidence,
    momentum,
    volatility,
    recommendation,
    reasons,
  };
};

const Predictions = () => {
  // Generate predictions for all cards
  const predictions = pokemonCards
    .map(generatePrediction)
    .sort((a, b) => b.confidence - a.confidence);

  const buySignals = predictions.filter((p) => p.signal === "BUY");
  const sellSignals = predictions.filter((p) => p.signal === "SELL");
  const holdSignals = predictions.filter((p) => p.signal === "HOLD");

  const getSignalColor = (signal: Signal) => {
    switch (signal) {
      case "BUY":
        return "text-success bg-success/10 border-success/30";
      case "SELL":
        return "text-destructive bg-destructive/10 border-destructive/30";
      default:
        return "text-muted-foreground bg-secondary/50 border-border/50";
    }
  };

  const getSignalIcon = (signal: Signal) => {
    switch (signal) {
      case "BUY":
        return <TrendingUp className="h-4 w-4" />;
      case "SELL":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
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
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-6 sm:py-8 px-4">
        <Link to="/">
          <Button variant="ghost" className="mb-4 sm:mb-6" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent/10">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Market Predictions</h1>
            <p className="text-sm sm:text-base text-muted-foreground">AI-powered buy/sell signals based on market trends</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 flex items-start gap-2 sm:gap-3">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm font-medium mb-1">Algorithmic Predictions</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              These predictions are generated using momentum indicators, volume analysis, and volatility calculations. 
              They should be used as one of many factors in your trading decisions.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              <h3 className="text-sm sm:text-base font-semibold text-success">Buy Signals</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-success">{buySignals.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Cards showing upward momentum</p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
              <h3 className="text-sm sm:text-base font-semibold text-destructive">Sell Signals</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-destructive">{sellSignals.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Cards showing downward trends</p>
          </div>

          <div className="bg-secondary/50 border border-border/50 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <h3 className="text-sm sm:text-base font-semibold">Hold Signals</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold">{holdSignals.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Cards with stable conditions</p>
          </div>
        </div>

        {/* Predictions List */}
        <div className="space-y-3 sm:space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.card.id}
              className="bg-card/50 border border-border/50 rounded-xl p-4 sm:p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Card Image */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <div className={`w-24 h-32 sm:w-32 sm:h-40 rounded-lg ${typeColors[prediction.card.type]} p-2 flex items-center justify-center`}>
                    <img
                      src={prediction.card.image}
                      alt={prediction.card.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-base sm:text-lg">{prediction.card.name}</h3>
                        <Badge variant="outline" className={`text-xs ${typeColors[prediction.card.type]}`}>
                          {prediction.card.type}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{prediction.card.set}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0 w-full sm:w-auto">
                      <p className="text-xl sm:text-2xl font-bold">${prediction.card.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1 justify-start sm:justify-end flex-wrap">
                        <span className={`text-xs ${prediction.card.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                          24h: {prediction.card.change24h >= 0 ? '+' : ''}{prediction.card.change24h}%
                        </span>
                        <span className={`text-xs ${prediction.card.change7d >= 0 ? 'text-success' : 'text-destructive'}`}>
                          7d: {prediction.card.change7d >= 0 ? '+' : ''}{prediction.card.change7d}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Signal Badge */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                    <Badge className={`${getSignalColor(prediction.signal)} font-semibold px-3 py-1`}>
                      {getSignalIcon(prediction.signal)}
                      <span className="ml-1">{prediction.signal}</span>
                    </Badge>
                    <div className="flex-1 w-full sm:w-auto">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prediction.volatility} Volatility
                    </Badge>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-secondary/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs sm:text-sm mb-2">{prediction.recommendation}</p>
                        <ul className="space-y-1">
                          {prediction.reasons.map((reason, index) => (
                            <li key={index} className="text-[10px] sm:text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Predictions;
