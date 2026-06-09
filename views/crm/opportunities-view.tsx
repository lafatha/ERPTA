"use client";

import React, { useState } from 'react';
import { Opportunity } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const OPPORTUNITY_COLUMNS: ColumnDef<Opportunity>[] = [
    { header: 'Opportunity Title', accessorKey: 'title', width: 'w-64', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Account', accessorKey: 'accountName' },
    { header: 'Value', accessorKey: 'value', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { header: 'Probability', accessorKey: 'probability', type: 'number', render: (val) => `${val}%` },
    { header: 'Close Date', accessorKey: 'expectedCloseDate' },
    { 
        header: 'Stage', 
        accessorKey: 'stage',
        options: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Closed Won' ? 'success' : val === 'Closed Lost' ? 'dark' : 'default'}>
                {val}
            </Badge>
        )
    }
];

export const OpportunitiesView = () => {
    const { state, updateRecord } = useMockDb();
    const { opportunities } = state;
    const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

    const handleSave = (updatedOpp: Opportunity) => {
        updateRecord('opportunities', updatedOpp.id, updatedOpp);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={opportunities} 
                columns={OPPORTUNITY_COLUMNS} 
                onRowClick={setSelectedOpp} 
            />
            
            <RecordDrawer<Opportunity>
                record={selectedOpp}
                columns={OPPORTUNITY_COLUMNS}
                onClose={() => setSelectedOpp(null)}
                onSave={handleSave}
                titleAccessor="title"
                subtitleAccessor="accountName"
                statusAccessor="stage"
            />
        </div>
    );
};
