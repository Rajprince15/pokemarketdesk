import { Search, Menu, Star, TrendingUp, Zap, User, LogOut, Newspaper, Target, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const { user, isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled 
        ? 'border-border/50 glass-strong shadow-lg' 
        : 'border-border/30 glass'
    }`}>
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-destructive shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-3">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            Poke<span className="text-gradient-primary">Market</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/cards" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-y-[-1px] relative group"
          >
            <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
            All Cards
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/predictions" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-y-[-1px] relative group"
          >
            <Target className="h-4 w-4 group-hover:animate-pulse" />
            Predictions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/watchlist" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-y-[-1px] relative group"
          >
            <Star className="h-4 w-4 group-hover:animate-pulse" />
            Watchlist
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/news" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-y-[-1px] relative group"
          >
            <Newspaper className="h-4 w-4 group-hover:animate-pulse" />
            News
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cards..."
              className="w-48 lg:w-64 pl-9 glass border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 focus:w-56 lg:focus:w-72"
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

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
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/watchlist')}>
                  <Star className="mr-2 h-4 w-4" />
                  Watchlist ({user.watchlist.length})
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="hidden sm:flex" onClick={login}>
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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

              {/* Mobile Search */}
              <div className="mt-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search cards..."
                    className="pl-9 glass border-border/50"
                  />
                </div>
              </div>

              {/* Theme Toggle in Mobile */}
              <div className="mb-4 flex items-center justify-between px-4">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
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
                  to="/news" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Newspaper className="h-5 w-5 text-primary" />
                  <span className="font-medium">News</span>
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
                        navigate('/watchlist');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Watchlist ({user.watchlist.length})
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
                      login();
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
