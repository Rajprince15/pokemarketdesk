import { Search, Menu, Star, ShoppingCart, Zap, User, LogOut, Newspaper, Target, Sparkles, Package, Store, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Poke<span className="text-primary">Market</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/cards" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Sparkles className="h-4 w-4" />
            All Cards
          </Link>
          <Link to="/predictions" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Target className="h-4 w-4" />
            Predictions
          </Link>
          <Link to="/watchlist" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Star className="h-4 w-4" />
            Watchlist
          </Link>
          <Link to="/sell" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Store className="h-4 w-4" />
            Sell
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {cartItems}
              </Badge>
            )}
          </Button>

          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/50">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/20">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/collection')}>
                  <Package className="mr-2 h-4 w-4" />
                  My Collection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/watchlist')}>
                  <Star className="mr-2 h-4 w-4" />
                  Watchlist ({user.watchlist.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/compare')}>
                  <GitCompare className="mr-2 h-4 w-4" />
                  Compare Cards
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="hidden sm:flex" onClick={() => navigate('/profile')}>
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    Poke<span className="text-primary">Market</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2 mt-6">
                <Link 
                  to="/cards" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-medium">All Cards</span>
                </Link>
                <Link 
                  to="/predictions" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Predictions</span>
                </Link>
                <Link 
                  to="/watchlist" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star className="h-5 w-5 text-primary" />
                  <span className="font-medium">Watchlist</span>
                </Link>
                <Link 
                  to="/sell" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Store className="h-5 w-5 text-primary" />
                  <span className="font-medium">Sell</span>
                </Link>
                <Link 
                  to="/compare" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GitCompare className="h-5 w-5 text-primary" />
                  <span className="font-medium">Compare Cards</span>
                </Link>
              </nav>

              {/* Mobile User Section */}
              <div className="mt-6 pt-6 border-t border-border/50">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/20">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4"
                      onClick={() => {
                        navigate('/profile');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4"
                      onClick={() => {
                        navigate('/collection');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      My Collection
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4"
                      onClick={() => {
                        navigate('/orders');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      My Orders
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 text-destructive"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
