import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PokemonCard } from '@/data/pokemonCards';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends PokemonCard {
  quantity: number;
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Played';
  sellerId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (card: PokemonCard, condition: CartItem['condition']) => void;
  removeFromCart: (cardId: number, condition: CartItem['condition']) => void;
  updateQuantity: (cardId: number, condition: CartItem['condition'], quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('pokemonCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (card: PokemonCard, condition: CartItem['condition']) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === card.id && item.condition === condition
      );

      if (existingItem) {
        toast({
          title: 'Updated Cart',
          description: `${card.name} quantity increased`,
        });
        return prevCart.map((item) =>
          item.id === card.id && item.condition === condition
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast({
        title: 'Added to Cart',
        description: `${card.name} (${condition}) added to cart`,
      });

      return [
        ...prevCart,
        { ...card, quantity: 1, condition, sellerId: 'seller-' + Math.random().toString(36).substr(2, 9) },
      ];
    });
  };

  const removeFromCart = (cardId: number, condition: CartItem['condition']) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === cardId && i.condition === condition);
      if (item) {
        toast({
          title: 'Removed from Cart',
          description: `${item.name} removed from cart`,
        });
      }
      return prevCart.filter((item) => !(item.id === cardId && item.condition === condition));
    });
  };

  const updateQuantity = (cardId: number, condition: CartItem['condition'], quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cardId, condition);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cardId && item.condition === condition ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: 'Cart Cleared',
      description: 'All items removed from cart',
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const conditionMultiplier = {
        'Mint': 1.0,
        'Near Mint': 0.9,
        'Excellent': 0.75,
        'Good': 0.6,
        'Played': 0.45,
      }[item.condition];
      return total + item.price * item.quantity * conditionMultiplier;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export type { CartItem };
