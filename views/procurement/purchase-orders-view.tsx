"use client";

import React, { useState } from 'react';
import { PurchaseOrder } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const PO_COLUMNS: ColumnDef<PurchaseOrder>[] = [
    { header: 'PO Number', accessorKey: 'poNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Supplier', accessorKey: 'supplierName' },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Delivery Date', accessorKey: 'deliveryDate' },
    { header: 'Items', accessorKey: 'items', type: 'number' },
    { header: 'Total Amount', accessorKey: 'totalAmount', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Submitted', 'Approved', 'Ordered', 'Partially Received', 'Completed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'Draft' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const PurchaseOrdersView = () => {
    const { state, updateRecord } = useMockDb();
    const { purchaseOrders } = state;
    const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

    const handleSave = (updatedPO: PurchaseOrder) => {
        updateRecord('purchaseOrders', updatedPO.id, updatedPO);
        // Note: Realistically, changing status to 'Completed' would trigger an inventory update.
        // For a frontend-only mock, we would need to map PO line items to inventory IDs.
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={purchaseOrders} 
                columns={PO_COLUMNS} 
                onRowClick={setSelectedPO} 
            />
            
            <RecordDrawer<PurchaseOrder>
                record={selectedPO}
                columns={PO_COLUMNS}
                onClose={() => setSelectedPO(null)}
                onSave={handleSave}
                titleAccessor="poNumber"
                subtitleAccessor="supplierName"
                statusAccessor="status"
            />
        </div>
    );
};
