"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface IFilterContext {
  filter: IFilter;
  handleSearch: (search: string) => void;
  handleType: (type: TFilterType) => void;
}

type TFilterType = "tracked" | "others";

interface IFilter {
  search: string;
  type: TFilterType;
}

const FilterContext = createContext<IFilterContext>({} as IFilterContext);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<IFilter>({
    search: "",
    type: "tracked",
  });

  const handleSearch = (search: string) => {
    setFilter((prevState) => ({ ...prevState, search }));
  };

  const handleType = (type: TFilterType) => {
    setFilter((prevState) => ({ ...prevState, type }));
  };

  return (
    <FilterContext.Provider value={{ filter, handleSearch, handleType }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): IFilterContext => useContext(FilterContext);
