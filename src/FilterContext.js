import { createContext, useContext } from 'react';

export const FilterContext = createContext(null);

export function useFilters() {
  const context = useContext(FilterContext);

  if (context === null) {
    throw new Error('useFilters must be used inside FilterProvider');
  }

  return context;
}
