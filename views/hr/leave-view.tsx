"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface LeaveRequest {
    id: string;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    days: number;
    status: string;
}

const mockLeaveRequests: LeaveRequest[] = [
    { id: '1', employeeName: 'John Doe', leaveType: 'Annual Leave', startDate: '2026-07-01', endDate: '2026-07-05', days: 5, status: 'Approved' },
    { id: '2', employeeName: 'Jane Smith', leaveType: 'Sick Leave', startDate: '2026-06-09', endDate: '2026-06-10', days: 2, status: 'Pending' },
    { id: '3', employeeName: 'Robert Johnson', leaveType: 'Maternity Leave', startDate: '2026-08-01', endDate: '2026-11-01', days: 90, status: 'Approved' },
    { id: '4', employeeName: 'Emily Davis', leaveType: 'Unpaid Leave', startDate: '2026-06-15', endDate: '2026-06-15', days: 1, status: 'Rejected' },
];

export const LEAVE_COLUMNS: ColumnDef<LeaveRequest>[] = [
    { header: 'Employee', accessorKey: 'employeeName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Leave Type', accessorKey: 'leaveType', type: 'select', options: ['Annual Leave', 'Sick Leave', 'Maternity Leave', 'Unpaid Leave'] },
    { header: 'Start Date', accessorKey: 'startDate', type: 'date' },
    { header: 'End Date', accessorKey: 'endDate', type: 'date' },
    { header: 'Days', accessorKey: 'days', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Pending', 'Approved', 'Rejected'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Approved' ? 'success' : val === 'Rejected' ? 'error' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const LeaveView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockLeaveRequests} 
                columns={LEAVE_COLUMNS} 
            />
        </div>
    );
};
