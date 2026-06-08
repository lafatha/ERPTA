import React from 'react';

export const StatsView = () => (
    <div className="p-6 h-full flex flex-col bg-gray-50/50 overflow-auto">
        <h2 className="text-lg font-medium mb-6">Manufacturing Statistics</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
            {/* KPI Cards */}
            {[
                { label: 'OEE (Overall Equipment Effectiveness)', value: '78.4%', trend: '+2.1%' },
                { label: 'Delayed Orders', value: '14', trend: '-3' },
                { label: 'Total Production Value', value: '$1.2M', trend: '+$50k' },
            ].map(kpi => (
                <div key={kpi.label} className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                    <div className="text-sm text-gray-500 mb-2">{kpi.label}</div>
                    <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-light tracking-tight text-black">{kpi.value}</div>
                        <div className={`text-sm font-medium ${kpi.trend.startsWith('+') ? 'text-gray-900' : 'text-gray-500'}`}>{kpi.trend}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 flex flex-col">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">Production Output (Last 7 Days)</h3>
                <div className="flex-1 flex items-end gap-2 pb-4 pt-10 border-b border-gray-100">
                    {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-gray-100 relative group-hover:bg-gray-200 transition-colors rounded-t-sm" style={{ height: `${h}%` }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded-sm">{h * 10}</div>
                            </div>
                            <div className="text-xs text-gray-400">Day {i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 flex flex-col">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">Downtime Causes</h3>
                <div className="flex-1 flex flex-col justify-center gap-4">
                    {[
                        { cause: 'Material Shortage', pct: 45 },
                        { cause: 'Machine Failure', pct: 25 },
                        { cause: 'Operator Absent', pct: 15 },
                        { cause: 'Changeover', pct: 15 },
                    ].map(item => (
                        <div key={item.cause} className="flex items-center gap-4">
                            <div className="w-32 text-sm text-gray-600 truncate">{item.cause}</div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-800" style={{ width: `${item.pct}%` }} />
                            </div>
                            <div className="w-10 text-right text-xs font-medium">{item.pct}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
