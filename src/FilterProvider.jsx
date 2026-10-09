import { useState } from 'react';
import { FilterContext } from './FilterContext.js';

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expireFilter, setExpireFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  function handleClearFilters() {
    setSearchQuery('');
    setCategoryFilter('');
    setExpireFilter('');
    setUserFilter('');
  }

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        expireFilter,
        setExpireFilter,
        userFilter,
        setUserFilter,
        handleClearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
