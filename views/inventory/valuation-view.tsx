"use client";

import React from 'react';
import { InventoryItem } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { useMockDb } from '@/lib/mock-db-context';

export const VALUATION_COLUMNS: ColumnDef<InventoryItem>[] = [
    { header: 'SKU', accessorKey: 'sku', width: 'w-24', render: (val) => <span className="font-medium text-gray-700">{val}</span> },
    { header: 'Item Name', accessorKey: 'name' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Stock Level', accessorKey: 'stockLevel', type: 'number' },
    { header: 'Valuation Method', accessorKey: 'valuationMethod' },
    { 
        header: 'Estimated Unit Value', 
        accessorKey: 'id', // just using ID to generate a consistent fake value
        render: (val, item) => {
            const multiplier = item.category === 'Finished Goods' ? 15000000 : 150000;
            const valNum = (item.name.length * multiplier * 0.05) + (item.category === 'Finished Goods' ? 3000000 : 75000);
            return `Rp ${valNum.toLocaleString('id-ID', {maximumFractionDigits: 0})}`;
        }
    },
    { 
        header: 'Total Value', 
        accessorKey: 'id',
        render: (val, item) => {
            const multiplier = item.category === 'Finished Goods' ? 15000000 : 150000;
            const valNum = (item.name.length * multiplier * 0.05) + (item.category === 'Finished Goods' ? 3000000 : 75000);
            return <span className="font-semibold text-gray-900">Rp {(valNum * item.stockLevel).toLocaleString('id-ID', {maximumFractionDigits: 0})}</span>;
        }
    }
];

export const ValuationView = () => {
    const { state } = useMockDb();
    const { inventoryItems } = state;

    return (
        <div className="h-full w-full flex flex-col">
            <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
                <div>
                    
                    <p className="text-sm text-gray-500">Current estimated value of all stock on hand.</p>
                </div>
            </div>
            <DataTable 
                data={inventoryItems} 
                columns={VALUATION_COLUMNS} 
            />
        </div>
    );
};
