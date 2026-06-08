"use client";

import React, { useState } from 'react';
import { Supplier } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const SUPPLIER_COLUMNS: ColumnDef<Supplier>[] = [
    { header: 'Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Contact', accessorKey: 'contactName' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Rating', accessorKey: 'rating', render: (val) => (
        <div className="flex text-yellow-400">
            {Array.from({length: Number(val)}).map((_, i) => <span key={i}>★</span>)}
        </div>
    )},
    { header: 'Lead Time (Days)', accessorKey: 'leadTimeDays', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'Inactive', 'Pending'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : val === 'Inactive' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const SuppliersView = () => {
    const { state, updateRecord } = useMockDb();
    const { suppliers } = state;
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const handleSave = (updatedSupplier: Supplier) => {
        updateRecord('suppliers', updatedSupplier.id, updatedSupplier);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={suppliers} 
                columns={SUPPLIER_COLUMNS} 
                onRowClick={setSelectedSupplier} 
            />
            
            <RecordDrawer<Supplier>
                record={selectedSupplier}
                columns={SUPPLIER_COLUMNS}
                onClose={() => setSelectedSupplier(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="email"
                statusAccessor="status"
            />
        </div>
    );
};
