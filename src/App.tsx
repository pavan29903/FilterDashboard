import { useMemo } from 'react';
import { useFilterContext, FilterProvider } from './context/FilterContext';
import Select from 'react-select';
import DataTable from 'react-data-table-component';

interface OptionType{ 
  label: string;
   value: string;
  };

function Dashboard() {
  const {
    originalData,
    filteredData,
    filterSelections,
    handleFilterChange,
    columns,
  } = useFilterContext();

  const filterOptions = useMemo(() => {
    const options: Record<string, OptionType[]> = {};
    columns.forEach((col) => {
      const uniqueValues = Array.from(new Set(originalData.map((row) => row[col]))).sort();
      options[col] = uniqueValues.map((val) => ({ label: val, value: val }));
    });
    return options;
  }, [originalData, columns]);

  const columnDefs = useMemo(() => {
    return columns.map((key) => ({
      name: key,
      selector: (row: Record<string, string>) => row[key],
      sortable: true,
    }));
  }, [columns]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Smart Filter Dashboard</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: 20 }}>
        {columns.map((col) => (
          <div key={col} style={{ minWidth: 200 }}>
            <label style={{ fontWeight: 600 }}>{col}</label>
            <Select
              isMulti
              options={filterOptions[col]}
              value={filterSelections[col] || []}
              onChange={(selected) => handleFilterChange(col, selected as OptionType[])}
              placeholder={`Filter ${col}`}
            />
          </div>
        ))}
      </div>
      <DataTable
        columns={columnDefs}
        data={filteredData}
        pagination
        paginationPerPage={100}
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
    </div>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
}
