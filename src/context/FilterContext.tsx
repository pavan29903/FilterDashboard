import { createContext, useContext, useEffect, useState } from 'react';
import Papa from 'papaparse';

type DataRow = Record<string, string>;
interface OptionType { 
    label: string;
     value: string
     };

interface FilterContextType{
  originalData: DataRow[];
  filteredData: DataRow[];
  filterSelections: Record<string, OptionType[]>;
  setFilterSelections: React.Dispatch<React.SetStateAction<Record<string, OptionType[]>>>;
  handleFilterChange: (col: string, selected: OptionType[]) => void;
  columns: string[];
  getFilterOptions: () => Record<string, OptionType[]>;
  resetFilters: () => void;


};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [filterSelections, setFilterSelections] = useState<Record<string, OptionType[]>>({});
  const [columns, setColumns] = useState<string[]>([]);

useEffect(() => {
  fetch('/dataset_large.csv')
    .then((res) => res.text())
    .then((csvText) => {
      Papa.parse<DataRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          setOriginalData(data);
          setFilteredData(data);

          const colNames = Object.keys(data[0]);
          setColumns(colNames);
        },
      });
    });
}, []);


  const handleFilterChange = (col: string, selected: OptionType[]) => {
    const updatedFilters = { ...filterSelections, [col]: selected };
    setFilterSelections(updatedFilters);

    const filtered = originalData.filter((row) => {
      return Object.entries(updatedFilters).every(([key, selections]) => {
        if (!selections || selections.length === 0) return true;
        return selections.some((s) => s.value === row[key]);
      });
    });

    setFilteredData(filtered);
  };


  const getFilterOptions = (): Record<string, OptionType[]> => {
  const options: Record<string, OptionType[]> = {};

  columns.forEach((col) => {
    const uniqueValues = Array.from(
      new Set(filteredData.map((row) => row[col]))
    ).sort();
    options[col] = uniqueValues.map((val) => ({ label: val, value: val }));
  });

  return options;
};

const resetFilters = () => {
  setFilterSelections({});
  setFilteredData(originalData);
};

  

  return (
    <FilterContext.Provider
      value={{
        originalData,
        filteredData,
        filterSelections,
        setFilterSelections,
        handleFilterChange,
        columns,
        getFilterOptions,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
