"use client";

import React, { useState } from 'react';
import { Warehouse } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const WAREHOUSE_COLUMNS: ColumnDef<Warehouse>[] = [
    { header: 'Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Manager', accessorKey: 'manager' },
    { header: 'Capacity Usage', accessorKey: 'capacityPct', type: 'number', render: (val) => (
        <div className="flex items-center gap-2 w-32">
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${Number(val) > 90 ? 'bg-red-500' : 'bg-black'}`} style={{ width: `${val}%` }}></div>
            </div>
            <span className="text-xs">{val}%</span>
        </div>
    )},
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'Full', 'Maintenance'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : val === 'Full' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const WarehousesView = () => {
    const { state, updateRecord } = useMockDb();
    const { warehouses } = state;
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

    const handleSave = (updatedWh: Warehouse) => {
        updateRecord('warehouses', updatedWh.id, updatedWh);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={warehouses} 
                columns={WAREHOUSE_COLUMNS} 
                onRowClick={setSelectedWarehouse} 
            />
            
            <RecordDrawer<Warehouse>
                record={selectedWarehouse}
                columns={WAREHOUSE_COLUMNS}
                onClose={() => setSelectedWarehouse(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="location"
                statusAccessor="status"
            />
        </div>
    );
};
