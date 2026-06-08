"use client";

import React from 'react';

export const HrAnalyticsView = () => (
    <div className="p-6 h-full flex flex-col bg-gray-50/50 dark:bg-[#0f0f0f] overflow-auto">
        
        <div className="grid grid-cols-4 gap-6 mb-6">
            {/* KPI Cards */}
            {[
                { label: 'Total Employees', value: '142', trend: '+5' },
                { label: 'Open Positions', value: '12', trend: '+2' },
                { label: 'Turnover Rate', value: '4.2%', trend: '-0.5%' },
                { label: 'Avg Training Hrs', value: '18h', trend: '+3h' },
            ].map(kpi => (
                <div key={kpi.label} className="bg-white dark:bg-[#1a1a1a] p-5 border border-gray-200 dark:border-[#333] rounded-sm shadow-sm transition-colors">
                    <div className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-2">{kpi.label}</div>
                    <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-light tracking-tight text-black dark:text-white">{kpi.value}</div>
                        <div className={`text-sm font-medium ${kpi.trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-[#888]'}`}>{kpi.trend}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-sm shadow-sm p-5 flex flex-col transition-colors">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-[#ddd]">Headcount Growth (YTD)</h3>
                <div className="flex-1 flex items-end gap-2 pb-4 pt-10 border-b border-gray-100 dark:border-[#222]">
                    {[120, 122, 125, 128, 135, 142].map((h, i) => {
                        const max = 150;
                        const pct = (h / max) * 100;
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-gray-100 dark:bg-[#333] relative group-hover:bg-gray-200 dark:group-hover:bg-[#444] transition-colors rounded-t-sm" style={{ height: `${pct}%` }}>
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black dark:bg-[#f1f1f1] text-white dark:text-black px-1.5 py-0.5 rounded-sm">{h}</div>
                                </div>
                                <div className="text-xs text-gray-400 dark:text-[#777]">{months[i]}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-sm shadow-sm p-5 flex flex-col transition-colors">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-[#ddd]">Employees by Department</h3>
                <div className="flex-1 flex flex-col justify-center gap-4">
                    {[
                        { dept: 'Engineering', count: 45 },
                        { dept: 'Sales', count: 24 },
                        { dept: 'Marketing', count: 12 },
                        { dept: 'Finance', count: 8 },
                        { dept: 'HR', count: 5 },
                    ].map(item => (
                        <div key={item.dept} className="flex items-center gap-4">
                            <div className="w-24 text-sm text-gray-600 dark:text-[#bbb] truncate">{item.dept}</div>
                            <div className="flex-1 h-2 bg-gray-100 dark:bg-[#333] rounded-full overflow-hidden">
                                <div className="h-full bg-gray-800 dark:bg-[#aaa]" style={{ width: `${(item.count / 45) * 100}%` }} />
                            </div>
                            <div className="w-10 text-right text-xs font-medium dark:text-[#f1f1f1]">{item.count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
