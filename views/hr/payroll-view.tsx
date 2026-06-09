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
    { id: '1', employeeName: 'Budi Santoso', period: 'May 2026', basicSalary: 12000000, allowances: 1200000, deductions: 400000, netPay: 12800000, status: 'Paid' },
    { id: '2', employeeName: 'Siti Rahma', period: 'May 2026', basicSalary: 15000000, allowances: 1800000, deductions: 500000, netPay: 16300000, status: 'Paid' },
    { id: '3', employeeName: 'Adi Wijaya', period: 'May 2026', basicSalary: 10500000, allowances: 900000, deductions: 300000, netPay: 11100000, status: 'Processing' },
    { id: '4', employeeName: 'Dewi Lestari', period: 'May 2026', basicSalary: 13500000, allowances: 1500000, deductions: 450000, netPay: 14550000, status: 'Pending' },
];

export const PAYROLL_COLUMNS: ColumnDef<PayrollRecord>[] = [
    { header: 'Employee', accessorKey: 'employeeName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Period', accessorKey: 'period' },
    { header: 'Basic Salary', accessorKey: 'basicSalary', type: 'number', render: (val) => `Rp ${val.toLocaleString('id-ID')}` },
    { header: 'Allowances', accessorKey: 'allowances', type: 'number', render: (val) => `+Rp ${val.toLocaleString('id-ID')}` },
    { header: 'Deductions', accessorKey: 'deductions', type: 'number', render: (val) => `-Rp ${val.toLocaleString('id-ID')}` },
    { header: 'Net Pay', accessorKey: 'netPay', type: 'number', render: (val) => <span className="font-semibold text-black dark:text-white">Rp {val.toLocaleString('id-ID')}</span> },
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
