"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';

export const AnalyticsView = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const KPIS = [
        { label: 'Total Revenue (YTD)', value: '$1.8M', trend: '+15%', isPositive: true },
        { label: 'Active Deals', value: '45', trend: '+12', isPositive: true },
        { label: 'Win Rate', value: '68%', trend: '+4%', isPositive: true },
        { label: 'Average Deal Size', value: '$45k', trend: '-2%', isPositive: false },
    ];

    return (
        <div className="p-6 h-full overflow-y-auto space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">{kpi.label}</h3>
                        <div className="mt-4">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                        </div>
                        <div className="mt-2 text-xs font-medium">
                            <span className={kpi.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {kpi.trend}
                            </span>
                            <span className="text-gray-400 dark:text-[#717171] ml-1">vs last year</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Revenue by Region</h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-2 pb-6 pt-10 relative">
                        {/* Mock Chart */}
                        <div className="absolute left-0 right-0 bottom-6 border-b border-gray-200 dark:border-[#3f3f3f]"></div>
                        {[60, 45, 80, 55, 90].map((h, i) => (
                            <div key={i} className="flex-1 flex gap-1 items-end h-full z-10" style={{ width: '10%' }}>
                                <div className="w-full bg-gray-800 dark:bg-white hover:opacity-80 transition-opacity rounded-t-sm" style={{ height: `${h}%` }}></div>
                            </div>
                        ))}
                        <div className="absolute left-0 right-0 bottom-0 h-6 flex justify-between text-[10px] text-gray-400 dark:text-[#717171] pt-1">
                            <span>NA</span><span>EU</span><span>APAC</span><span>LATAM</span><span>MEA</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Top Customers</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Nexus Industries', value: '$215,000' },
                            { name: 'Acme Corp', value: '$154,000' },
                            { name: 'TechFlow', value: '$42,500' },
                            { name: 'Global Logistics', value: '$12,000' },
                        ].map((cust, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-gray-100 dark:border-[#3f3f3f] pb-2 last:border-0 last:pb-0">
                                <span className="text-sm text-gray-700 dark:text-[#f1f1f1]">{cust.name}</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{cust.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
