"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface TransportOrder {
    id: string;
    orderNumber: string;
    carrier: string;
    origin: string;
    destination: string;
    status: string;
    cost: number;
}

const mockTransport: TransportOrder[] = [
    { id: '1', orderNumber: 'TR-1001', carrier: 'J&T Cargo', origin: 'Jepara', destination: 'Jakarta', status: 'In Transit', cost: 18750000 },
    { id: '2', orderNumber: 'TR-1002', carrier: 'JNE Cargo', origin: 'Semarang', destination: 'Surabaya', status: 'Delivered', cost: 12750000 },
    { id: '3', orderNumber: 'TR-1003', carrier: 'Sicepat Cargo', origin: 'Tangerang', destination: 'Bandung', status: 'Scheduled', cost: 6750000 },
    { id: '4', orderNumber: 'TR-1004', carrier: 'Karya Indah Logistics', origin: 'Jepara', destination: 'Medan', status: 'Delayed', cost: 24750000 },
];

export const TRANSPORT_COLUMNS: ColumnDef<TransportOrder>[] = [
    { header: 'Order No.', accessorKey: 'orderNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Carrier', accessorKey: 'carrier', type: 'select', options: ['JNE Cargo', 'J&T Cargo', 'Sicepat Cargo', 'Karya Indah Logistics'] },
    { header: 'Origin', accessorKey: 'origin' },
    { header: 'Destination', accessorKey: 'destination' },
    { header: 'Cost', accessorKey: 'cost', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Scheduled', 'In Transit', 'Delivered', 'Delayed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Delivered' ? 'success' : val === 'Delayed' ? 'error' : val === 'In Transit' ? 'outline' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const TransportationView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockTransport} 
                columns={TRANSPORT_COLUMNS} 
            />
        </div>
    );
};
