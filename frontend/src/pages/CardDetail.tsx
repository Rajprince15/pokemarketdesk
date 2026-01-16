import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { pokemonCards } from '@/data/pokemonCards';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCompare } from '@/contexts/CompareContext';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  GitCompare,
  TrendingUp,
  Package,
  Shield,
  Users,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const priceHistoryData = [
  { date: 'Jan', price: 380 },
  { date: 'Feb', price: 395 },
  { date: 'Mar', price: 410 },
  { date: 'Apr', price: 405 },
  { date: 'May', price: 418 },
  { date: 'Jun', price: 425 },
];

const typeColors: Record<string, string> = {
  fire: 'bg-type-fire/20 text-type-fire border-type-fire/30',
  water: 'bg-type-water/20 text-type-water border-type-water/30',
  grass: 'bg-type-grass/20 text-type-grass border-type-grass/30',
  electric: 'bg-type-electric/20 text-type-electric border-type-electric/30',
  psychic: 'bg-type-psychic/20 text-type-psychic border-type-psychic/30',
  dragon: 'bg-type-dragon/20 text-type-dragon border-type-dragon/30',
};

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWatchlist, isInWatchlist } = useAuth();
  const { addToCompare, isInCompare } = useCompare();
  const [selectedCondition, setSelectedCondition] = useState<
    'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Played'
  >('Near Mint');
  const [quantity, setQuantity] = useState(1);

  const card = pokemonCards.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <Button onClick={() => navigate('/cards')}>Browse Cards</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const conditionMultipliers = {
    Mint: 1.0,
    'Near Mint': 0.9,
    Excellent: 0.75,
    Good: 0.6,
    Played: 0.45,
  };

  const adjustedPrice = card.price * conditionMultipliers[selectedCondition];
  const inWatchlist = isInWatchlist(card.id);
  const inCompare = isInCompare(card.id);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Card Image */}
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-card border border-border/50 p-8 aspect-square flex items-center justify-center">
              <img
                src={card.image}
                alt={card.name}
                className="max-h-full w-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-lg bg-secondary/50 aspect-square flex items-center justify-center opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                >
                  <img
                    src={card.image}
                    alt={`${card.name} ${i}`}
                    className="max-h-full w-auto object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={typeColors[card.type]}>
                  {card.type}
                </Badge>
                <Badge variant="secondary">Rank #{card.rank}</Badge>
                {card.trending && (
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">{card.name}</h1>
              <p className="text-lg text-muted-foreground">{card.set}</p>
            </div>

            <Separator />

            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">
                  ${adjustedPrice.toFixed(2)}
                </span>
                {selectedCondition !== 'Mint' && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${card.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span
                  className={`font-medium ${
                    card.change24h >= 0 ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {card.change24h >= 0 ? '+' : ''}
                  {card.change24h.toFixed(1)}% (24h)
                </span>
                <span
                  className={`font-medium ${
                    card.change7d >= 0 ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {card.change7d >= 0 ? '+' : ''}
                  {card.change7d.toFixed(1)}% (7d)
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Condition
                </label>
                <Select
                  value={selectedCondition}
                  onValueChange={(value: any) => setSelectedCondition(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mint">
                      Mint (100%) - ${card.price.toFixed(2)}
                    </SelectItem>
                    <SelectItem value="Near Mint">
                      Near Mint (90%) - $
                      {(card.price * 0.9).toFixed(2)}
                    </SelectItem>
                    <SelectItem value="Excellent">
                      Excellent (75%) - $
                      {(card.price * 0.75).toFixed(2)}
                    </SelectItem>
                    <SelectItem value="Good">
                      Good (60%) - ${(card.price * 0.6).toFixed(2)}
                    </SelectItem>
                    <SelectItem value="Played">
                      Played (45%) - ${(card.price * 0.45).toFixed(2)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(card, selectedCondition);
                    }
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleWatchlist(card.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      inWatchlist ? 'fill-accent text-accent' : ''
                    }`}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => addToCompare(card)}
                  disabled={inCompare}
                >
                  <GitCompare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="text-center">
                <Package className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">In Stock</p>
                <p className="font-semibold">127</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Authenticity</p>
                <p className="font-semibold">Verified</p>
              </div>
              <div className="text-center">
                <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Watching</p>
                <p className="font-semibold">342</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="price">Price History</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Card Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rarity</p>
                  <p className="font-semibold">{card.rarity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold capitalize">{card.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Set</p>
                  <p className="font-semibold">{card.set}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-semibold">
                    $
                    {(card.marketCap / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="font-semibold">
                    ${(card.volume24h / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="font-semibold">#{card.rank}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="price">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Price History (6 Months)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Ash K.</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-3 w-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Card arrived in excellent condition! Seller was very
                      professional and shipped quickly.
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Misty W.</p>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="h-3 w-3 fill-accent text-accent"
                          />
                        ))}
                        <Star className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great card, price is a bit high but quality is top-notch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default CardDetail;
