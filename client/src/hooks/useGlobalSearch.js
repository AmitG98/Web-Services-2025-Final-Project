import { createContext, useContext, useState } from "react";

const SearchGlobalContext = createContext();

export const SearchGlobalProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <SearchGlobalContext.Provider value={{ searchTerm, updateSearch }}>
      {children}
    </SearchGlobalContext.Provider>
  );
};

export const useGlobalSearch = () => {
  return useContext(SearchGlobalContext);
};
