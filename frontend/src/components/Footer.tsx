import { Zap, Mail, Phone, MapPin, Twitter, Github, Youtube, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border/50 mt-12">
      <div className="container py-8 sm:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                Poke<span className="text-primary">Market</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The ultimate platform for tracking Pokémon card prices, market trends, and building your collection portfolio.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <Youtube className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Rankings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Watchlist</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Card Sets</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Market News</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Price Alerts</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold">Resources</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Price History</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Grading Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <a href="mailto:support@pokemarket.com" className="hover:text-primary transition-colors break-all">
                  support@pokemarket.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <a href="tel:+1-555-POKEMON" className="hover:text-primary transition-colors">
                  +1-555-POKEMON
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  123 Trainer Street<br />
                  Pallet Town, Kanto 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <p>© {currentYear} PokeMarket. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
