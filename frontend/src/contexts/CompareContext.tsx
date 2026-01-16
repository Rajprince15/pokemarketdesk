import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PokemonCard } from '@/data/pokemonCards';
import { useToast } from '@/hooks/use-toast';

interface CompareContextType {
  compareList: PokemonCard[];
  addToCompare: (card: PokemonCard) => void;
  removeFromCompare: (cardId: number) => void;
  clearCompare: () => void;
  isInCompare: (cardId: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<PokemonCard[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCompare = localStorage.getItem('pokemonCompare');
    if (savedCompare) {
      setCompareList(JSON.parse(savedCompare));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonCompare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (card: PokemonCard) => {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === card.id)) {
        toast({
          title: 'Already in Compare',
          description: `${card.name} is already in your comparison list`,
          variant: 'destructive',
        });
        return prev;
      }

      if (prev.length >= MAX_COMPARE) {
        toast({
          title: 'Compare List Full',
          description: `You can only compare up to ${MAX_COMPARE} cards at once`,
          variant: 'destructive',
        });
        return prev;
      }

      toast({
        title: 'Added to Compare',
        description: `${card.name} added to comparison list`,
      });

      return [...prev, card];
    });
  };

  const removeFromCompare = (cardId: number) => {
    setCompareList((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (card) {
        toast({
          title: 'Removed from Compare',
          description: `${card.name} removed from comparison list`,
        });
      }
      return prev.filter((card) => card.id !== cardId);
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    toast({
      title: 'Compare Cleared',
      description: 'All cards removed from comparison list',
    });
  };

  const isInCompare = (cardId: number) => {
    return compareList.some((card) => card.id === cardId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
