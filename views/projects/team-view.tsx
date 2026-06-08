"use client";

import React, { useState } from 'react';
import { ProjectTeamMember } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const TEAM_COLUMNS: ColumnDef<ProjectTeamMember>[] = [
    { header: 'Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Project', accessorKey: 'projectName', width: 'w-64' },
    { 
        header: 'Role', 
        accessorKey: 'role',
        options: ['Project Manager', 'Developer', 'Designer', 'Consultant', 'QA'],
        type: 'select'
    },
    { header: 'Allocation', accessorKey: 'allocationPct', type: 'number', render: (val) => (
        <span className={Number(val) > 100 ? 'text-red-500 font-semibold' : ''}>{val}%</span>
    )}
];

export const TeamView = () => {
    const { state, updateRecord } = useMockDb();
    const { projectTeamMembers } = state;
    const [selectedTeamMember, setSelectedTeamMember] = useState<ProjectTeamMember | null>(null);

    const handleSave = (updatedMember: ProjectTeamMember) => {
        updateRecord('projectTeamMembers', updatedMember.id, updatedMember);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={projectTeamMembers} 
                columns={TEAM_COLUMNS} 
                onRowClick={setSelectedTeamMember} 
            />
            
            <RecordDrawer<ProjectTeamMember>
                record={selectedTeamMember}
                columns={TEAM_COLUMNS}
                onClose={() => setSelectedTeamMember(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="projectName"
            />
        </div>
    );
};
