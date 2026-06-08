"use client";

import React, { useState } from 'react';
import { InventoryTransaction } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const TRANSACTION_COLUMNS: ColumnDef<InventoryTransaction>[] = [
    { header: 'Date', accessorKey: 'date', width: 'w-32' },
    { 
        header: 'Type', 
        accessorKey: 'type',
        options: ['Receipt', 'Issue', 'Transfer', 'Adjustment', 'Production Consumption', 'FG Receipt'],
        type: 'select',
        render: (val) => (
            <Badge variant={['Receipt', 'FG Receipt'].includes(val) ? 'success' : ['Issue', 'Production Consumption'].includes(val) ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    },
    { header: 'Item', accessorKey: 'itemName' },
    { header: 'Quantity', accessorKey: 'quantity', type: 'number' },
    { header: 'Reference', accessorKey: 'reference' }
];

export const TransactionsView = () => {
    const { state, updateRecord } = useMockDb();
    const { inventoryTransactions } = state;
    const [selectedTransaction, setSelectedTransaction] = useState<InventoryTransaction | null>(null);

    const handleSave = (updatedTxn: InventoryTransaction) => {
        updateRecord('inventoryTransactions', updatedTxn.id, updatedTxn);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={inventoryTransactions} 
                columns={TRANSACTION_COLUMNS} 
                onRowClick={setSelectedTransaction} 
            />
            
            <RecordDrawer<InventoryTransaction>
                record={selectedTransaction}
                columns={TRANSACTION_COLUMNS}
                onClose={() => setSelectedTransaction(null)}
                onSave={handleSave}
                titleAccessor="itemName"
                subtitleAccessor="reference"
                statusAccessor="type"
            />
        </div>
    );
};
