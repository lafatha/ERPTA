"use client";

import React, { useState } from 'react';
import { ProjectMilestone } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const MILESTONE_COLUMNS: ColumnDef<ProjectMilestone>[] = [
    { header: 'Milestone', accessorKey: 'title', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Project', accessorKey: 'projectName', width: 'w-64' },
    { header: 'Target Date', accessorKey: 'date' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Pending', 'Achieved'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Achieved' ? 'success' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const MilestonesView = () => {
    const { state, updateRecord } = useMockDb();
    const { projectMilestones } = state;
    const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestone | null>(null);

    const handleSave = (updatedMilestone: ProjectMilestone) => {
        updateRecord('projectMilestones', updatedMilestone.id, updatedMilestone);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={projectMilestones} 
                columns={MILESTONE_COLUMNS} 
                onRowClick={setSelectedMilestone} 
            />
            
            <RecordDrawer<ProjectMilestone>
                record={selectedMilestone}
                columns={MILESTONE_COLUMNS}
                onClose={() => setSelectedMilestone(null)}
                onSave={handleSave}
                titleAccessor="title"
                subtitleAccessor="projectName"
                statusAccessor="status"
            />
        </div>
    );
};
