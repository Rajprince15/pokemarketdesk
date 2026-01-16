import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { CompareProvider } from "./contexts/CompareContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Watchlist from "./pages/Watchlist";
import News from "./pages/News";
import AllCards from "./pages/AllCards";
import Predictions from "./pages/Predictions";
import CardDetail from "./pages/CardDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Sell from "./pages/Sell";
import Collection from "./pages/Collection";
import Compare from "./pages/Compare";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <CompareProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cards" element={<AllCards />} />
                  <Route path="/card/:id" element={<CardDetail />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/predictions" element={<Predictions />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CompareProvider>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
