"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';

interface PerformanceRecord {
    id: string;
    employeeName: string;
    reviewer: string;
    reviewDate: string;
    score: number;
    goalsAchieved: string;
}

const mockPerformance: PerformanceRecord[] = [
    { id: '1', employeeName: 'John Doe', reviewer: 'Michael Scott', reviewDate: '2026-01-10', score: 85, goalsAchieved: '4/5' },
    { id: '2', employeeName: 'Jane Smith', reviewer: 'Michael Scott', reviewDate: '2026-01-12', score: 92, goalsAchieved: '5/5' },
    { id: '3', employeeName: 'Robert Johnson', reviewer: 'Toby Flenderson', reviewDate: '2026-01-15', score: 78, goalsAchieved: '3/5' },
    { id: '4', employeeName: 'Emily Davis', reviewer: 'Dwight Schrute', reviewDate: '2026-01-18', score: 88, goalsAchieved: '4/5' },
];

export const PERFORMANCE_COLUMNS: ColumnDef<PerformanceRecord>[] = [
    { header: 'Employee', accessorKey: 'employeeName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Reviewer', accessorKey: 'reviewer' },
    { header: 'Review Date', accessorKey: 'reviewDate', type: 'date' },
    { header: 'Score (Out of 100)', accessorKey: 'score', type: 'number', render: (val) => <span className="font-medium">{val}</span> },
    { header: 'Goals Achieved', accessorKey: 'goalsAchieved' },
];

export const PerformanceView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockPerformance} 
                columns={PERFORMANCE_COLUMNS} 
            />
        </div>
    );
};
