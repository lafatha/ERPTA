"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { CreateDrawer } from '@/components/create-drawer';

const PROCESS_DATA = [
    { id: 'SO-1001', customer: 'Acme Corp', date: '2026-06-08', value: 4500, status: 'Draft', owner: 'Sarah Kim' },
    { id: 'SO-1002', customer: 'TechFlow', date: '2026-06-07', value: 1250, status: 'Confirmed', owner: 'John Carter' },
    { id: 'SO-1003', customer: 'Nexus Industries', date: '2026-06-05', value: 18500, status: 'Invoiced', owner: 'David Chen' },
    { id: 'SO-1004', customer: 'Retail Plus', date: '2026-06-01', value: 3400, status: 'Paid', owner: 'Sarah Kim' },
];

const COLUMNS = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Order Date', accessorKey: 'date' },
    { header: 'Sales Rep', accessorKey: 'owner' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        cell: (item: any) => {
            const variant = item.status === 'Paid' ? 'outline' : item.status === 'Draft' ? 'secondary' : 'default';
            return <Badge variant={variant}>{item.status}</Badge>;
        }
    },
    { 
        header: 'Value', 
        accessorKey: 'value',
        cell: (item: any) => `$${item.value.toLocaleString()}`
    },
];

export const ProcessView = () => {
    const [mounted, setMounted] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [data, setData] = useState(PROCESS_DATA);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleCreate = (newOrder: any) => {
        setData([{ ...newOrder, id: `SO-${Math.floor(Math.random() * 10000)}` }, ...data]);
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center bg-white dark:bg-[#0f0f0f] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsCreateOpen(true)} className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Icons.Plus className="w-4 h-4 mr-2" /> New Sales Order
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Icons.Filter className="w-4 h-4 mr-2 text-gray-500" /> Filter
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <DataTable data={data} columns={COLUMNS} />
            </div>

            <CreateDrawer
                isOpen={isCreateOpen}
                columns={COLUMNS.filter(c => c.accessorKey !== 'id')}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleCreate}
                title="Create New Sales Order"
            />
        </div>
    );
};
