"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface Plan {
    id: string;
    planId: string;
    region: string;
    assignedFleet: number;
    totalOrders: number;
    completion: string;
    status: string;
}

const mockPlans: Plan[] = [
    { id: '1', planId: 'DP-26-06A', region: 'Jabodetabek', assignedFleet: 12, totalOrders: 450, completion: '85%', status: 'Active' },
    { id: '2', planId: 'DP-26-06B', region: 'Jawa Tengah', assignedFleet: 8, totalOrders: 320, completion: '40%', status: 'Active' },
    { id: '3', planId: 'DP-26-06C', region: 'Luar Jawa', assignedFleet: 15, totalOrders: 600, completion: '0%', status: 'Draft' },
    { id: '4', planId: 'DP-26-05A', region: 'Jawa Timur', assignedFleet: 10, totalOrders: 380, completion: '100%', status: 'Completed' },
];

export const PLAN_COLUMNS: ColumnDef<Plan>[] = [
    { header: 'Plan ID', accessorKey: 'planId', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Region', accessorKey: 'region', type: 'select', options: ['Jabodetabek', 'Jawa Tengah', 'Jawa Timur', 'Luar Jawa'] },
    { header: 'Assigned Fleet', accessorKey: 'assignedFleet', type: 'number' },
    { header: 'Total Orders', accessorKey: 'totalOrders', type: 'number' },
    { header: 'Completion', accessorKey: 'completion' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'Draft', 'Completed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Completed' ? 'success' : val === 'Draft' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const DistributionView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockPlans} 
                columns={PLAN_COLUMNS} 
            />
        </div>
    );
};
