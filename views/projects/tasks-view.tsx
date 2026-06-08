"use client";

import React, { useState } from 'react';
import { ProjectTask } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const PROJECT_TASK_COLUMNS: ColumnDef<ProjectTask>[] = [
    { header: 'Task Name', accessorKey: 'taskName', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Project', accessorKey: 'projectName', width: 'w-48' },
    { header: 'Assignee', accessorKey: 'assignee' },
    { header: 'Due Date', accessorKey: 'dueDate' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['To Do', 'In Progress', 'Review', 'Done'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Done' ? 'success' : val === 'In Progress' ? 'default' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const TasksView = () => {
    const { state, updateRecord } = useMockDb();
    const { projectTasks } = state;
    const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

    const handleSave = (updatedTask: ProjectTask) => {
        updateRecord('projectTasks', updatedTask.id, updatedTask);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={projectTasks} 
                columns={PROJECT_TASK_COLUMNS} 
                onRowClick={setSelectedTask} 
            />
            
            <RecordDrawer<ProjectTask>
                record={selectedTask}
                columns={PROJECT_TASK_COLUMNS}
                onClose={() => setSelectedTask(null)}
                onSave={handleSave}
                titleAccessor="taskName"
                subtitleAccessor="projectName"
                statusAccessor="status"
            />
        </div>
    );
};
