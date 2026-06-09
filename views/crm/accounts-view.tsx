"use client";

import React, { useState } from 'react';
import { CustomerAccount } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const ACCOUNT_COLUMNS: ColumnDef<CustomerAccount>[] = [
    { header: 'Account Name', accessorKey: 'name', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Industry', accessorKey: 'industry' },
    { header: 'Account Manager', accessorKey: 'accountManager' },
    { header: 'Annual Revenue', accessorKey: 'annualRevenue', type: 'number', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Active', 'Inactive'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : 'dark'}>
                {val}
            </Badge>
        )
    }
];

export const AccountsView = () => {
    const { state, updateRecord } = useMockDb();
    const { customers } = state;
    const [selectedAccount, setSelectedAccount] = useState<CustomerAccount | null>(null);

    const handleSave = (updatedAcc: CustomerAccount) => {
        updateRecord('customers', updatedAcc.id, updatedAcc);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={customers} 
                columns={ACCOUNT_COLUMNS} 
                onRowClick={setSelectedAccount} 
            />
            
            <RecordDrawer<CustomerAccount>
                record={selectedAccount}
                columns={ACCOUNT_COLUMNS}
                onClose={() => setSelectedAccount(null)}
                onSave={handleSave}
                titleAccessor="name"
                subtitleAccessor="industry"
                statusAccessor="status"
            />
        </div>
    );
};
