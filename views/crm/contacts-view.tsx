"use client";

import React, { useState } from 'react';
import { Contact } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const CONTACT_COLUMNS: ColumnDef<Contact>[] = [
    { header: 'First Name', accessorKey: 'firstName' },
    { header: 'Last Name', accessorKey: 'lastName', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Account', accessorKey: 'accountName' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Role', accessorKey: 'role' },
];

export const ContactsView = () => {
    const { state, updateRecord } = useMockDb();
    const { contacts } = state;
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    const handleSave = (updatedContact: Contact) => {
        updateRecord('contacts', updatedContact.id, updatedContact);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={contacts} 
                columns={CONTACT_COLUMNS} 
                onRowClick={setSelectedContact} 
            />
            
            <RecordDrawer<Contact>
                record={selectedContact}
                columns={CONTACT_COLUMNS}
                onClose={() => setSelectedContact(null)}
                onSave={handleSave}
                titleAccessor="lastName"
                subtitleAccessor="accountName"
            />
        </div>
    );
};
