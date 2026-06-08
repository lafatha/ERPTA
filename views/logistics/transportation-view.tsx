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
    { id: '1', orderNumber: 'TR-1001', carrier: 'FedEx Freight', origin: 'New York, NY', destination: 'Los Angeles, CA', status: 'In Transit', cost: 1250 },
    { id: '2', orderNumber: 'TR-1002', carrier: 'UPS Supply Chain', origin: 'Chicago, IL', destination: 'Dallas, TX', status: 'Delivered', cost: 850 },
    { id: '3', orderNumber: 'TR-1003', carrier: 'XPO Logistics', origin: 'Miami, FL', destination: 'Atlanta, GA', status: 'Scheduled', cost: 450 },
    { id: '4', orderNumber: 'TR-1004', carrier: 'DHL Global', origin: 'Seattle, WA', destination: 'Denver, CO', status: 'Delayed', cost: 1100 },
];

export const TRANSPORT_COLUMNS: ColumnDef<TransportOrder>[] = [
    { header: 'Order No.', accessorKey: 'orderNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Carrier', accessorKey: 'carrier', type: 'select', options: ['FedEx Freight', 'UPS Supply Chain', 'XPO Logistics', 'DHL Global'] },
    { header: 'Origin', accessorKey: 'origin' },
    { header: 'Destination', accessorKey: 'destination' },
    { header: 'Cost', accessorKey: 'cost', type: 'number', render: (val) => `$${val.toLocaleString()}` },
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
