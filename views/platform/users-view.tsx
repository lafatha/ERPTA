"use client";

import React, { useState } from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive' | 'Pending';
    lastLogin: string;
}

export const PlatformUsersView = () => {
    const [users] = useState<PlatformUser[]>([
        { id: '1', name: 'Adi Wijaya', email: 'adi@s3furniture.co.id', role: 'Admin', status: 'Active', lastLogin: '2026-06-08 10:23 AM' },
        { id: '2', name: 'Siti Rahma', email: 'siti@s3furniture.co.id', role: 'User', status: 'Active', lastLogin: '2026-06-07 04:15 PM' },
        { id: '3', name: 'Budi Santoso', email: 'budi@s3furniture.co.id', role: 'Manager', status: 'Inactive', lastLogin: '2026-05-20 09:00 AM' },
        { id: '4', name: 'Dewi Lestari', email: 'dewi@s3furniture.co.id', role: 'User', status: 'Pending', lastLogin: 'Never' },
        { id: '5', name: 'Eko Susilo', email: 'eko@s3furniture.co.id', role: 'User', status: 'Active', lastLogin: '2026-06-08 08:45 AM' },
        { id: '6', name: 'Fitriani', email: 'fitri@s3furniture.co.id', role: 'Manager', status: 'Active', lastLogin: '2026-06-06 11:30 AM' },
    ]);

    const columns: ColumnDef<PlatformUser>[] = [
        { 
            header: 'Name', 
            accessorKey: 'name',
            render: (val) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                        {String(val).charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{val}</span>
                </div>
            )
        },
        { 
            header: 'Email', 
            accessorKey: 'email',
            render: (val) => <span className="text-gray-500">{val}</span>
        },
        { 
            header: 'Role', 
            accessorKey: 'role',
            type: 'select',
            options: ['Admin', 'Manager', 'User'],
            render: (val) => <span className="text-gray-700">{val}</span>
        },
        { 
            header: 'Status', 
            accessorKey: 'status',
            type: 'select',
            options: ['Active', 'Inactive', 'Pending'],
            render: (val) => {
                if (val === 'Active') return <Badge variant="success">{val}</Badge>;
                if (val === 'Inactive') return <Badge variant="default" className="bg-gray-100 text-gray-600 hover:bg-gray-200">{val}</Badge>;
                return <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">{val}</Badge>;
            }
        },
        { 
            header: 'Last Login', 
            accessorKey: 'lastLogin',
            render: (val) => <span className="text-gray-500 text-sm">{val}</span>
        },
        {
            header: '',
            accessorKey: 'id',
            render: () => (
                <div className="flex justify-end">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 transition-colors">
                        <Icons.MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="h-full bg-white dark:bg-[#0f0f0f] flex flex-col transition-colors duration-200">
            {/* Action Bar */}
            <div className="bg-white dark:bg-[#0f0f0f] px-6 py-3 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center z-10 flex-shrink-0 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Platform Users</h2>
                <button className="bg-blue-600 dark:bg-white hover:bg-blue-700 dark:hover:bg-gray-200 text-white dark:text-black px-3 py-1.5 rounded-sm text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <Icons.Plus className="w-4 h-4" />
                    Add User
                </button>
            </div>
            <div className="flex-1 overflow-hidden">
                <DataTable data={users} columns={columns} />
            </div>
        </div>
    );
};
