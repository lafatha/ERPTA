"use client";

import React, { useState } from 'react';
import { ProjectBudget } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const BUDGET_COLUMNS: ColumnDef<ProjectBudget>[] = [
    { header: 'Project', accessorKey: 'projectName', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { 
        header: 'Category', 
        accessorKey: 'category',
        options: ['Labor', 'Materials', 'Software', 'Travel', 'Other'],
        type: 'select'
    },
    { header: 'Allocated', accessorKey: 'allocated', type: 'number', render: (val) => `$${Number(val).toLocaleString()}` },
    { header: 'Spent', accessorKey: 'spent', type: 'number', render: (val) => `$${Number(val).toLocaleString()}` },
    { header: 'Variance', accessorKey: 'allocated', type: 'number', render: (val, row) => {
        const remaining = Number(val) - Number(row.spent);
        const percent = (Number(row.spent) / Number(val)) * 100;
        return (
            <div className="flex items-center gap-2 w-32">
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${percent > 90 ? 'bg-red-500' : percent > 75 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
                </div>
                <span className={`text-xs ${remaining < 0 ? 'text-red-600 font-semibold' : ''}`}>${Math.abs(remaining).toLocaleString()}</span>
            </div>
        );
    }}
];

export const BudgetsView = () => {
    const { state, updateRecord } = useMockDb();
    const { projectBudgets } = state;
    const [selectedBudget, setSelectedBudget] = useState<ProjectBudget | null>(null);

    const handleSave = (updatedBudget: ProjectBudget) => {
        updateRecord('projectBudgets', updatedBudget.id, updatedBudget);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={projectBudgets} 
                columns={BUDGET_COLUMNS} 
                onRowClick={setSelectedBudget} 
            />
            
            <RecordDrawer<ProjectBudget>
                record={selectedBudget}
                columns={BUDGET_COLUMNS}
                onClose={() => setSelectedBudget(null)}
                onSave={handleSave}
                titleAccessor="category"
                subtitleAccessor="projectName"
            />
        </div>
    );
};
