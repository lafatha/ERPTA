"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface TrainingProgram {
    id: string;
    programName: string;
    instructor: string;
    startDate: string;
    participants: number;
    status: string;
}

const mockTraining: TrainingProgram[] = [
    { id: '1', programName: 'Leadership 101', instructor: 'Dr. Alan Grant', startDate: '2026-07-01', participants: 15, status: 'Upcoming' },
    { id: '2', programName: 'Advanced React Patterns', instructor: 'Dan Abramov', startDate: '2026-05-15', participants: 30, status: 'Completed' },
    { id: '3', programName: 'Workplace Safety', instructor: 'Jane Smith', startDate: '2026-06-10', participants: 50, status: 'In Progress' },
    { id: '4', programName: 'Effective Communication', instructor: 'Simon Sinek', startDate: '2026-08-20', participants: 25, status: 'Upcoming' },
];

export const TRAINING_COLUMNS: ColumnDef<TrainingProgram>[] = [
    { header: 'Program Name', accessorKey: 'programName', width: 'w-64', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Instructor', accessorKey: 'instructor' },
    { header: 'Start Date', accessorKey: 'startDate', type: 'date' },
    { header: 'Participants', accessorKey: 'participants', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Upcoming', 'Completed', 'In Progress'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'In Progress' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const TrainingView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockTraining} 
                columns={TRAINING_COLUMNS} 
            />
        </div>
    );
};
