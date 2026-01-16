import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCompare } from '@/contexts/CompareContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitCompare, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const typeColors: Record<string, string> = {
  fire: 'bg-type-fire/20 text-type-fire border-type-fire/30',
  water: 'bg-type-water/20 text-type-water border-type-water/30',
  grass: 'bg-type-grass/20 text-type-grass border-type-grass/30',
  electric: 'bg-type-electric/20 text-type-electric border-type-electric/30',
  psychic: 'bg-type-psychic/20 text-type-psychic border-type-psychic/30',
  dragon: 'bg-type-dragon/20 text-type-dragon border-type-dragon/30',
};

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-secondary/50 flex items-center justify-center">
                <GitCompare className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Compare Cards</h1>
            <p className="text-muted-foreground">
              Add cards to your comparison list to see them side-by-side. You can compare
              up to 4 cards at once.
            </p>
            <Button size="lg" onClick={() => navigate('/cards')}>
              Browse Cards
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const comparisonFields = [
    { label: 'Price', key: 'price' as const, format: (val: number) => `$${val.toFixed(2)}` },
    { label: '24h Change', key: 'change24h' as const, format: (val: number) => `${val >= 0 ? '+' : ''}${val.toFixed(1)}%` },
    { label: '7d Change', key: 'change7d' as const, format: (val: number) => `${val >= 0 ? '+' : ''}${val.toFixed(1)}%` },
    { label: '24h Volume', key: 'volume24h' as const, format: (val: number) => `$${(val / 1000).toFixed(1)}K` },
    { label: 'Market Cap', key: 'marketCap' as const, format: (val: number) => `$${(val / 1000000).toFixed(2)}M` },
    { label: 'Rank', key: 'rank' as const, format: (val: number) => `#${val}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Compare Cards ({compareList.length}/4)</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
            <Button onClick={() => navigate('/cards')}>Add More</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 min-w-full pb-4">
            {compareList.map((card) => (
              <div
                key={card.id}
                className="flex-1 min-w-[280px] rounded-xl border border-border/50 bg-card/50 overflow-hidden"
              >
                {/* Card Header */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-8 w-8 bg-background/80 hover:bg-destructive/20"
                    onClick={() => removeFromCompare(card.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div
                    className="aspect-[3/4] bg-secondary/30 p-4 cursor-pointer"
                    onClick={() => navigate(`/card/${card.id}`)}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1 cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/card/${card.id}`)}
                    >
                      {card.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{card.set}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={typeColors[card.type]}>
                      {card.type}
                    </Badge>
                    <Badge variant="secondary">{card.rarity}</Badge>
                  </div>

                  <Separator />

                  {/* Stats */}
                  <div className="space-y-2">
                    {comparisonFields.map(({ label, key, format }) => {
                      const value = card[key] as number;
                      const isHighest =
                        key !== 'rank' &&
                        value === Math.max(...compareList.map((c) => c[key] as number));
                      const isLowest =
                        key === 'rank' &&
                        value === Math.min(...compareList.map((c) => c[key] as number));
                      const isChange = key === 'change24h' || key === 'change7d';

                      return (
                        <div
                          key={key}
                          className="flex justify-between items-center py-1"
                        >
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <div className="flex items-center gap-1">
                            <span
                              className={`text-sm font-medium ${
                                isHighest || isLowest ? 'text-primary' : ''
                              } ${
                                isChange
                                  ? value >= 0
                                    ? 'text-success'
                                    : 'text-destructive'
                                  : ''
                              }`}
                            >
                              {format(value)}
                            </span>
                            {(isHighest || isLowest) && (
                              <TrendingUp className="h-3 w-3 text-primary" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    onClick={() => navigate(`/card/${card.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}

            {/* Add more placeholder */}
            {compareList.length < 4 && (
              <div className="flex-1 min-w-[280px] rounded-xl border-2 border-dashed border-border/50 bg-secondary/20 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                <div className="text-center p-8">
                  <GitCompare className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Add Another Card</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Compare up to 4 cards
                  </p>
                  <Button size="sm" onClick={() => navigate('/cards')}>
                    Browse Cards
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
