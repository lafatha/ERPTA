"use client";

import React, { useState, useMemo } from 'react';
import { ManufacturingOrder, OrderStatus } from '@/types';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { STATUSES, PARTS_STATUSES } from '@/lib/mock-data';

interface ColumnDef {
    header: string;
    accessorKey: keyof ManufacturingOrder;
    width?: string;
    type?: 'text' | 'number' | 'date' | 'status' | 'badge';
    render?: (value: any, row: ManufacturingOrder) => React.ReactNode;
}

export const COLUMNS: ColumnDef[] = [
    { header: 'Number', accessorKey: 'orderNumber', width: 'w-24', render: (val) => <span className="font-medium underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-black text-gray-700">{val}</span> },
    {
        header: 'Status', accessorKey: 'status', width: 'w-28', render: (val) => {
            const v = val as OrderStatus;
            if (v === 'Delayed') return <Badge variant="dark">{val}</Badge>;
            if (v === 'Completed') return <Badge variant="outline">{val}</Badge>;
            if (v === 'In Production') return <Badge variant="success">{val}</Badge>;
            return <span className="text-gray-600">{val}</span>;
        }
    },
    { header: 'Part description', accessorKey: 'productName', width: 'w-56', render: (val) => <span className="truncate block" title={val}>{val}</span> },
    { header: 'Quantity', accessorKey: 'quantity', type: 'number', width: 'w-24', render: (val, row) => <span>{val} <span className="text-gray-400 text-xs">{row.unit}</span></span> },
    { header: 'Part No.', accessorKey: 'partNumber', width: 'w-24', render: (val) => <span className="text-gray-600">{val}</span> },
    {
        header: 'Parts status', accessorKey: 'partsStatus', width: 'w-32', render: (val) => {
            if (val === 'Not booked') return <Badge variant="default" className="text-gray-500">{val}</Badge>;
            if (val === 'Delayed') return <Badge variant="error">{val}</Badge>;
            if (val === 'Expected') return <Badge variant="outline" className="border-dashed border-gray-400">{val}</Badge>;
            if (val === 'Received') return <span className="text-gray-800">{val}</span>;
            return <Badge variant="default">{val}</Badge>;
        }
    },
    { header: 'Created', accessorKey: 'createdDate', type: 'date', width: 'w-24', render: (val) => <span className="text-gray-500">{val.substring(0, 5)}</span> },
    { header: 'Start', accessorKey: 'startDate', type: 'date', width: 'w-24', render: (val) => <span className="text-gray-500">{val.substring(0, 5)}</span> },
    { header: 'Finish', accessorKey: 'finishDate', type: 'date', width: 'w-24', render: (val) => <span className="text-gray-500">{val.substring(0, 5)}</span> },
    { header: 'Due date', accessorKey: 'dueDate', type: 'date', width: 'w-24', render: (val) => <span className="text-gray-500">{val.substring(0, 5)}</span> },
    { header: 'Assigned to', accessorKey: 'assignedOperator', width: 'w-32', render: (val) => <span className="text-gray-600 truncate block">{val}</span> },
    { header: 'Factory', accessorKey: 'factory', width: 'w-32', render: (val) => <span className="text-gray-500 truncate block">{val}</span> },
];

export const DataTable = ({ data, onRowClick }: { data: ManufacturingOrder[], onRowClick: (order: ManufacturingOrder) => void }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof ManufacturingOrder, direction: 'asc' | 'desc' } | null>(null);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [page, setPage] = useState(1);
    const rowsPerPage = 25;
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Handle Sorting
    const requestSort = (key: keyof ManufacturingOrder) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Handle Filtering changes
    const handleFilterChange = (key: string, value: any, type: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (!newFilters[key]) newFilters[key] = {};
            newFilters[key][type] = value;
            return newFilters;
        });
        setPage(1); // Reset to first page on filter
    };

    // Apply Filters & Sort (Derived State)
    const processedData = useMemo(() => {
        let sortableItems = [...data];

        // Apply Filters
        Object.keys(filters).forEach(key => {
            const filter = filters[key];
            sortableItems = sortableItems.filter(item => {
                const itemValue = item[key as keyof ManufacturingOrder];

                if (filter.text) {
                    return String(itemValue).toLowerCase().includes(String(filter.text).toLowerCase());
                }
                if (filter.min !== undefined && filter.min !== '') {
                    if (Number(itemValue) < Number(filter.min)) return false;
                }
                if (filter.max !== undefined && filter.max !== '') {
                    if (Number(itemValue) > Number(filter.max)) return false;
                }
                if (filter.select && filter.select !== 'all') {
                    return itemValue === filter.select;
                }
                return true;
            });
        });

        // Apply Sort
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig, filters]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    const paginatedData = processedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const toggleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(paginatedData.map(d => d.id)));
        }
    };

    const toggleSelectRow = (e: any, id: string) => {
        e.stopPropagation();
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedRows(newSelected);
    };

    // Filter Row Component
    const FilterCell = ({ column }: { column: ColumnDef }) => {
        if (column.type === 'number') {
            return (
                <div className="flex gap-1">
                    <Input placeholder="min" className="w-full text-xs h-6 px-1" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'min')} />
                    <Input placeholder="max" className="w-full text-xs h-6 px-1" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'max')} />
                </div>
            );
        }
        if (column.type === 'date') {
            return (
                <div className="flex flex-col gap-1">
                    <div className="relative">
                        <Input placeholder="min" className="w-full text-xs h-6 px-1 pr-5" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'min')} />
                        <Icons.Clock className="absolute right-1 top-1.5 w-3 h-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <Input placeholder="max" className="w-full text-xs h-6 px-1 pr-5" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'max')} />
                        <Icons.Clock className="absolute right-1 top-1.5 w-3 h-3 text-gray-400" />
                    </div>
                </div>
            );
        }
        if (column.accessorKey === 'status' || column.accessorKey === 'partsStatus') {
            const options = column.accessorKey === 'status' ? STATUSES : PARTS_STATUSES;
            return (
                <Select className="text-xs h-6 px-1 py-0" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'select')}>
                    <option value="all">All</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </Select>
            )
        }
        return (
            <Input placeholder="..." className="w-full text-xs h-6 px-1" onChange={(e: any) => handleFilterChange(column.accessorKey, e.target.value, 'text')} />
        );
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Table Container - allows scrolling */}
            <div className="flex-1 overflow-auto border border-gray-200">
                <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
                    <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm shadow-gray-200/50">
                        {/* Headers */}
                        <tr>
                            <th className="w-10 px-3 py-2 border-b border-gray-200">
                                <input type="checkbox" className="rounded-none border-gray-300 text-black focus:ring-black" checked={selectedRows.size === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />
                            </th>
                            {COLUMNS.map((col, idx) => (
                                <th key={col.accessorKey} className={`px-3 py-2 border-b border-gray-200 font-medium text-gray-600 select-none ${col.width}`}>
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-black group" onClick={() => requestSort(col.accessorKey)}>
                                        {col.header}
                                        <span className="text-gray-300 group-hover:text-gray-500 w-3 h-3">
                                            {sortConfig?.key === col.accessorKey ? (sortConfig.direction === 'asc' ? <Icons.ArrowUp /> : <Icons.ArrowDown />) : <Icons.ArrowDown className="opacity-0 group-hover:opacity-100" />}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                        {/* Filter Row */}
                        <tr className="bg-gray-50/50">
                            <td className="px-3 py-1.5 border-b border-gray-200 text-center text-gray-400">
                                <Icons.Filter className="w-3.5 h-3.5 mx-auto" />
                            </td>
                            {COLUMNS.map((col) => (
                                <td key={`filter-${col.accessorKey}`} className="px-1.5 py-1.5 border-b border-gray-200 align-top">
                                    <FilterCell column={col} />
                                </td>
                            ))}
                        </tr>
                        {/* Summary Row */}
                        <tr className="bg-white text-xs font-medium text-gray-800">
                            <td className="px-3 py-1.5 border-b border-gray-200"></td>
                            <td className="px-3 py-1.5 border-b border-gray-200">Total:</td>
                            <td className="px-3 py-1.5 border-b border-gray-200"></td>
                            <td className="px-3 py-1.5 border-b border-gray-200"></td>
                            <td className="px-3 py-1.5 border-b border-gray-200">{processedData.reduce((acc, curr) => acc + curr.quantity, 0).toLocaleString()}</td>
                            <td colSpan={8} className="px-3 py-1.5 border-b border-gray-200 text-right text-gray-500">Filtered: {processedData.length} records</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? paginatedData.map((row, idx) => (
                            <tr
                                key={row.id}
                                className={`hover:bg-gray-50 cursor-pointer group transition-colors ${selectedRows.has(row.id) ? 'bg-gray-50' : ''}`}
                                onClick={() => onRowClick(row)}
                            >
                                <td className="px-3 py-1.5" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="w-4 text-right text-xs">{(page - 1) * rowsPerPage + idx + 1}</span>
                                        <input type="checkbox" className="rounded-none border-gray-300 text-black focus:ring-black" checked={selectedRows.has(row.id)} onChange={(e) => toggleSelectRow(e, row.id)} />
                                    </div>
                                </td>
                                {COLUMNS.map(col => (
                                    <td key={col.accessorKey} className="px-3 py-1.5">
                                        {col.render ? col.render(row[col.accessorKey], row) : <span className="text-gray-800">{row[col.accessorKey] as React.ReactNode}</span>}
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={COLUMNS.length + 1} className="h-64 text-center text-gray-400">No records found matching filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 border-x">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{processedData.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}</span> to <span className="font-medium text-gray-900">{Math.min(page * rowsPerPage, processedData.length)}</span> of <span className="font-medium text-gray-900">{processedData.length}</span> results
                </div>
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => setPage((p: number) => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                    <div className="flex items-center px-2 text-sm text-gray-600">Page {page} of {totalPages}</div>
                    <Button variant="outline" size="sm" onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
                </div>
            </div>
        </div>
    );
};
