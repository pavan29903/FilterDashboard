export type DataRow = Record<string, string>;
export interface OptionType {
  label: string;
  value: string;
}

export function filterData(
  data: DataRow[],
  filterSelections: Record<string, OptionType[]>
): DataRow[] {
  return data.filter((row) => {
    return Object.entries(filterSelections).every(([col, selections]) => {
      if (!selections || selections.length === 0) return true;
      return selections.some((s) => s.value === row[col]);
    });
  });
}
