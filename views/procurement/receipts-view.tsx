"use client";

import React, { useState } from 'react';
import { GoodsReceipt } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const RECEIPT_COLUMNS: ColumnDef<GoodsReceipt>[] = [
    { header: 'Receipt #', accessorKey: 'receiptNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'PO Number', accessorKey: 'poNumber' },
    { header: 'Supplier', accessorKey: 'supplierName' },
    { header: 'Received Date', accessorKey: 'receivedDate' },
    { header: 'Items Received', accessorKey: 'itemsReceived', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Pending Inspection', 'Accepted', 'Partially Rejected', 'Rejected'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Accepted' ? 'success' : val === 'Pending Inspection' ? 'outline' : 'dark'}>
                {val}
            </Badge>
        )
    }
];

export const GoodsReceiptsView = () => {
    const { state, updateRecord } = useMockDb();
    const { goodsReceipts } = state;
    const [selectedReceipt, setSelectedReceipt] = useState<GoodsReceipt | null>(null);

    const handleSave = (updatedReceipt: GoodsReceipt) => {
        updateRecord('goodsReceipts', updatedReceipt.id, updatedReceipt);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={goodsReceipts} 
                columns={RECEIPT_COLUMNS} 
                onRowClick={setSelectedReceipt} 
            />
            
            <RecordDrawer<GoodsReceipt>
                record={selectedReceipt}
                columns={RECEIPT_COLUMNS}
                onClose={() => setSelectedReceipt(null)}
                onSave={handleSave}
                titleAccessor="receiptNumber"
                subtitleAccessor="supplierName"
                statusAccessor="status"
            />
        </div>
    );
};
