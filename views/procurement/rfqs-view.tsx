"use client";

import React, { useState } from 'react';
import { RFQ } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const RFQ_COLUMNS: ColumnDef<RFQ>[] = [
    { header: 'RFQ Number', accessorKey: 'rfqNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Item Description', accessorKey: 'itemDescription' },
    { header: 'Deadline', accessorKey: 'deadline' },
    { header: 'Bid Count', accessorKey: 'bidCount', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Published', 'Bids Received', 'Closed', 'Awarded'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Awarded' ? 'success' : val === 'Draft' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const RfqsView = () => {
    const { state, updateRecord } = useMockDb();
    const { rfqs } = state;
    const [selectedRfq, setSelectedRfq] = useState<RFQ | null>(null);

    const handleSave = (updatedRfq: RFQ) => {
        updateRecord('rfqs', updatedRfq.id, updatedRfq);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={rfqs} 
                columns={RFQ_COLUMNS} 
                onRowClick={setSelectedRfq} 
            />
            
            <RecordDrawer<RFQ>
                record={selectedRfq}
                columns={RFQ_COLUMNS}
                onClose={() => setSelectedRfq(null)}
                onSave={handleSave}
                titleAccessor="rfqNumber"
                subtitleAccessor="itemDescription"
                statusAccessor="status"
            />
        </div>
    );
};
