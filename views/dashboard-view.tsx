import React from 'react';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';

export const DashboardView = () => {
    const { state } = useMockDb();
    const { manufacturingOrders, inventoryItems } = state;

    const activeMOs = manufacturingOrders.filter(o => ['Planned', 'Scheduled', 'Released', 'In Production'].includes(o.status)).length;
    const delayedMOs = manufacturingOrders.filter(o => o.status === 'Delayed').length;
    const lowStockItems = inventoryItems.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;

    const KPIS = [
        { label: 'Monthly Revenue', value: '$2.4M', trend: '+12%', isPositive: true, icon: Icons.BarChart },
        { label: 'Inventory Value', value: '$854k', trend: '-2%', isPositive: false, icon: Icons.Package },
        { label: 'Active MOs', value: activeMOs.toString(), trend: '+5', isPositive: true, icon: Icons.Factory },
        { label: 'Open POs', value: '18', trend: '-3', isPositive: true, icon: Icons.ShoppingCart },
        { label: 'Active Customers', value: '124', trend: '+12', isPositive: true, icon: Icons.Users },
        { label: 'Ongoing Projects', value: '7', trend: '0', isPositive: true, icon: Icons.Folder },
        { label: 'Delayed Orders', value: delayedMOs.toString(), trend: '-2', isPositive: delayedMOs === 0, icon: Icons.Clock },
        { label: 'Low-stock Items', value: lowStockItems.toString(), trend: '+4', isPositive: false, icon: Icons.Bell },
    ];

    const RECENT_MOS = manufacturingOrders.slice(0, 4);

    const RECENT_POS = [
        { id: 'PO10299', supplier: 'TechCorp Parts', status: 'Ordered', amount: '$12,500' },
        { id: 'PO10300', supplier: 'Global Steel Inc', status: 'Expected', amount: '$45,000' },
        { id: 'PO10301', supplier: 'Electro Components', status: 'Draft', amount: '$3,200' },
        { id: 'PO10302', supplier: 'Fasteners Ltd', status: 'Received', amount: '$850' },
    ];

    const ALERTS = [
        { id: 1, type: 'error', message: 'MO20514 delayed due to material shortage (Copper Wire).', time: '2h ago' },
        { id: 2, type: 'warning', message: 'Low stock alert: Hydraulic Fluid (Current: 12L, Min: 20L).', time: '4h ago' },
        { id: 3, type: 'info', message: 'Supplier "TechCorp Parts" updated delivery date for PO10299.', time: '5h ago' },
        { id: 4, type: 'error', message: 'Quality check failed for received batch RC-9912.', time: '1d ago' },
    ];

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-7xl mx-auto space-y-6 pb-12">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Executive Overview</h1>
                        <p className="text-sm text-gray-500 mt-1">Real-time pulse of your manufacturing operations.</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-gray-500">Last updated: Just now</span>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {KPIS.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
                                <p className="text-2xl font-semibold text-gray-900 mt-1">{kpi.value}</p>
                                <p className={`text-xs mt-2 ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {kpi.trend} from last month
                                </p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-sm">
                                <kpi.icon className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-72 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Revenue vs Expenses (Mock)</h3>
                        <div className="flex-1 flex items-end gap-2 justify-between mt-auto">
                            {[40, 65, 45, 80, 55, 95, 75, 110, 85, 120].map((h, i) => (
                                <div key={i} className="w-full flex gap-1 items-end h-full">
                                    <div className="w-1/2 bg-gray-800 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                    <div className="w-1/2 bg-gray-300 rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-72 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Production Output (Units)</h3>
                        <div className="flex-1 relative border-b border-l border-gray-200">
                            {/* Simple line chart mockup using SVG */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <polyline 
                                    points="0,150 50,120 100,130 150,90 200,100 250,50 300,70 350,30" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    className="text-black"
                                    strokeWidth="2" 
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span>
                        </div>
                    </div>
                </div>

                {/* Tables & Alerts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Alerts Widget */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-semibold text-gray-800">Recent Alerts</h3>
                            <span className="text-xs text-gray-500 cursor-pointer hover:text-black">View all</span>
                        </div>
                        <div className="divide-y divide-gray-100 flex-1 overflow-auto max-h-64">
                            {ALERTS.map(alert => (
                                <div key={alert.id} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
                                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                    <div>
                                        <p className="text-sm text-gray-700 leading-snug">{alert.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active MOs */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col lg:col-span-1">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-semibold text-gray-800">Active MOs</h3>
                            <span className="text-xs text-gray-500 cursor-pointer hover:text-black">View all</span>
                        </div>
                        <div className="overflow-auto max-h-64">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white border-b border-gray-100 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 font-medium text-gray-500">Order</th>
                                        <th className="px-4 py-2 font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-2 font-medium text-gray-500">Progress</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {RECENT_MOS.map(mo => (
                                        <tr key={mo.id} className="hover:bg-gray-50 cursor-pointer">
                                            <td className="px-4 py-2">
                                                <div className="font-medium text-gray-800">{mo.orderNumber}</div>
                                                <div className="text-xs text-gray-500 truncate w-24">{mo.productName}</div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <Badge variant={mo.status === 'In Production' ? 'success' : mo.status === 'Delayed' ? 'dark' : 'outline'}>
                                                    {mo.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-black h-full" style={{ width: `${mo.progress}%` }}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent POs */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col lg:col-span-1">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-semibold text-gray-800">Recent POs</h3>
                            <span className="text-xs text-gray-500 cursor-pointer hover:text-black">View all</span>
                        </div>
                        <div className="overflow-auto max-h-64">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white border-b border-gray-100 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 font-medium text-gray-500">Order</th>
                                        <th className="px-4 py-2 font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {RECENT_POS.map(po => (
                                        <tr key={po.id} className="hover:bg-gray-50 cursor-pointer">
                                            <td className="px-4 py-2">
                                                <div className="font-medium text-gray-800">{po.id}</div>
                                                <div className="text-xs text-gray-500 truncate w-24">{po.supplier}</div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <Badge variant={po.status === 'Ordered' ? 'default' : po.status === 'Expected' ? 'outline' : 'dark'}>
                                                    {po.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-700">
                                                {po.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
