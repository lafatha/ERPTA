"use client";

import React, { useState } from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface Employee {
    id: string;
    employeeId: string;
    name: string;
    department: string;
    role: string;
    status: string;
    joinDate: string;
}

const mockEmployees: Employee[] = [
    { id: '1', employeeId: 'EMP-001', name: 'John Doe', department: 'Engineering', role: 'Software Engineer', status: 'Active', joinDate: '2023-01-15' },
    { id: '2', employeeId: 'EMP-002', name: 'Jane Smith', department: 'Marketing', role: 'Marketing Manager', status: 'Active', joinDate: '2022-11-01' },
    { id: '3', employeeId: 'EMP-003', name: 'Robert Johnson', department: 'HR', role: 'HR Specialist', status: 'On Leave', joinDate: '2024-03-10' },
    { id: '4', employeeId: 'EMP-004', name: 'Emily Davis', department: 'Finance', role: 'Financial Analyst', status: 'Active', joinDate: '2021-06-22' },
    { id: '5', employeeId: 'EMP-005', name: 'Michael Wilson', department: 'Engineering', role: 'QA Engineer', status: 'Terminated', joinDate: '2020-09-05' },
];

export const EMPLOYEES_COLUMNS: ColumnDef<Employee>[] = [
    { header: 'Employee ID', accessorKey: 'employeeId', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Department', accessorKey: 'department', type: 'select', options: ['Engineering', 'Marketing', 'HR', 'Finance'] },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Join Date', accessorKey: 'joinDate', type: 'date' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'On Leave', 'Terminated'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : val === 'Terminated' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const EmployeesView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockEmployees} 
                columns={EMPLOYEES_COLUMNS} 
            />
        </div>
    );
};
