import { filterData } from './filterUtils';
import type { DataRow, OptionType } from './filterUtils';


const sampleData: DataRow[] = [
  { mod3: '0', mod4: '1' },
  { mod3: '1', mod4: '2' },
  { mod3: '2', mod4: '3' },
  { mod3: '0', mod4: '2' },
];

test('filters by one column', () => {
  const filters: Record<string, OptionType[]> = {
    mod3: [{ label: '0', value: '0' }],
  };

  const result = filterData(sampleData, filters);
  expect(result.length).toBe(2);
  expect(result[0].mod4).toBe('1');
  expect(result[1].mod4).toBe('2');
});

test('filters by two columns', () => {
  const filters: Record<string, OptionType[]> = {
    mod3: [{ label: '0', value: '0' }],
    mod4: [{ label: '1', value: '1' }],
  };

  const result = filterData(sampleData, filters);
  expect(result.length).toBe(1);
  expect(result[0]).toEqual({ mod3: '0', mod4: '1' });
});

test('returns all data if filters are empty', () => {
  const result = filterData(sampleData, {});
  expect(result.length).toBe(sampleData.length);
});
