import Select from 'react-select';
import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useFilterContext } from '../context/FilterContext';

interface OptionType {
    label: string;
    value: string;
}

export function Dashboard() {
    const {
        filteredData,
        filterSelections,
        handleFilterChange,
        columns,
        getFilterOptions,
        resetFilters,
    } = useFilterContext();

    const filterOptions = useMemo(() => getFilterOptions(), [getFilterOptions, filteredData]);

    const columnDefs = useMemo(() => {
        return columns.map((key) => ({
            name: key,
            selector: (row: Record<string, string>) => row[key],
            sortable: true,
        }));
    }, [columns]);

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#f3f3f3',
                fontWeight: 'bold',
                fontSize: '14px',
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Dashboard</h2>

            <div className="flex flex-wrap gap-4 mb-4">
                {columns.map((col) => (
                    <div key={col} className="min-w-[200px]">
                        <label className="block font-semibold text-gray-700 mb-1">{col}</label>
                        <Select
                            isMulti
                            options={filterOptions[col] || []}
                            value={filterSelections[col] || []}
                            onChange={(selected) => handleFilterChange(col, selected as OptionType[])}
                            placeholder={`Filter ${col}`}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                menu: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={resetFilters}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition mt-4"
                >
                    Reset All Filters
                </button>
            </div>


            <div className="border rounded overflow-hidden shadow">
                <DataTable
                    columns={columnDefs}
                    data={filteredData}
                    pagination
                    paginationPerPage={100}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    persistTableHead
                    defaultSortAsc
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}