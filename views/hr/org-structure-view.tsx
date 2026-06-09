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
    { id: '1', departmentName: 'Design & Product Development', manager: 'Adi Wijaya', employeeCount: 45, budget: 'Rp 18.000.000.000' },
    { id: '2', departmentName: 'Marketing & Sales', manager: 'Siti Rahma', employeeCount: 24, budget: 'Rp 12.000.000.000' },
    { id: '3', departmentName: 'Human Resources', manager: 'Budi Santoso', employeeCount: 5, budget: 'Rp 2.250.000.000' },
    { id: '4', departmentName: 'Finance & Tax', manager: 'Dewi Lestari', employeeCount: 8, budget: 'Rp 3.750.000.000' },
    { id: '5', departmentName: 'Production & Manufacturing', manager: 'Eko Susilo', employeeCount: 85, budget: 'Rp 27.500.000.000' },
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
