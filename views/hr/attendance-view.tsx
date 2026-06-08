"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
    id: string;
    employeeName: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    hoursWorked: number;
}

const mockAttendance: AttendanceRecord[] = [
    { id: '1', employeeName: 'John Doe', date: '2026-06-08', checkIn: '08:50', checkOut: '17:05', status: 'Present', hoursWorked: 8.25 },
    { id: '2', employeeName: 'Jane Smith', date: '2026-06-08', checkIn: '09:15', checkOut: '17:30', status: 'Late', hoursWorked: 8.25 },
    { id: '3', employeeName: 'Robert Johnson', date: '2026-06-08', checkIn: '-', checkOut: '-', status: 'Absent', hoursWorked: 0 },
    { id: '4', employeeName: 'Emily Davis', date: '2026-06-08', checkIn: '08:55', checkOut: '17:00', status: 'Present', hoursWorked: 8 },
];

export const ATTENDANCE_COLUMNS: ColumnDef<AttendanceRecord>[] = [
    { header: 'Employee', accessorKey: 'employeeName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Date', accessorKey: 'date', type: 'date' },
    { header: 'Check In', accessorKey: 'checkIn' },
    { header: 'Check Out', accessorKey: 'checkOut' },
    { header: 'Hours Worked', accessorKey: 'hoursWorked', type: 'number' },
    { 
        header: 'Status', 
        accessorKey: 'status',
        options: ['Present', 'Late', 'Absent'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Present' ? 'success' : val === 'Absent' ? 'error' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const AttendanceView = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={mockAttendance} 
                columns={ATTENDANCE_COLUMNS} 
            />
        </div>
    );
};
