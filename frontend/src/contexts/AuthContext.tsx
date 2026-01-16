import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  watchlist: number[];
  collection: number[];
  isSeller: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  toggleWatchlist: (cardId: number) => void;
  isInWatchlist: (cardId: number) => boolean;
  addToCollection: (cardId: number) => void;
  removeFromCollection: (cardId: number) => void;
}

// Demo users
const demoUsers: User[] = [
  {
    id: "1",
    name: "Ash Ketchum",
    email: "ash@pokemon.trainer",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    joinDate: "2024-01-15",
    watchlist: [1, 3, 4, 7],
    collection: [2, 5, 8, 12, 16],
    isSeller: true,
  },
  {
    id: "2",
    name: "Misty Waterflower",
    email: "misty@pokemon.trainer",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
    joinDate: "2024-02-20",
    watchlist: [2, 5, 10],
    collection: [1, 3, 6, 9],
    isSeller: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('pokemonUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pokemonUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('pokemonUser');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const foundUser = demoUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.name}`,
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid credentials. Try: ash@pokemon.trainer",
      variant: "destructive",
    });
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (demoUsers.find((u) => u.email === email)) {
      toast({
        title: "Registration Failed",
        description: "Email already exists",
        variant: "destructive",
      });
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
      joinDate: new Date().toISOString().split('T')[0],
      watchlist: [],
      collection: [],
      isSeller: false,
    };

    demoUsers.push(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    toast({
      title: "Registration Successful!",
      description: `Welcome, ${name}!`,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  };

  const toggleWatchlist = (cardId: number) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      const isInList = prev.watchlist.includes(cardId);
      return {
        ...prev,
        watchlist: isInList
          ? prev.watchlist.filter((id) => id !== cardId)
          : [...prev.watchlist, cardId],
      };
    });
  };

  const isInWatchlist = (cardId: number) => {
    return user?.watchlist.includes(cardId) ?? false;
  };

  const addToCollection = (cardId: number) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev || prev.collection.includes(cardId)) return prev;
      return {
        ...prev,
        collection: [...prev.collection, cardId],
      };
    });
  };

  const removeFromCollection = (cardId: number) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        collection: prev.collection.filter((id) => id !== cardId),
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isLoggedIn, 
        login, 
        register, 
        logout, 
        toggleWatchlist, 
        isInWatchlist,
        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
