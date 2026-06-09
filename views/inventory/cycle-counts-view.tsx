"use client";

import React, { useState } from 'react';
import { CycleCount } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const CYCLE_COUNT_COLUMNS: ColumnDef<CycleCount>[] = [
    { header: 'Scheduled Date', accessorKey: 'scheduledDate', width: 'w-32' },
    { header: 'Warehouse', accessorKey: 'warehouse' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Assigned To', accessorKey: 'assignedTo' },
    { header: 'Variance Value', accessorKey: 'varianceValue', type: 'number', render: (val) => (
        <span className={Number(val) < 0 ? 'text-red-600 font-medium' : 'text-gray-900'}>
            Rp {Math.abs(Number(val)).toLocaleString('id-ID')} {Number(val) < 0 ? '(Loss)' : ''}
        </span>
    )},
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Scheduled', 'In Progress', 'Completed', 'Requires Recount'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'Requires Recount' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const CycleCountsView = () => {
    const { state, updateRecord } = useMockDb();
    const { cycleCounts } = state;
    const [selectedCount, setSelectedCount] = useState<CycleCount | null>(null);

    const handleSave = (updatedCount: CycleCount) => {
        updateRecord('cycleCounts', updatedCount.id, updatedCount);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={cycleCounts} 
                columns={CYCLE_COUNT_COLUMNS} 
                onRowClick={setSelectedCount} 
            />
            
            <RecordDrawer<CycleCount>
                record={selectedCount}
                columns={CYCLE_COUNT_COLUMNS}
                onClose={() => setSelectedCount(null)}
                onSave={handleSave}
                titleAccessor="warehouse"
                subtitleAccessor="category"
                statusAccessor="status"
            />
        </div>
    );
};
