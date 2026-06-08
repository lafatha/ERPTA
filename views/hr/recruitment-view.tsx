"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface Candidate {
    id: string;
    name: string;
    position: string;
    stage: string;
    appliedDate: string;
    rating: number;
}

const mockCandidates: Candidate[] = [
    { id: '1', name: 'Alice Brown', position: 'Frontend Developer', stage: 'Interview', appliedDate: '2026-06-01', rating: 4 },
    { id: '2', name: 'Charlie Green', position: 'Backend Developer', stage: 'Screening', appliedDate: '2026-06-05', rating: 3 },
    { id: '3', name: 'David White', position: 'Product Manager', stage: 'Offer Extended', appliedDate: '2026-05-20', rating: 5 },
    { id: '4', name: 'Eve Black', position: 'UX Designer', stage: 'Rejected', appliedDate: '2026-05-15', rating: 2 },
];

export const RECRUITMENT_COLUMNS: ColumnDef<Candidate>[] = [
    { header: 'Candidate Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Position', accessorKey: 'position', type: 'select', options: ['Frontend Developer', 'Backend Developer', 'Product Manager', 'UX Designer'] },
    { header: 'Applied Date', accessorKey: 'appliedDate', type: 'date' },
    { header: 'Rating (out of 5)', accessorKey: 'rating', type: 'number' },
    { 
        header: 'Stage', 
        accessorKey: 'stage',
        options: ['Screening', 'Interview', 'Offer Extended', 'Rejected'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Offer Extended' ? 'success' : val === 'Rejected' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const RecruitmentView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockCandidates} 
                columns={RECRUITMENT_COLUMNS} 
            />
        </div>
    );
};
