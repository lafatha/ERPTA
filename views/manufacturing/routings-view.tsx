"use client";

import React, { useState } from 'react';
import { Routing } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const ROUTING_COLUMNS: ColumnDef<Routing>[] = [
    { header: 'Product', accessorKey: 'productName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Operations Sequence', accessorKey: 'sequenceCount', type: 'number' },
    { header: 'Total Time (Mins)', accessorKey: 'totalTimeMinutes', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'Obsolete'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : 'dark'}>
                {val}
            </Badge>
        )
    }
];

export const RoutingsView = () => {
    const { state, updateRecord } = useMockDb();
    const { routings } = state;
    const [selectedRouting, setSelectedRouting] = useState<Routing | null>(null);

    const handleSave = (updatedRouting: Routing) => {
        updateRecord('routings', updatedRouting.id, updatedRouting);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={routings} 
                columns={ROUTING_COLUMNS} 
                onRowClick={setSelectedRouting} 
            />
            
            <RecordDrawer<Routing>
                record={selectedRouting}
                columns={ROUTING_COLUMNS}
                onClose={() => setSelectedRouting(null)}
                onSave={handleSave}
                titleAccessor="productName"
                statusAccessor="status"
            />
        </div>
    );
};
