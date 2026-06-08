"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface PayrollRecord {
    id: string;
    employeeName: string;
    period: string;
    basicSalary: number;
    allowances: number;
    deductions: number;
    netPay: number;
    status: string;
}

const mockPayroll: PayrollRecord[] = [
    { id: '1', employeeName: 'John Doe', period: 'May 2026', basicSalary: 5000, allowances: 500, deductions: 200, netPay: 5300, status: 'Paid' },
    { id: '2', employeeName: 'Jane Smith', period: 'May 2026', basicSalary: 6000, allowances: 800, deductions: 300, netPay: 6500, status: 'Paid' },
    { id: '3', employeeName: 'Robert Johnson', period: 'May 2026', basicSalary: 4500, allowances: 400, deductions: 150, netPay: 4750, status: 'Processing' },
    { id: '4', employeeName: 'Emily Davis', period: 'May 2026', basicSalary: 5500, allowances: 600, deductions: 250, netPay: 5850, status: 'Pending' },
];

export const PAYROLL_COLUMNS: ColumnDef<PayrollRecord>[] = [
    { header: 'Employee', accessorKey: 'employeeName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Period', accessorKey: 'period' },
    { header: 'Basic Salary', accessorKey: 'basicSalary', type: 'number', render: (val) => `$${val.toLocaleString()}` },
    { header: 'Allowances', accessorKey: 'allowances', type: 'number', render: (val) => `+$${val.toLocaleString()}` },
    { header: 'Deductions', accessorKey: 'deductions', type: 'number', render: (val) => `-$${val.toLocaleString()}` },
    { header: 'Net Pay', accessorKey: 'netPay', type: 'number', render: (val) => <span className="font-semibold text-black dark:text-white">${val.toLocaleString()}</span> },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Paid', 'Processing', 'Pending'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Paid' ? 'success' : val === 'Processing' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const PayrollView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockPayroll} 
                columns={PAYROLL_COLUMNS} 
            />
        </div>
    );
};
