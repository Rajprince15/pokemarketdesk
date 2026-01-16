import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { pokemonCards } from '@/data/pokemonCards';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Star, TrendingUp } from 'lucide-react';

const typeColors: Record<string, string> = {
  fire: 'bg-type-fire/20 text-type-fire border-type-fire/30',
  water: 'bg-type-water/20 text-type-water border-type-water/30',
  grass: 'bg-type-grass/20 text-type-grass border-type-grass/30',
  electric: 'bg-type-electric/20 text-type-electric border-type-electric/30',
  psychic: 'bg-type-psychic/20 text-type-psychic border-type-psychic/30',
  dragon: 'bg-type-dragon/20 text-type-dragon border-type-dragon/30',
};

const Collection = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be signed in to view your collection.
            </p>
            <Button onClick={() => navigate('/profile')}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const collectionCards = pokemonCards.filter((card) =>
    user.collection.includes(card.id)
  );

  const totalValue = collectionCards.reduce((sum, card) => sum + card.price, 0);

  if (collectionCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-secondary/50 flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Start Your Collection</h1>
            <p className="text-muted-foreground">
              Your collection is empty. Browse cards and add them to your collection.
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Collection</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Cards</p>
              <p className="text-2xl font-bold">{collectionCards.length}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(0)}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg. Price</p>
              <p className="text-2xl font-bold">
                ${(totalValue / collectionCards.length).toFixed(0)}
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground mb-1">Rarest</p>
              <p className="text-2xl font-bold truncate">Secret</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Cards ({collectionCards.length})</h2>
          <Button onClick={() => navigate('/sell')}>Sell Cards</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {collectionCards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-card border border-border/50 p-4 hover:border-primary/50 hover:shadow-glow transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/card/${card.id}`)}
            >
              {/* Rank Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-xs font-bold backdrop-blur-sm">
                  #{card.rank}
                </span>
              </div>

              {/* Trending Badge */}
              {card.trending && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge
                    variant="outline"
                    className="bg-accent/20 text-accent border-accent/30 px-1.5 py-0"
                  >
                    <TrendingUp className="h-3 w-3" />
                  </Badge>
                </div>
              )}

              {/* Card Image */}
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-secondary/30">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                    {card.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 flex-shrink-0 ${typeColors[card.type]}`}
                  >
                    {card.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{card.set}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold">${card.price.toFixed(2)}</span>
                  <span
                    className={`text-xs font-medium ${
                      card.change24h >= 0 ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {card.change24h >= 0 ? '+' : ''}
                    {card.change24h.toFixed(1)}%
                  </span>
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

export default Collection;
