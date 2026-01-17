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
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  toggleWatchlist: (cardId: number) => void;
  isInWatchlist: (cardId: number) => boolean;
}

// Demo users database
const demoUsers: Record<string, { password: string; user: User }> = {
  "ash@pokemon.trainer": {
    password: "pikachu123",
    user: {
      id: "1",
      name: "Ash Ketchum",
      email: "ash@pokemon.trainer",
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      joinDate: "2024-01-15",
      watchlist: [1, 3, 4, 7],
    },
  },
  "misty@pokemon.trainer": {
    password: "starmie456",
    user: {
      id: "2",
      name: "Misty",
      email: "misty@pokemon.trainer",
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
      joinDate: "2024-01-20",
      watchlist: [2, 5, 8],
    },
  },
  "brock@pokemon.trainer": {
    password: "onix789",
    user: {
      id: "3",
      name: "Brock",
      email: "brock@pokemon.trainer",
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
      joinDate: "2024-01-25",
      watchlist: [4, 6, 9],
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Start logged out
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string, password: string) => {
    const userRecord = demoUsers[email];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const signup = (name: string, email: string, password: string) => {
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png", // Ditto avatar
      joinDate: new Date().toISOString().split("T")[0],
      watchlist: [],
    };

    // Add to demo users (in real app, this would be API call)
    demoUsers[email] = { password, user: newUser };

    // Auto login after signup
    setUser(newUser);
    setIsLoggedIn(true);
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
      value={{ user, isLoggedIn, login, logout, signup, toggleWatchlist, isInWatchlist }}
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
