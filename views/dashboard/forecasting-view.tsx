"use client";

import React from 'react';
import { Icons } from '@/components/icons';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface ForecastItem {
    id: string;
    product: string;
    category: string;
    lastMonth: number;
    projected: number;
    confidence: number;
    trend: 'up' | 'down' | 'stable';
}

const mockForecasts: ForecastItem[] = [
    { id: '1', product: 'Widget A', category: 'Electronics', lastMonth: 1200, projected: 1450, confidence: 92, trend: 'up' },
    { id: '2', product: 'Gadget B', category: 'Electronics', lastMonth: 850, projected: 820, confidence: 85, trend: 'stable' },
    { id: '3', product: 'Component C', category: 'Hardware', lastMonth: 2100, projected: 1800, confidence: 78, trend: 'down' },
    { id: '4', product: 'Device D', category: 'Smart Home', lastMonth: 450, projected: 600, confidence: 95, trend: 'up' },
    { id: '5', product: 'Accessory E', category: 'Mobile', lastMonth: 3200, projected: 3300, confidence: 88, trend: 'stable' },
];

const FORECAST_COLUMNS: ColumnDef<ForecastItem>[] = [
    { header: 'Product', accessorKey: 'product', width: 'w-48', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { header: 'Category', accessorKey: 'category', type: 'select', options: ['Electronics', 'Hardware', 'Smart Home', 'Mobile'] },
    { header: 'Last Month Actual', accessorKey: 'lastMonth', type: 'number', render: (val) => val.toLocaleString() },
    { header: 'Projected Next Month', accessorKey: 'projected', type: 'number', render: (val) => <span className="font-semibold">{val.toLocaleString()}</span> },
    { 
        header: 'Trend', 
        accessorKey: 'trend',
        options: ['up', 'down', 'stable'],
        type: 'select',
        render: (val) => (
            <div className="flex items-center gap-1">
                {val === 'up' && <Icons.ArrowUp className="w-3 h-3 text-green-500" />}
                {val === 'down' && <Icons.ArrowDown className="w-3 h-3 text-red-500" />}
                {val === 'stable' && <Icons.MoreHorizontal className="w-3 h-3 text-gray-500" />}
                <span className="capitalize">{val}</span>
            </div>
        )
    },
    { 
        header: 'Confidence Score', 
        accessorKey: 'confidence',
        type: 'number',
        render: (val) => (
            <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-200 dark:bg-[#333] rounded-full overflow-hidden">
                    <div className={`h-full ${val >= 90 ? 'bg-green-500' : val >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: `${val}%` }} />
                </div>
                <span className="text-xs text-gray-500 dark:text-[#888]">{val}%</span>
            </div>
        )
    }
];

export const DashboardForecastingView = () => {
    return (
        <div className="h-full w-full flex flex-col bg-gray-50/50 dark:bg-[#0f0f0f]">
            
            <div className="flex-1 overflow-hidden">
                <DataTable 
                    data={mockForecasts} 
                    columns={FORECAST_COLUMNS} 
                />
            </div>
        </div>
    );
};
