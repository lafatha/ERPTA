"use client";

import React, { useState } from 'react';
import { Lead } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const LEAD_COLUMNS: ColumnDef<Lead>[] = [
    { header: 'Company', accessorKey: 'company', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Contact Person', accessorKey: 'contactPerson' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Source', accessorKey: 'source' },
    { header: 'Created At', accessorKey: 'createdAt' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Converted' ? 'success' : val === 'Lost' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const LeadsView = () => {
    const { state, updateRecord } = useMockDb();
    const { leads } = state;
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const handleSave = (updatedLead: Lead) => {
        updateRecord('leads', updatedLead.id, updatedLead);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={leads} 
                columns={LEAD_COLUMNS} 
                onRowClick={setSelectedLead} 
            />
            
            <RecordDrawer<Lead>
                record={selectedLead}
                columns={LEAD_COLUMNS}
                onClose={() => setSelectedLead(null)}
                onSave={handleSave}
                titleAccessor="company"
                subtitleAccessor="contactPerson"
                statusAccessor="status"
            />
        </div>
    );
};
