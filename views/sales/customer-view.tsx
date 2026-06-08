"use client";

import React, { useState, useEffect } from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { CreateDrawer } from '@/components/create-drawer';

const CUSTOMERS_DATA = [
    { id: '1', name: 'Acme Corp', segment: 'Enterprise', status: 'Active', spend: 154000, lastOrder: '2026-05-15' },
    { id: '2', name: 'TechFlow', segment: 'Mid-Market', status: 'Active', spend: 42500, lastOrder: '2026-06-02' },
    { id: '3', name: 'Global Logistics', segment: 'Enterprise', status: 'Inactive', spend: 12000, lastOrder: '2025-11-10' },
    { id: '4', name: 'Retail Plus', segment: 'Small Business', status: 'Active', spend: 8500, lastOrder: '2026-05-28' },
    { id: '5', name: 'Nexus Industries', segment: 'Enterprise', status: 'Active', spend: 215000, lastOrder: '2026-06-08' },
];

const COLUMNS: ColumnDef<any>[] = [
    { header: 'Customer Name', accessorKey: 'name' },
    { header: 'Segment', accessorKey: 'segment' },
    { header: 'Last Order', accessorKey: 'lastOrder' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        render: (value: any, item: any) => (
            <Badge variant={item.status === 'Active' ? 'default' : 'outline'}>{item.status}</Badge>
        )
    },
    { 
        header: 'Total Spend', 
        accessorKey: 'spend',
        render: (value: any, item: any) => `$${item.spend.toLocaleString()}`
    },
];

export const CustomerView = () => {
    const [mounted, setMounted] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [data, setData] = useState(CUSTOMERS_DATA);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleCreate = (newCust: any) => {
        setData([{ ...newCust, id: Date.now().toString() }, ...data]);
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center bg-white dark:bg-[#0f0f0f] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsCreateOpen(true)} className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Icons.Plus className="w-4 h-4 mr-2" /> Add Customer
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Icons.Filter className="w-4 h-4 mr-2 text-gray-500" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Icons.Download className="w-4 h-4 mr-2 text-gray-500" /> Export
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
                title="Add New Customer"
            />
        </div>
    );
};
