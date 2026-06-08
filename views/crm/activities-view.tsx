"use client";

import React, { useState } from 'react';
import { Activity } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const ACTIVITY_COLUMNS: ColumnDef<Activity>[] = [
    { header: 'Title', accessorKey: 'title', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { 
        header: 'Type', 
        accessorKey: 'type',
        options: ['Call', 'Email', 'Meeting', 'Task'],
        type: 'select'
    },
    { header: 'Related To', accessorKey: 'relatedTo' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Assigned To', accessorKey: 'assignedTo' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Pending', 'Completed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const ActivitiesView = () => {
    const { state, updateRecord } = useMockDb();
    const { activities } = state;
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const handleSave = (updatedActivity: Activity) => {
        updateRecord('activities', updatedActivity.id, updatedActivity);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={activities} 
                columns={ACTIVITY_COLUMNS} 
                onRowClick={setSelectedActivity} 
            />
            
            <RecordDrawer<Activity>
                record={selectedActivity}
                columns={ACTIVITY_COLUMNS}
                onClose={() => setSelectedActivity(null)}
                onSave={handleSave}
                titleAccessor="title"
                subtitleAccessor="relatedTo"
                statusAccessor="status"
            />
        </div>
    );
};
