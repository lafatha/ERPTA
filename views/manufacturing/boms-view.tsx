"use client";

import React, { useState } from 'react';
import { BOM } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const BOM_COLUMNS: ColumnDef<BOM>[] = [
    { header: 'Product', accessorKey: 'productName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Version', accessorKey: 'version' },
    { header: 'Component Count', accessorKey: 'componentCount', type: 'number' },
    { header: 'Total Cost', accessorKey: 'totalCost', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'In Development', 'Obsolete'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : val === 'In Development' ? 'default' : 'dark'}>
                {val}
            </Badge>
        )
    }
];

export const BomsView = () => {
    const { state, updateRecord } = useMockDb();
    const { boms } = state;
    const [selectedBom, setSelectedBom] = useState<BOM | null>(null);

    const handleSave = (updatedBom: BOM) => {
        updateRecord('boms', updatedBom.id, updatedBom);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={boms} 
                columns={BOM_COLUMNS} 
                onRowClick={setSelectedBom} 
            />
            
            <RecordDrawer<BOM>
                record={selectedBom}
                columns={BOM_COLUMNS}
                onClose={() => setSelectedBom(null)}
                onSave={handleSave}
                titleAccessor="productName"
                subtitleAccessor="version"
                statusAccessor="status"
            />
        </div>
    );
};
