"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "devtoolslabs_favorites";
const RECENT_KEY = "devtoolslabs_recent";
const MAX_RECENT = 5;

export function useToolbox() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    const storedRecent = localStorage.getItem(RECENT_KEY);

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedRecent) setRecent(JSON.parse(storedRecent));
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const addRecent = useCallback((toolId: string) => {
    setRecent(prev => {
      const filtered = prev.filter(id => id !== toolId);
      const newRecent = [toolId, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  return {
    favorites,
    recent,
    toggleFavorite,
    isFavorite: (toolId: string) => favorites.includes(toolId),
    addRecent
  };
}
