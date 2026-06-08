"use client";

import React, { useState, useEffect } from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const FULFILLMENT_DATA = [
    { id: 'SHP-2001', orderId: 'SO-1002', customer: 'TechFlow', targetDate: '2026-06-10', status: 'Pending', priority: 'High' },
    { id: 'SHP-2002', orderId: 'SO-1003', customer: 'Nexus Industries', targetDate: '2026-06-08', status: 'Shipped', priority: 'Normal' },
    { id: 'SHP-2003', orderId: 'SO-0995', customer: 'Acme Corp', targetDate: '2026-06-01', status: 'Delivered', priority: 'High' },
    { id: 'SHP-2004', orderId: 'SO-1004', customer: 'Retail Plus', targetDate: '2026-06-05', status: 'Packed', priority: 'Normal' },
];

const COLUMNS: ColumnDef<any>[] = [
    { header: 'Shipment ID', accessorKey: 'id' },
    { header: 'Order ID', accessorKey: 'orderId' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Target Date', accessorKey: 'targetDate' },
    { 
        header: 'Priority', 
        accessorKey: 'priority',
        render: (value: any, item: any) => (
            <span className={item.priority === 'High' ? 'text-red-500 font-medium' : ''}>{item.priority}</span>
        )
    },
    { 
        header: 'Status', 
        accessorKey: 'status',
        render: (value: any, item: any) => {
            const variant = item.status === 'Delivered' ? 'outline' : item.status === 'Pending' ? 'secondary' : 'default';
            return <Badge variant={variant}>{item.status}</Badge>;
        }
    },
];

export const FulfillmentView = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center bg-white dark:bg-[#0f0f0f] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Icons.CheckCircle className="w-4 h-4 mr-2" /> Mark as Shipped
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Icons.Printer className="w-4 h-4 mr-2 text-gray-500" /> Print Labels
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <DataTable data={FULFILLMENT_DATA} columns={COLUMNS} />
            </div>
        </div>
    );
};
