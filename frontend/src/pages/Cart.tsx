import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-secondary/50 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any cards to your cart yet.
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const conditionMultiplier = {
                'Mint': 1.0,
                'Near Mint': 0.9,
                'Excellent': 0.75,
                'Good': 0.6,
                'Played': 0.45,
              }[item.condition];
              const itemPrice = item.price * conditionMultiplier;

              return (
                <div
                  key={`${item.id}-${item.condition}`}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 sm:p-6"
                >
                  <div className="flex gap-4">
                    <div
                      className="h-24 w-20 sm:h-32 sm:w-24 rounded-lg bg-secondary/50 flex-shrink-0 cursor-pointer overflow-hidden"
                      onClick={() => navigate(`/card/${item.id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3
                            className="font-semibold text-lg cursor-pointer hover:text-primary truncate"
                            onClick={() => navigate(`/card/${item.id}`)}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">{item.set}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive flex-shrink-0"
                          onClick={() => removeFromCart(item.id, item.condition)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="secondary">{item.condition}</Badge>
                        <Badge variant="outline">{item.rarity}</Badge>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.condition, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.condition, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${itemPrice.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">$5.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (estimate)</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${(totalPrice + 5.99 + totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-3"
                onClick={() => navigate('/cards')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
