"use client";

import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DataTable, COLUMNS } from '@/components/data-table';
import { DetailDrawer } from '@/components/detail-drawer';
import { ScheduleView } from '@/views/schedule-view';
import { StatsView } from '@/views/stats-view';
import { DashboardView } from '@/views/dashboard-view';
import { InventoryItemsView } from '@/views/inventory/items-view';
import { ManufacturingOrder } from '@/types';
import { useMockDb } from '@/lib/mock-db-context';

export default function ERPApp() {
    const { state } = useMockDb();
    const { manufacturingOrders } = state;

    const [activeModule, setActiveModule] = useState('Dashboard');
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedOrder, setSelectedOrder] = useState<ManufacturingOrder | null>(null);

    const MODULES = [
        { name: 'Dashboard', icon: Icons.LayoutDashboard },
        { name: 'Inventory', icon: Icons.Package },
        { name: 'Manufacturing', icon: Icons.Factory },
        { name: 'Procurement', icon: Icons.ShoppingCart },
        { name: 'CRM', icon: Icons.Users },
        { name: 'Projects', icon: Icons.Folder },
        { name: 'Reports', icon: Icons.BarChart },
        { name: 'Calendar', icon: Icons.Calendar },
    ];

    const MODULE_TABS: Record<string, string[]> = {
        'Dashboard': ['Overview'],
        'Inventory': ['Inventory items', 'Transactions', 'Warehouses', 'Stock adjustments', 'Stock transfers', 'Cycle counts', 'Valuation', 'Analytics'],
        'Manufacturing': ['Manufacturing orders', 'Production schedule', 'MPS', 'Workstations', 'Workstation groups', 'BOM', 'Routings', 'Statistics'],
        'Procurement': ['Suppliers', 'Purchase requisitions', 'RFQs', 'Purchase orders', 'Goods receipts', 'Supplier evaluations', 'Contracts', 'Analytics'],
        'CRM': ['Leads', 'Accounts', 'Contacts', 'Opportunities', 'Activities', 'Sales pipeline', 'Quotations', 'Analytics'],
        'Projects': ['Portfolios', 'Tasks', 'Milestones', 'Budgets', 'Team', 'Analytics'],
        'Reports': ['Financial', 'Inventory', 'Procurement', 'Manufacturing', 'Sales'],
        'Calendar': ['Events'],
    };

    const TABS = MODULE_TABS[activeModule] || [];

    const handleModuleChange = (modName: string) => {
        setActiveModule(modName);
        setActiveTab(MODULE_TABS[modName]?.[0] || '');
        setSelectedOrder(null);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-hidden antialiased">

            {/* TOP NAVBAR (Modules & Search) */}
            <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white flex-shrink-0 z-20">
                <div className="flex items-center gap-1 h-full">
                    {MODULES.map(mod => (
                        <button
                            key={mod.name}
                            onClick={() => handleModuleChange(mod.name)}
                            title={mod.name}
                            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${activeModule === mod.name ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <mod.icon className="w-4.5 h-4.5" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Command Palette Mock */}
                    <div className="relative w-64 hidden md:block">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-8 pl-9 pr-4 bg-gray-100 border-transparent rounded-sm text-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all outline-none placeholder:text-gray-500"
                        />
                    </div>
                    <button className="text-gray-400 hover:text-black relative">
                        <Icons.Bell className="w-4 h-4" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-black rounded-full border border-white"></span>
                    </button>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium group-hover:bg-gray-300 transition-colors">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            {/* MODULE HEADER & TABS */}
            <div className="bg-white border-b border-gray-200 px-6 pt-3 flex-shrink-0 z-10">
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* PAGE CONTENT */}
            <main className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-hidden relative">

                {/* Action Bar (Only on specific tabs) */}
                {activeTab === 'Manufacturing orders' && (
                    <div className="px-6 py-4 flex items-center justify-between flex-shrink-0 bg-white border-b border-gray-100">
                        <div className="flex items-center gap-4">

                            <Button className="bg-black text-white hover:bg-gray-800"><Icons.Plus className="w-4 h-4 mr-1.5" /> Create</Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline"><Icons.Download className="w-4 h-4 mr-1.5 text-gray-500" /> PDF Export</Button>
                            <Button variant="outline" size="icon"><Icons.MoreHorizontal className="w-4 h-4 text-gray-500" /></Button>
                        </div>
                    </div>
                )}

                {/* Dynamic View Area */}
                <div className="flex-1 overflow-hidden">
                    {activeModule === 'Dashboard' && activeTab === 'Overview' && <DashboardView />}
                    
                    {/* Inventory Module */}
                    {activeModule === 'Inventory' && activeTab === 'Inventory items' && <InventoryItemsView />}

                    {/* Manufacturing Module */}
                    {activeModule === 'Manufacturing' && activeTab === 'Manufacturing orders' && <DataTable data={manufacturingOrders} columns={COLUMNS} onRowClick={setSelectedOrder} />}
                    {activeModule === 'Manufacturing' && activeTab === 'Production schedule' && <ScheduleView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Statistics' && <StatsView />}
                    
                    {/* Fallback for unbuilt tabs */}
                    {!(activeModule === 'Dashboard' && activeTab === 'Overview') && 
                     !(activeModule === 'Inventory' && ['Inventory items'].includes(activeTab)) &&
                     !(activeModule === 'Manufacturing' && ['Manufacturing orders', 'Production schedule', 'Statistics'].includes(activeTab)) && (
                        <div className="h-full flex items-center justify-center flex-col text-gray-400">
                            <Icons.Factory className="w-12 h-12 mb-4 opacity-20" />
                            <p>The <span className="font-medium text-gray-600">{activeTab}</span> view is under construction.</p>
                        </div>
                    )}
                </div>

            </main>

            {/* GLOBAL SLIDE-OUT DRAWER */}
            <DetailDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />

        </div>
    );
}
