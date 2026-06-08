"use client";

import React, { useState } from 'react';
import { StockTransfer } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const TRANSFER_COLUMNS: ColumnDef<StockTransfer>[] = [
    { header: 'Date', accessorKey: 'date', width: 'w-32' },
    { header: 'Item', accessorKey: 'itemName', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'From Warehouse', accessorKey: 'fromWarehouse' },
    { header: 'To Warehouse', accessorKey: 'toWarehouse' },
    { header: 'Quantity', accessorKey: 'quantity', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Pending', 'In Transit', 'Completed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'Pending' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const TransfersView = () => {
    const { state, updateRecord } = useMockDb();
    const { stockTransfers } = state;
    const [selectedTransfer, setSelectedTransfer] = useState<StockTransfer | null>(null);

    const handleSave = (updatedTrx: StockTransfer) => {
        updateRecord('stockTransfers', updatedTrx.id, updatedTrx);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={stockTransfers} 
                columns={TRANSFER_COLUMNS} 
                onRowClick={setSelectedTransfer} 
            />
            
            <RecordDrawer<StockTransfer>
                record={selectedTransfer}
                columns={TRANSFER_COLUMNS}
                onClose={() => setSelectedTransfer(null)}
                onSave={handleSave}
                titleAccessor="itemName"
                subtitleAccessor="toWarehouse"
                statusAccessor="status"
            />
        </div>
    );
};
