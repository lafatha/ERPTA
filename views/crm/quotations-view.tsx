"use client";

import React, { useState } from 'react';
import { Quotation } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const QUOTATION_COLUMNS: ColumnDef<Quotation>[] = [
    { header: 'Quote #', accessorKey: 'quoteNumber', width: 'w-32', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Account', accessorKey: 'accountName' },
    { header: 'Opportunity', accessorKey: 'opportunityName' },
    { header: 'Total Amount', accessorKey: 'totalAmount', type: 'number', render: (val) => `$${Number(val).toLocaleString()}` },
    { header: 'Valid Until', accessorKey: 'validUntil' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Accepted' ? 'success' : val === 'Rejected' ? 'dark' : val === 'Sent' ? 'default' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const QuotationsView = () => {
    const { state, updateRecord } = useMockDb();
    const { quotations } = state;
    const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

    const handleSave = (updatedQuote: Quotation) => {
        updateRecord('quotations', updatedQuote.id, updatedQuote);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={quotations} 
                columns={QUOTATION_COLUMNS} 
                onRowClick={setSelectedQuote} 
            />
            
            <RecordDrawer<Quotation>
                record={selectedQuote}
                columns={QUOTATION_COLUMNS}
                onClose={() => setSelectedQuote(null)}
                onSave={handleSave}
                titleAccessor="quoteNumber"
                subtitleAccessor="accountName"
                statusAccessor="status"
            />
        </div>
    );
};
