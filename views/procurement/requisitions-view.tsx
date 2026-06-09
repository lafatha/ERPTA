"use client";

import React, { useState } from 'react';
import { PurchaseRequisition } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const REQUISITION_COLUMNS: ColumnDef<PurchaseRequisition>[] = [
    { header: 'PR Number', accessorKey: 'prNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Requestor', accessorKey: 'requestor' },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Required Date', accessorKey: 'requiredDate' },
    { header: 'Est. Value', accessorKey: 'estimatedValue', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Submitted', 'In Review', 'Approved', 'Rejected', 'Converted to PO'],
        type: 'select',
        render: (val) => (
            <Badge variant={['Approved', 'Converted to PO'].includes(val) ? 'success' : val === 'Rejected' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const RequisitionsView = () => {
    const { state, updateRecord } = useMockDb();
    const { purchaseRequisitions } = state;
    const [selectedPR, setSelectedPR] = useState<PurchaseRequisition | null>(null);

    const handleSave = (updatedPR: PurchaseRequisition) => {
        updateRecord('purchaseRequisitions', updatedPR.id, updatedPR);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={purchaseRequisitions} 
                columns={REQUISITION_COLUMNS} 
                onRowClick={setSelectedPR} 
            />
            
            <RecordDrawer<PurchaseRequisition>
                record={selectedPR}
                columns={REQUISITION_COLUMNS}
                onClose={() => setSelectedPR(null)}
                onSave={handleSave}
                titleAccessor="prNumber"
                subtitleAccessor="department"
                statusAccessor="status"
            />
        </div>
    );
};
