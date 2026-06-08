"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const BILLING_DATA = [
    { id: 'INV-4001', orderId: 'SO-1003', customer: 'Nexus Industries', issueDate: '2026-06-06', dueDate: '2026-07-06', amount: 18500, status: 'Unpaid' },
    { id: 'INV-4002', orderId: 'SO-1004', customer: 'Retail Plus', issueDate: '2026-06-01', dueDate: '2026-07-01', amount: 3400, status: 'Paid' },
    { id: 'INV-3998', orderId: 'SO-0950', customer: 'Acme Corp', issueDate: '2026-05-01', dueDate: '2026-06-01', amount: 12500, status: 'Overdue' },
    { id: 'INV-4005', orderId: 'SO-1002', customer: 'TechFlow', issueDate: '2026-06-08', dueDate: '2026-07-08', amount: 1250, status: 'Unpaid' },
];

const COLUMNS = [
    { header: 'Invoice ID', accessorKey: 'id' },
    { header: 'Order ID', accessorKey: 'orderId' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Issue Date', accessorKey: 'issueDate' },
    { header: 'Due Date', accessorKey: 'dueDate' },
    { 
        header: 'Amount', 
        accessorKey: 'amount',
        cell: (item: any) => `$${item.amount.toLocaleString()}`
    },
    { 
        header: 'Status', 
        accessorKey: 'status',
        cell: (item: any) => {
            const isDark = document.documentElement.classList.contains('dark');
            const colorClass = item.status === 'Paid' ? (isDark ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600 bg-green-50') : 
                             item.status === 'Overdue' ? (isDark ? 'text-red-400 border-red-400' : 'text-red-600 border-red-600 bg-red-50') : '';
                             
            return <Badge variant={item.status === 'Paid' ? 'outline' : 'default'} className={colorClass}>{item.status}</Badge>;
        }
    },
];

export const BillingView = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center bg-white dark:bg-[#0f0f0f] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Icons.Plus className="w-4 h-4 mr-2" /> Generate Invoice
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Icons.Download className="w-4 h-4 mr-2 text-gray-500" /> Export PDF
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <DataTable data={BILLING_DATA} columns={COLUMNS} />
            </div>
        </div>
    );
};
