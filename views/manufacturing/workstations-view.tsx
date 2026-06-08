"use client";

import React, { useState } from 'react';
import { Workstation } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const WORKSTATION_COLUMNS: ColumnDef<Workstation>[] = [
    { header: 'Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Workstation Group', accessorKey: 'groupName' },
    { header: 'Efficiency', accessorKey: 'efficiency', type: 'number', render: (val) => (
        <div className="flex items-center gap-2 w-32">
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${Number(val) < 85 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${val}%` }}></div>
            </div>
            <span className="text-xs">{val}%</span>
        </div>
    )},
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Operational', 'Maintenance', 'Offline'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Operational' ? 'success' : val === 'Maintenance' ? 'outline' : 'dark'}>
                {val}
            </Badge>
        )
    }
];

export const WorkstationsView = () => {
    const { state, updateRecord } = useMockDb();
    const { workstations } = state;
    const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation | null>(null);

    const handleSave = (updatedWs: Workstation) => {
        updateRecord('workstations', updatedWs.id, updatedWs);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={workstations} 
                columns={WORKSTATION_COLUMNS} 
                onRowClick={setSelectedWorkstation} 
            />
            
            <RecordDrawer<Workstation>
                record={selectedWorkstation}
                columns={WORKSTATION_COLUMNS}
                onClose={() => setSelectedWorkstation(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="groupName"
                statusAccessor="status"
            />
        </div>
    );
};
