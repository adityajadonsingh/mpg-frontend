"use client";

import { createContext, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ categories, children }) => {
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoryContext);
};
