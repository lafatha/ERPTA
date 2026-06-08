"use client";

import React, { useState } from 'react';
import { StockAdjustment } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const ADJUSTMENT_COLUMNS: ColumnDef<StockAdjustment>[] = [
    { header: 'Date', accessorKey: 'date', width: 'w-32' },
    { header: 'Item', accessorKey: 'itemName', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { 
        header: 'Reason', 
        accessorKey: 'reason',
        options: ['Damaged', 'Counting Error', 'Expired', 'Found'],
        type: 'select'
    },
    { header: 'Quantity Adjusted', accessorKey: 'quantityAdjusted', type: 'number', render: (val) => (
        <span className={Number(val) < 0 ? 'text-red-600' : 'text-green-600'}>
            {Number(val) > 0 ? '+' : ''}{val}
        </span>
    )},
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Approved', 'Applied'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Applied' ? 'success' : val === 'Draft' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const AdjustmentsView = () => {
    const { state, updateRecord } = useMockDb();
    const { stockAdjustments } = state;
    const [selectedAdjustment, setSelectedAdjustment] = useState<StockAdjustment | null>(null);

    const handleSave = (updatedAdj: StockAdjustment) => {
        updateRecord('stockAdjustments', updatedAdj.id, updatedAdj);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={stockAdjustments} 
                columns={ADJUSTMENT_COLUMNS} 
                onRowClick={setSelectedAdjustment} 
            />
            
            <RecordDrawer<StockAdjustment>
                record={selectedAdjustment}
                columns={ADJUSTMENT_COLUMNS}
                onClose={() => setSelectedAdjustment(null)}
                onSave={handleSave}
                titleAccessor="itemName"
                subtitleAccessor="reason"
                statusAccessor="status"
            />
        </div>
    );
};
