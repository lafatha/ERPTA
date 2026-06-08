"use client";

import React, { useState } from 'react';
import { WorkstationGroup } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const WORKSTATION_GROUP_COLUMNS: ColumnDef<WorkstationGroup>[] = [
    { header: 'Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Manager', accessorKey: 'manager' },
    { header: 'Workstations', accessorKey: 'workstationCount', type: 'number' },
    { header: 'Efficiency', accessorKey: 'efficiency', type: 'number', render: (val) => (
        <div className="flex items-center gap-2 w-32">
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${Number(val) < 85 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${val}%` }}></div>
            </div>
            <span className="text-xs">{val}%</span>
        </div>
    )}
];

export const WorkstationGroupsView = () => {
    const { state, updateRecord } = useMockDb();
    const { workstationGroups } = state;
    const [selectedGroup, setSelectedGroup] = useState<WorkstationGroup | null>(null);

    const handleSave = (updatedGroup: WorkstationGroup) => {
        updateRecord('workstationGroups', updatedGroup.id, updatedGroup);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={workstationGroups} 
                columns={WORKSTATION_GROUP_COLUMNS} 
                onRowClick={setSelectedGroup} 
            />
            
            <RecordDrawer<WorkstationGroup>
                record={selectedGroup}
                columns={WORKSTATION_GROUP_COLUMNS}
                onClose={() => setSelectedGroup(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="department"
            />
        </div>
    );
};
