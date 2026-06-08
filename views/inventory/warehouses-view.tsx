"use client";

import React, { useState } from 'react';
import { Warehouse } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';
import { CreateDrawer } from '@/components/create-drawer';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

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
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleSave = (updatedWh: Warehouse) => {
        updateRecord('warehouses', updatedWh.id, updatedWh);
    };

    const handleCreate = (newWh: Partial<Warehouse>) => {
        // Mock ID generation
        const id = `WH-${Math.floor(Math.random() * 10000)}`;
        updateRecord('warehouses', id, { ...newWh, id } as Warehouse);
    };

    return (
        <div className="h-full w-full flex flex-col animate-in fade-in duration-500">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center bg-white dark:bg-[#0f0f0f] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsCreateOpen(true)} className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Icons.Plus className="w-4 h-4 mr-2" /> Add Warehouse
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
                <DataTable 
                    data={warehouses} 
                    columns={WAREHOUSE_COLUMNS} 
                    onRowClick={setSelectedWarehouse} 
                />
            </div>
            
            <RecordDrawer<Warehouse>
                record={selectedWarehouse}
                columns={WAREHOUSE_COLUMNS}
                onClose={() => setSelectedWarehouse(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="location"
                statusAccessor="status"
            />

            <CreateDrawer<Warehouse>
                isOpen={isCreateOpen}
                columns={WAREHOUSE_COLUMNS}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleCreate}
                title="Create New Warehouse"
            />
        </div>
    );
};
