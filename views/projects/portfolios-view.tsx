"use client";

import React, { useState } from 'react';
import { Project } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const PROJECT_COLUMNS: ColumnDef<Project>[] = [
    { header: 'Project Name', accessorKey: 'projectName', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Customer', accessorKey: 'customerName' },
    { header: 'Budget', accessorKey: 'budget', type: 'number', render: (val) => `$${Number(val).toLocaleString()}` },
    { header: 'Spent', accessorKey: 'spent', type: 'number', render: (val) => `$${Number(val).toLocaleString()}` },
    { header: 'End Date', accessorKey: 'endDate' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Planning', 'Execution', 'Completed', 'On Hold'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'Execution' ? 'default' : val === 'On Hold' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const PortfoliosView = () => {
    const { state, updateRecord } = useMockDb();
    const { projects } = state;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleSave = (updatedProj: Project) => {
        updateRecord('projects', updatedProj.id, updatedProj);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={projects} 
                columns={PROJECT_COLUMNS} 
                onRowClick={setSelectedProject} 
            />
            
            <RecordDrawer<Project>
                record={selectedProject}
                columns={PROJECT_COLUMNS}
                onClose={() => setSelectedProject(null)}
                onSave={handleSave}
                titleAccessor="projectName"
                subtitleAccessor="customerName"
                statusAccessor="status"
            />
        </div>
    );
};
