import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const totalPrice = getTotalPrice();
  const shipping = 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be signed in to complete your purchase.
            </p>
            <Button onClick={() => navigate('/profile')}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Create order
      const order = createOrder(cart, shippingInfo, paymentMethod);
      clearCart();
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed and will be
              shipped soon.
            </p>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="font-semibold mb-2">Order Total</h3>
              <p className="text-3xl font-bold">${finalTotal.toFixed(2)}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/orders')}>View Orders</Button>
              <Button variant="outline" onClick={() => navigate('/cards')}>
                Continue Shopping
              </Button>
            </div>
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
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                    <CardDescription>
                      Where should we deliver your cards?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, name: e.target.value })
                        }
                        required
                        placeholder="Ash Ketchum"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, address: e.target.value })
                        }
                        required
                        placeholder="123 Pallet Town Road"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                          required
                          placeholder="Pallet Town"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                          }
                          required
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>
                      Select your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                          Cryptocurrency
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="flex-1">
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
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
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
