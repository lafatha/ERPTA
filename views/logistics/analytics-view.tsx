"use client";

import React from 'react';

export const LogisticsAnalyticsView = () => (
    <div className="p-6 h-full flex flex-col bg-gray-50/50 dark:bg-[#0f0f0f] overflow-auto">
        
        <div className="grid grid-cols-4 gap-6 mb-6">
            {/* KPI Cards */}
            {[
                { label: 'On-Time Delivery', value: '94.2%', trend: '+1.5%' },
                { label: 'Active Shipments', value: '128', trend: '+12' },
                { label: 'Fleet Utilization', value: '82%', trend: '-3%' },
                { label: 'Avg Transport Cost', value: 'Rp 12.600.000', trend: '-Rp 375.000' },
            ].map(kpi => (
                <div key={kpi.label} className="bg-white dark:bg-[#1a1a1a] p-5 border border-gray-200 dark:border-[#333] rounded-sm shadow-sm transition-colors">
                    <div className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-2">{kpi.label}</div>
                    <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-light tracking-tight text-black dark:text-white">{kpi.value}</div>
                        <div className={`text-sm font-medium ${kpi.trend.startsWith('+') && !kpi.trend.includes('$') || kpi.trend.startsWith('-$') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-[#888]'}`}>{kpi.trend}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-sm shadow-sm p-5 flex flex-col transition-colors">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-[#ddd]">Delivery Volume (Last 7 Days)</h3>
                <div className="flex-1 flex items-end gap-2 pb-4 pt-10 border-b border-gray-100 dark:border-[#222]">
                    {[45, 52, 38, 65, 48, 20, 15].map((h, i) => {
                        const max = 70;
                        const pct = (h / max) * 100;
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-gray-100 dark:bg-[#333] relative group-hover:bg-gray-200 dark:group-hover:bg-[#444] transition-colors rounded-t-sm" style={{ height: `${pct}%` }}>
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black dark:bg-[#f1f1f1] text-white dark:text-black px-1.5 py-0.5 rounded-sm">{h}</div>
                                </div>
                                <div className="text-xs text-gray-400 dark:text-[#777]">Day {i + 1}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-sm shadow-sm p-5 flex flex-col transition-colors">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-[#ddd]">Shipment Status</h3>
                <div className="flex-1 flex flex-col justify-center gap-4">
                    {[
                        { status: 'Delivered', count: 450 },
                        { status: 'In Transit', count: 128 },
                        { status: 'Scheduled', count: 85 },
                        { status: 'Delayed', count: 12 },
                    ].map(item => (
                        <div key={item.status} className="flex items-center gap-4">
                            <div className="w-24 text-sm text-gray-600 dark:text-[#bbb] truncate">{item.status}</div>
                            <div className="flex-1 h-2 bg-gray-100 dark:bg-[#333] rounded-full overflow-hidden">
                                <div className="h-full bg-gray-800 dark:bg-[#aaa]" style={{ width: `${(item.count / 450) * 100}%` }} />
                            </div>
                            <div className="w-10 text-right text-xs font-medium dark:text-[#f1f1f1]">{item.count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
