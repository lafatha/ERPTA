"use client";

import React, { useState } from 'react';
import { Contract } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const CONTRACT_COLUMNS: ColumnDef<Contract>[] = [
    { header: 'Contract Number', accessorKey: 'contractNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Supplier', accessorKey: 'supplierName' },
    { header: 'Start Date', accessorKey: 'startDate' },
    { header: 'End Date', accessorKey: 'endDate' },
    { header: 'Value', accessorKey: 'value', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Active', 'Expiring Soon', 'Expired', 'Terminated'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : val === 'Expiring Soon' ? 'default' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const ContractsView = () => {
    const { state, updateRecord } = useMockDb();
    const { contracts } = state;
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

    const handleSave = (updatedContract: Contract) => {
        updateRecord('contracts', updatedContract.id, updatedContract);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={contracts} 
                columns={CONTRACT_COLUMNS} 
                onRowClick={setSelectedContract} 
            />
            
            <RecordDrawer<Contract>
                record={selectedContract}
                columns={CONTRACT_COLUMNS}
                onClose={() => setSelectedContract(null)}
                onSave={handleSave}
                titleAccessor="contractNumber"
                subtitleAccessor="supplierName"
                statusAccessor="status"
            />
        </div>
    );
};
