import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, DollarSign, Package } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Sell = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardName: '',
    set: '',
    rarity: '',
    type: 'fire',
    condition: 'Near Mint',
    price: '',
    quantity: '1',
    description: '',
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be signed in to list cards for sale.
            </p>
            <Button onClick={() => navigate('/profile')}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Card Listed!",
      description: `${formData.cardName} has been listed for $${formData.price}`,
    });
    setFormData({
      cardName: '',
      set: '',
      rarity: '',
      type: 'fire',
      condition: 'Near Mint',
      price: '',
      quantity: '1',
      description: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List a Card for Sale</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to list your Pokemon card on the marketplace.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
                <CardDescription>
                  Provide accurate information about your card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Card Name *</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    required
                    placeholder="Charizard VMAX"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="set">Set *</Label>
                    <Input
                      id="set"
                      value={formData.set}
                      onChange={(e) => setFormData({ ...formData, set: e.target.value })}
                      required
                      placeholder="Shining Fates"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rarity">Rarity *</Label>
                    <Select
                      value={formData.rarity}
                      onValueChange={(value) => setFormData({ ...formData, rarity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Common">Common</SelectItem>
                        <SelectItem value="Uncommon">Uncommon</SelectItem>
                        <SelectItem value="Rare">Rare</SelectItem>
                        <SelectItem value="Rare Holo">Rare Holo</SelectItem>
                        <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                        <SelectItem value="Secret Rare">Secret Rare</SelectItem>
                        <SelectItem value="Illustration Rare">Illustration Rare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="grass">Grass</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="psychic">Psychic</SelectItem>
                        <SelectItem value="dragon">Dragon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mint">Mint</SelectItem>
                        <SelectItem value="Near Mint">Near Mint</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Played">Played</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add any additional details about the card..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>
                  Set your price and available quantity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price (USD) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="425.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                      placeholder="1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>
                  Upload clear photos of your card (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                List Card for Sale
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/collection')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
