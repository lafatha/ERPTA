import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';

export const DashboardView = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { state } = useMockDb();
    const { manufacturingOrders, inventoryItems, purchaseOrders, customers } = state;

    const activeMOs = manufacturingOrders.filter(o => ['Planned', 'Scheduled', 'Released', 'In Production'].includes(o.status)).length;
    const delayedMOs = manufacturingOrders.filter(o => o.status === 'Delayed').length;
    const lowStockItems = inventoryItems.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;
    const openPOs = purchaseOrders.filter(po => ['Draft', 'Submitted', 'Approved', 'Ordered', 'Partially Received'].includes(po.status)).length;
    const activeCustomers = customers.filter(c => c.status === 'Active').length;

    const KPIS = [
        { label: 'Monthly Revenue', value: 'Rp 36.000.000.000', trend: '+12%', isPositive: true, icon: Icons.BarChart },
        { label: 'Inventory Value', value: 'Rp 12.800.000.000', trend: '-2%', isPositive: false, icon: Icons.Package },
        { label: 'Active MOs', value: activeMOs.toString(), trend: '+5', isPositive: true, icon: Icons.Factory },
        { label: 'Open POs', value: openPOs.toString(), trend: '-3', isPositive: true, icon: Icons.ShoppingCart },
        { label: 'Active Customers', value: activeCustomers.toString(), trend: '+12', isPositive: true, icon: Icons.Users },
        { label: 'Ongoing Projects', value: '7', trend: '0', isPositive: true, icon: Icons.Folder },
        { label: 'Delayed Orders', value: delayedMOs.toString(), trend: '-2', isPositive: delayedMOs === 0, icon: Icons.Clock },
        { label: 'Low-stock Items', value: lowStockItems.toString(), trend: '+4', isPositive: false, icon: Icons.Bell },
    ];

    const RECENT_MOS = manufacturingOrders.slice(0, 4);
    const RECENT_POS = purchaseOrders.slice(0, 4);

    const ALERTS = [
        { id: 1, type: 'error', message: 'MO20514 delayed due to material shortage (Oak Wood Panels).', time: '2h ago' },
        { id: 2, type: 'warning', message: 'Low stock alert: Clear Varnish (Current: 12L, Min: 20L).', time: '4h ago' },
    ];

    const alerts = [
        { id: 1, type: 'error', title: 'MO20514 delayed', message: 'Material shortage (Oak Wood Panels).', time: '2h ago' },
        { id: 2, type: 'warning', title: 'Low stock alert', message: 'Clear Varnish (Current: 12L).', time: '4h ago' },
        { id: 3, type: 'info', title: 'Supplier update', message: 'PT Kayu Jati Rimba updated PO-2026-102.', time: '5h ago' },
    ];

    if (!mounted) {
        return <div className="p-6 h-full flex items-center justify-center text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 h-full overflow-y-auto space-y-6">
            {/* Header section */}
            <div className="flex justify-between items-start">
                <div></div>
                <div className="text-sm text-gray-400 dark:text-[#717171]">
                    Last updated: Just now
                </div>
            </div>

                {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">{kpi.label}</h3>
                            <kpi.icon className="w-4 h-4 text-gray-400 dark:text-[#717171]" />
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                        </div>
                        <div className="mt-2 text-xs font-medium">
                            <span className={kpi.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {kpi.trend}
                            </span>
                            <span className="text-gray-400 dark:text-[#717171] ml-1">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

                {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Revenue vs Expenses (Mock)</h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-2 pb-6 pt-10 relative">
                        {/* Y-axis mock labels */}
                        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-gray-400 dark:text-[#717171] items-end pr-1">
                            <span>Rp 45 M</span>
                            <span>Rp 30 M</span>
                            <span>Rp 15 M</span>
                            <span>Rp 0</span>
                        </div>
                        <div className="absolute left-8 right-0 bottom-6 border-b border-gray-200 dark:border-[#3f3f3f]"></div>
                        {/* Chart Bars */}
                        {[40, 60, 45, 80, 55, 100, 70, 110, 85, 120].map((h, i) => (
                            <div key={i} className="flex-1 flex gap-1 items-end h-full z-10 ml-8" style={{ width: '10%' }}>
                                <div className="w-1/2 bg-gray-800 dark:bg-white rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${h}%` }}></div>
                                <div className="w-1/2 bg-gray-300 dark:bg-[#4f4f4f] rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${h * 0.7}%` }}></div>
                            </div>
                        ))}
                        {/* X-axis labels */}
                        <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-between text-[10px] text-gray-400 dark:text-[#717171] pt-1">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Production Output (Units)</h3>
                    <div className="h-64 relative flex items-end pb-6">
                        <div className="w-full h-full relative">
                            {/* Simple line chart mockup using SVG */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <polyline
                                    points="0,200 50,180 100,190 150,150 200,160 250,130 300,140 350,100"
                                    fill="none"
                                    stroke="currentColor"
                                    className="text-gray-800 dark:text-[#f1f1f1]"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                        {/* X-axis labels */}
                        <div className="absolute left-0 right-0 bottom-0 h-6 flex justify-between text-[10px] text-gray-400 dark:text-[#717171] pt-1">
                            <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span>
                        </div>
                    </div>
                </div>
            </div>
                {/* Bottom Section: Tables & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8">
                {/* Alerts/Notifications */}
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Recent Alerts</h3>
                        <button className="text-xs text-gray-500 hover:text-black dark:text-[#aaaaaa] dark:hover:text-white">View all</button>
                    </div>
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="flex gap-3 text-sm">
                                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : 'bg-gray-500 dark:bg-white'}`} />
                                <div>
                                    <p className="text-gray-800 dark:text-[#f1f1f1] font-medium leading-tight">{alert.title}</p>
                                    <p className="text-gray-500 dark:text-[#aaaaaa] text-xs mt-1">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick MO Status */}
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Active MOs</h3>
                        <button className="text-xs text-gray-500 hover:text-black dark:text-[#aaaaaa] dark:hover:text-white">View all</button>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-[#717171]">
                            <tr>
                                <th className="pb-2 font-medium">Order</th>
                                <th className="pb-2 font-medium text-center">Status</th>
                                <th className="pb-2 font-medium text-right">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#3f3f3f]">
                            {manufacturingOrders.slice(0, 4).map(mo => (
                                <tr key={mo.id}>
                                    <td className="py-2">
                                        <div className="font-medium text-gray-800 dark:text-white">{mo.orderNumber}</div>
                                        <div className="text-xs text-gray-500 dark:text-[#aaaaaa] truncate w-32">{mo.productName}</div>
                                    </td>
                                    <td className="py-2 text-center">
                                        <Badge variant={mo.status === 'Delayed' ? 'dark' : mo.status === 'Completed' ? 'outline' : 'default'} className="text-[10px] px-1.5 py-0">
                                            {mo.status}
                                        </Badge>
                                    </td>
                                    <td className="py-2 text-right">
                                        <div className="w-16 h-1.5 bg-gray-100 dark:bg-[#3f3f3f] rounded-full ml-auto overflow-hidden">
                                            <div className="h-full bg-black dark:bg-white" style={{ width: `${mo.progress}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Purchase Orders */}
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Recent POs</h3>
                        <button className="text-xs text-gray-500 hover:text-black dark:text-[#aaaaaa] dark:hover:text-white">View all</button>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-[#717171]">
                            <tr>
                                <th className="pb-2 font-medium">Order</th>
                                <th className="pb-2 font-medium">Status</th>
                                <th className="pb-2 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#3f3f3f]">
                            {purchaseOrders.slice(0, 4).map(po => (
                                <tr key={po.id}>
                                    <td className="py-2">
                                        <div className="font-medium text-gray-800 dark:text-white">{po.poNumber}</div>
                                        <div className="text-xs text-gray-500 dark:text-[#aaaaaa] truncate w-24">{po.supplierName}</div>
                                    </td>
                                    <td className="py-2">
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{po.status}</Badge>
                                    </td>
                                    <td className="py-2 text-right font-medium text-gray-800 dark:text-white">
                                        Rp {po.totalAmount.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
