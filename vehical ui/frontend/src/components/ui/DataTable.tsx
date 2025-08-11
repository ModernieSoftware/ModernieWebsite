import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  onRowClick,
  className = ""
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle sorting for complex data types like arrays and objects
        const aComp = typeof aValue === 'number' ? aValue : String(aValue ?? '');
        const bComp = typeof bValue === 'number' ? bValue : String(bValue ?? '');

        if (aComp < bComp) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aComp > bComp) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm) return sortedData;

    return sortedData.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm, searchable]);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>
      {searchable && (
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-slate-100' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 ${sortConfig?.key === column.key && sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-slate-400'}`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 -mt-1 ${sortConfig?.key === column.key && sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-slate-400'}`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-slate-50 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key as string} className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {column.render ? column.render(item) : String(item[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No data found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
