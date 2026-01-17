import { Layers, Mail, Phone, MapPin, Twitter, Github, Youtube, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-border/50 mt-12 relative z-10">
      <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">

              <span className="text-lg sm:text-xl font-bold tracking-tight">
                Poke<span className="text-gradient-primary">Deck</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The ultimate platform for tracking Pokémon card prices, market trends, and building your collection portfolio.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="p-2 rounded-lg glass hover:border-primary/50 transition-all hover:scale-110 hover:bg-primary/10">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg glass hover:border-primary/50 transition-all hover:scale-110 hover:bg-primary/10">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg glass hover:border-primary/50 transition-all hover:scale-110 hover:bg-primary/10">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg glass hover:border-primary/50 transition-all hover:scale-110 hover:bg-primary/10">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-bold">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Rankings</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Watchlist</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Card Sets</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Market News</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Price Alerts</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-bold">Resources</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Price History</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Grading Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block duration-200">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-bold">Contact Us</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2 group">
                <Mail className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:support@pokemart.com" className="hover:text-primary transition-colors break-all">
                  support@pokemart.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+1-555-POKEMON" className="hover:text-primary transition-colors">
                  +1-555-POKEMON
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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
          <p>© {currentYear} PokeDeck. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-primary transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
