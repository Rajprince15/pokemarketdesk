import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useOrders, Order } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, DollarSign, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
  delivered: 'bg-success/20 text-success border-success/30',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

const Orders = () => {
  const { orders } = useOrders();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be signed in to view your orders.
            </p>
            <Button onClick={() => navigate('/profile')}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
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
            <h1 className="text-3xl font-bold">No Orders Yet</h1>
            <p className="text-muted-foreground">
              You haven't placed any orders yet. Start shopping to see your orders here.
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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border/50 bg-card/50 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" />
                      ${order.totalPrice.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="h-4 w-4" />
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    // View order details
                  }}
                >
                  View Details
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Order Items */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={`${item.id}-${item.condition}`}
                    className="flex gap-3 p-3 rounded-lg bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => navigate(`/card/${item.id}`)}
                  >
                    <div className="h-16 w-12 rounded bg-background flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.condition} x{item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground">
                    +{order.items.length - 3} more items
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Shipping Address */}
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.zipCode}
                  </p>
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

export default Orders;
