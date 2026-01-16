import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  watchlist: number[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toggleWatchlist: (cardId: number) => void;
  isInWatchlist: (cardId: number) => boolean;
}

const dummyUser: User = {
  id: "1",
  name: "Ash Ketchum",
  email: "ash@pokemon.trainer",
  avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  joinDate: "2024-01-15",
  watchlist: [1, 3, 4, 7], // Card IDs in watchlist
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(dummyUser); // Start logged in for demo
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    setUser(dummyUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
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

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, toggleWatchlist, isInWatchlist }}
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
