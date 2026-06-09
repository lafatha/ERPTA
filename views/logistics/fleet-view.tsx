"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface Vehicle {
    id: string;
    vehicleId: string;
    type: string;
    driver: string;
    status: string;
    lastService: string;
    mileage: number;
}

const mockFleet: Vehicle[] = [
    { id: '1', vehicleId: 'V-101', type: 'Heavy Truck', driver: 'Budi Santoso', status: 'On Route', lastService: '2026-04-15', mileage: 125000 },
    { id: '2', vehicleId: 'V-102', type: 'Delivery Van', driver: 'Siti Rahma', status: 'Available', lastService: '2026-05-20', mileage: 45000 },
    { id: '3', vehicleId: 'V-103', type: 'Heavy Truck', driver: 'Adi Wijaya', status: 'Maintenance', lastService: '2026-06-05', mileage: 180000 },
    { id: '4', vehicleId: 'V-104', type: 'Delivery Van', driver: 'Dewi Lestari', status: 'Available', lastService: '2026-03-10', mileage: 32000 },
];

export const FLEET_COLUMNS: ColumnDef<Vehicle>[] = [
    { header: 'Vehicle ID', accessorKey: 'vehicleId', width: 'w-32', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Type', accessorKey: 'type', type: 'select', options: ['Heavy Truck', 'Delivery Van'] },
    { header: 'Assigned Driver', accessorKey: 'driver' },
    { header: 'Last Service', accessorKey: 'lastService', type: 'date' },
    { header: 'Mileage (km)', accessorKey: 'mileage', type: 'number', render: (val) => Number(val).toLocaleString('id-ID') },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Available', 'On Route', 'Maintenance'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Available' ? 'success' : val === 'Maintenance' ? 'error' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const FleetView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockFleet} 
                columns={FLEET_COLUMNS} 
            />
        </div>
    );
};
