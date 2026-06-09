"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface Shipment {
    id: string;
    trackingId: string;
    customer: string;
    destination: string;
    expectedDate: string;
    currentLocation: string;
    status: string;
}

const mockShipments: Shipment[] = [
    { id: '1', trackingId: 'SHP-9901', customer: 'PT Ruang Kerja Modern', destination: 'Jakarta', expectedDate: '2026-06-12', currentLocation: 'Tangerang Hub', status: 'In Transit' },
    { id: '2', trackingId: 'SHP-9902', customer: 'PT Desain Interior Prima', destination: 'Surabaya', expectedDate: '2026-06-15', currentLocation: 'Semarang Hub', status: 'In Transit' },
    { id: '3', trackingId: 'SHP-9903', customer: 'PT Amanah Properti Hotel', destination: 'Bandung', expectedDate: '2026-06-08', currentLocation: 'Bandung', status: 'Delivered' },
    { id: '4', trackingId: 'SHP-9904', customer: 'PT Ritel Mebel Indonesia', destination: 'Medan', expectedDate: '2026-06-09', currentLocation: 'Surabaya Hub', status: 'Delayed' },
];

export const SHIPMENT_COLUMNS: ColumnDef<Shipment>[] = [
    { header: 'Tracking ID', accessorKey: 'trackingId', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white underline cursor-pointer">{val}</span> },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Destination', accessorKey: 'destination' },
    { header: 'Expected Date', accessorKey: 'expectedDate', type: 'date' },
    { header: 'Current Location', accessorKey: 'currentLocation' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['In Transit', 'Delivered', 'Delayed'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Delivered' ? 'success' : val === 'Delayed' ? 'error' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const ShipmentView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockShipments} 
                columns={SHIPMENT_COLUMNS} 
            />
        </div>
    );
};
