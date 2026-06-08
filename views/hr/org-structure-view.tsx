"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';

interface Department {
    id: string;
    departmentName: string;
    manager: string;
    employeeCount: number;
    budget: string;
}

const mockDepartments: Department[] = [
    { id: '1', departmentName: 'Engineering', manager: 'John Doe', employeeCount: 45, budget: '$1.2M' },
    { id: '2', departmentName: 'Marketing', manager: 'Jane Smith', employeeCount: 12, budget: '$400k' },
    { id: '3', departmentName: 'HR', manager: 'Robert Johnson', employeeCount: 5, budget: '$150k' },
    { id: '4', departmentName: 'Finance', manager: 'Emily Davis', employeeCount: 8, budget: '$250k' },
    { id: '5', departmentName: 'Sales', manager: 'Michael Wilson', employeeCount: 24, budget: '$800k' },
];

export const ORG_COLUMNS: ColumnDef<Department>[] = [
    { header: 'Department', accessorKey: 'departmentName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Manager', accessorKey: 'manager' },
    { header: 'Employees', accessorKey: 'employeeCount', type: 'number' },
    { header: 'Budget', accessorKey: 'budget' },
];

export const OrgStructureView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockDepartments} 
                columns={ORG_COLUMNS} 
            />
        </div>
    );
};
