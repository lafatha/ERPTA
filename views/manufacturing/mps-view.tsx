"use client";

import React, { useState } from 'react';
import { MPS } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const MPS_COLUMNS: ColumnDef<MPS>[] = [
    { header: 'Period', accessorKey: 'period', width: 'w-32' },
    { header: 'Product', accessorKey: 'productName', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Planned Quantity', accessorKey: 'plannedQuantity', type: 'number' },
    { 
        header: 'Demand Source', 
        accessorKey: 'demandSource',
        options: ['Forecast', 'Sales Orders'],
        type: 'select'
    },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Confirmed', 'In Production'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'In Production' ? 'success' : val === 'Confirmed' ? 'default' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const MpsView = () => {
    const { state, updateRecord } = useMockDb();
    const { mps } = state;
    const [selectedMps, setSelectedMps] = useState<MPS | null>(null);

    const handleSave = (updatedMps: MPS) => {
        updateRecord('mps', updatedMps.id, updatedMps);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mps} 
                columns={MPS_COLUMNS} 
                onRowClick={setSelectedMps} 
            />
            
            <RecordDrawer<MPS>
                record={selectedMps}
                columns={MPS_COLUMNS}
                onClose={() => setSelectedMps(null)}
                onSave={handleSave}
                titleAccessor="productName"
                subtitleAccessor="period"
                statusAccessor="status"
            />
        </div>
    );
};
