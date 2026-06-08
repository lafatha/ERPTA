"use client";

import React, { useState } from 'react';
import { InventoryItem } from '@/types';
import { CATEGORIES, WAREHOUSES, VALUATION_METHODS } from '@/lib/mock-data-inventory';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const INVENTORY_COLUMNS: ColumnDef<InventoryItem>[] = [
    { header: 'SKU', accessorKey: 'sku', width: 'w-24', render: (val) => <span className="font-medium underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-black text-gray-700">{val}</span> },
    { header: 'Item Name', accessorKey: 'name', width: 'w-56', render: (val) => <span className="truncate block font-medium" title={val}>{val}</span> },
    { header: 'Category', accessorKey: 'category', type: 'select', options: CATEGORIES, width: 'w-32', render: (val) => <span className="text-gray-600">{val}</span> },
    { 
        header: 'Status', accessorKey: 'status', type: 'select', options: ['In Stock', 'Low Stock', 'Out of Stock'], width: 'w-28', render: (val) => {
            if (val === 'In Stock') return <Badge variant="success">{val}</Badge>;
            if (val === 'Low Stock') return <Badge variant="dark">{val}</Badge>;
            if (val === 'Out of Stock') return <Badge variant="error">{val}</Badge>;
            return <Badge>{val}</Badge>;
        }
    },
    { header: 'Stock Level', accessorKey: 'stockLevel', type: 'number', width: 'w-24', render: (val, row) => <span className={val < row.reorderPoint ? 'text-red-600 font-medium' : ''}>{val} <span className="text-gray-400 text-xs">{row.unit}</span></span> },
    { header: 'Reorder Point', accessorKey: 'reorderPoint', type: 'number', width: 'w-24', render: (val) => <span className="text-gray-500">{val}</span> },
    { header: 'Warehouse', accessorKey: 'warehouse', type: 'select', options: WAREHOUSES, width: 'w-48', render: (val) => <span className="text-gray-600 truncate block">{val}</span> },
    { header: 'Valuation', accessorKey: 'valuationMethod', type: 'select', options: [...VALUATION_METHODS], width: 'w-24', render: (val) => <span className="text-gray-500">{val}</span> },
];

export const InventoryItemsView = () => {
    const { state, updateRecord } = useMockDb();
    const { inventoryItems } = state;
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const handleSave = (updatedItem: InventoryItem) => {
        updateRecord('inventoryItems', updatedItem.id, updatedItem);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={inventoryItems} 
                columns={INVENTORY_COLUMNS} 
                onRowClick={setSelectedItem} 
            />
            
            <RecordDrawer<InventoryItem>
                record={selectedItem}
                columns={INVENTORY_COLUMNS}
                onClose={() => setSelectedItem(null)}
                onSave={handleSave}
                titleAccessor="sku"
                subtitleAccessor="name"
                statusAccessor="status"
            />
        </div>
    );
};
