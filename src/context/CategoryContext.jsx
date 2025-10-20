import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const value = {
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
