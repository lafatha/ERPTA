"use client";

import React from 'react';
import { Icons } from '@/components/icons';

export const DashboardKpiView = () => {
    const kpis = [
        { label: 'Total Revenue', value: 'Rp 36.000.000.000', target: 'Rp 37.500.000.000', progress: 96, trend: '+12%', isPositive: true },
        { label: 'Operating Margin', value: '24.2%', target: '25.0%', progress: 97, trend: '+1.5%', isPositive: true },
        { label: 'Customer Satisfaction', value: '4.8/5.0', target: '4.5', progress: 100, trend: '+0.2', isPositive: true },
        { label: 'Employee Turnover', value: '4.2%', target: '< 5.0%', progress: 100, trend: '-0.5%', isPositive: true },
        { label: 'Inventory Turnover', value: '6.5', target: '8.0', progress: 81, trend: '-0.2', isPositive: false },
        { label: 'Order Fulfillment', value: '94.5%', target: '98.0%', progress: 96, trend: '+2.1%', isPositive: true },
    ];

    return (
        <div className="p-6 h-full flex flex-col bg-gray-50/50 dark:bg-[#0f0f0f] overflow-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-[#f1f1f1]">Key Performance Indicators (KPIs)</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#1a1a1a] p-5 border border-gray-200 dark:border-[#333] rounded-md shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-[#aaaaaa]">{kpi.label}</h3>
                            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {kpi.isPositive ? <Icons.TrendingUp className="w-3 h-3" /> : <Icons.ArrowDown className="w-3 h-3" />}
                                {kpi.trend}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{kpi.value}</div>
                        <div className="text-xs text-gray-400 dark:text-[#888] mb-4">Target: {kpi.target}</div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-[#333] rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${kpi.progress >= 95 ? 'bg-green-500' : kpi.progress >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                style={{ width: `${kpi.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-md shadow-sm p-6 flex-1">
                <h3 className="text-sm font-semibold mb-6 text-gray-700 dark:text-[#ddd]">Company Performance Trend</h3>
                <div className="flex-1 h-48 flex items-end gap-2 border-b border-gray-100 dark:border-[#333] pb-2">
                    {/* Placeholder for chart */}
                    {[65, 70, 75, 72, 85, 90, 88, 92, 95, 96, 94, 98].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-blue-100 dark:bg-blue-900/30 relative group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors rounded-t-sm" style={{ height: `${h}%` }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black dark:bg-[#f1f1f1] text-white dark:text-black px-1.5 py-0.5 rounded-sm">{h}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-[#777] mt-2">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                </div>
            </div>
        </div>
    );
};
