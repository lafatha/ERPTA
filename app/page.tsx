"use client";

import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DataTable, COLUMNS } from '@/components/data-table';
import { DetailDrawer } from '@/components/detail-drawer';
import { CreateDrawer } from '@/components/create-drawer';
import { ScheduleView } from '@/views/schedule-view';
import { StatsView } from '@/views/stats-view';
import { MpsView } from '@/views/manufacturing/mps-view';
import { WorkstationGroupsView } from '@/views/manufacturing/workstation-groups-view';
import { WorkstationsView } from '@/views/manufacturing/workstations-view';
import { BomsView } from '@/views/manufacturing/boms-view';
import { RoutingsView } from '@/views/manufacturing/routings-view';
import { DashboardView } from '@/views/dashboard-view';
import { DashboardForecastingView } from '@/views/dashboard/forecasting-view';
import { DashboardAiView } from '@/views/dashboard/ai-view';
import { InventoryItemsView } from '@/views/inventory/items-view';
import { TransactionsView } from '@/views/inventory/transactions-view';
import { WarehousesView } from '@/views/inventory/warehouses-view';
import { AdjustmentsView } from '@/views/inventory/adjustments-view';
import { TransfersView } from '@/views/inventory/transfers-view';
import { CycleCountsView } from '@/views/inventory/cycle-counts-view';
import { ValuationView } from '@/views/inventory/valuation-view';
import { AnalyticsView } from '@/views/inventory/analytics-view';
import { SuppliersView } from '@/views/procurement/suppliers-view';
import { PurchaseOrdersView } from '@/views/procurement/purchase-orders-view';
import { RequisitionsView } from '@/views/procurement/requisitions-view';
import { RfqsView } from '@/views/procurement/rfqs-view';
import { GoodsReceiptsView } from '@/views/procurement/receipts-view';
import { EvaluationsView } from '@/views/procurement/evaluations-view';
import { ContractsView } from '@/views/procurement/contracts-view';
import { ProcurementAnalyticsView } from '@/views/procurement/analytics-view';
import { TransportationView } from '@/views/logistics/transportation-view';
import { FleetView } from '@/views/logistics/fleet-view';
import { ShipmentView } from '@/views/logistics/shipment-view';
import { DistributionView } from '@/views/logistics/distribution-view';
import { LogisticsAnalyticsView } from '@/views/logistics/analytics-view';
import { LeadsView } from '@/views/crm/leads-view';
import { AccountsView } from '@/views/crm/accounts-view';
import { ContactsView } from '@/views/crm/contacts-view';
import { OpportunitiesView } from '@/views/crm/opportunities-view';
import { ActivitiesView } from '@/views/crm/activities-view';
import { PipelineView } from '@/views/crm/pipeline-view';
import { QuotationsView } from '@/views/crm/quotations-view';
import { CrmAnalyticsView } from '@/views/crm/analytics-view';
import { EmployeesView } from '@/views/hr/employees-view';
import { OrgStructureView } from '@/views/hr/org-structure-view';
import { RecruitmentView } from '@/views/hr/recruitment-view';
import { AttendanceView } from '@/views/hr/attendance-view';
import { LeaveView } from '@/views/hr/leave-view';
import { PayrollView } from '@/views/hr/payroll-view';
import { PerformanceView } from '@/views/hr/performance-view';
import { TrainingView } from '@/views/hr/training-view';
import { HrAnalyticsView } from '@/views/hr/analytics-view';
import { PortfoliosView } from '@/views/projects/portfolios-view';
import { TasksView } from '@/views/projects/tasks-view';
import { MilestonesView } from '@/views/projects/milestones-view';
import { BudgetsView } from '@/views/projects/budgets-view';
import { TeamView } from '@/views/projects/team-view';
import { ProjectsAnalyticsView } from '@/views/projects/analytics-view';
import { ReportsView } from '@/views/reports/reports-view';
import { CalendarView } from '@/views/calendar/calendar-view';
import { PlatformOverviewView } from '@/views/platform/overview-view';
import { PlatformOrdersView } from '@/views/platform/orders-view';
import { PlatformUsersView } from '@/views/platform/users-view';
import { GeneralSettingsView } from '@/views/settings/general-view';
import { SecuritySettingsView } from '@/views/settings/security-view';
import { CustomerView } from '@/views/sales/customer-view';
import { ProcessView } from '@/views/sales/process-view';
import { FulfillmentView } from '@/views/sales/fulfillment-view';
import { BillingView } from '@/views/sales/billing-view';
import { AnalyticsView as SalesAnalyticsView } from '@/views/sales/analytics-view';
import { ManufacturingOrder } from '@/types';
import { useMockDb } from '@/lib/mock-db-context';

export default function ERPApp() {
    const { state, updateRecord } = useMockDb();
    const { manufacturingOrders } = state;

    const [activeModule, setActiveModule] = useState('Dashboard');
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedOrder, setSelectedOrder] = useState<ManufacturingOrder | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleCreateMO = (newOrder: any) => {
        const id = `MO-${Math.floor(Math.random() * 100000)}`;
        updateRecord('manufacturingOrders', id, { ...newOrder, id } as ManufacturingOrder);
    };

    const MODULES = [
        { name: 'Dashboard', icon: Icons.LayoutDashboard },
        { name: 'Platform', icon: Icons.Server },
        { name: 'Sales', icon: Icons.Tag },
        { name: 'Inventory', icon: Icons.Package },
        { name: 'Manufacturing', icon: Icons.Factory },
        { name: 'Procurement', icon: Icons.ShoppingCart },
        { name: 'Logistics', icon: Icons.Truck },
        { name: 'CRM', icon: Icons.Users },
        { name: 'Human Resources', icon: Icons.Briefcase },
        { name: 'Projects', icon: Icons.Folder },
        { name: 'Reports', icon: Icons.BarChart },
        { name: 'Calendar', icon: Icons.Calendar },
        { name: 'Settings', icon: Icons.Settings },
    ];

    const MODULE_TABS: Record<string, string[]> = {
        'Dashboard': ['Overview', 'Forecasting', 'AI'],
        'Platform': ['Overview', 'Orders', 'Users'],
        'Sales': ['Customer', 'Process', 'Fulfillment', 'Billing', 'Analytics'],
        'Inventory': ['Inventory items', 'Transactions', 'Warehouses', 'Stock adjustments', 'Stock transfers', 'Cycle counts', 'Valuation', 'Analytics'],
        'Manufacturing': ['Manufacturing orders', 'Production schedule', 'MPS', 'Workstations', 'Workstation groups', 'BOM', 'Routings', 'Statistics'],
        'Procurement': ['Suppliers', 'Purchase requisitions', 'RFQs', 'Purchase orders', 'Goods receipts', 'Supplier evaluations', 'Contracts', 'Analytics'],
        'Logistics': ['Transportation Management', 'Fleet Management', 'Shipment Tracking', 'Distribution Planning', 'Analytics'],
        'CRM': ['Leads', 'Accounts', 'Contacts', 'Opportunities', 'Activities', 'Sales pipeline', 'Quotations', 'Analytics'],
        'Human Resources': ['Employees', 'Organizational Structure', 'Recruitment', 'Attendance', 'Leave Management', 'Payroll', 'Performance Management', 'Training', 'Analytics'],
        'Projects': ['Portfolios', 'Tasks', 'Milestones', 'Budgets', 'Team', 'Analytics'],
        'Reports': ['Financial', 'Inventory', 'Procurement', 'Manufacturing', 'Sales'],
        'Calendar': ['Events'],
        'Settings': ['General', 'Security'],
    };

    const TABS = MODULE_TABS[activeModule] || [];

    const handleModuleChange = (modName: string) => {
        setActiveModule(modName);
        setActiveTab(MODULE_TABS[modName]?.[0] || '');
        setSelectedOrder(null);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-[#f1f1f1] font-sans overflow-hidden antialiased transition-colors duration-200">

            {/* TOP NAVBAR (Modules & Search) */}
            <header className="h-14 border-b border-gray-200 dark:border-[#272727] flex items-center justify-between px-4 bg-white dark:bg-[#0f0f0f] flex-shrink-0 z-20 transition-colors duration-200">
                <div className="flex items-center gap-1 h-full">
                    {MODULES.map(mod => (
                        <button
                            key={mod.name}
                            onClick={() => handleModuleChange(mod.name)}
                            title={mod.name}
                            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${activeModule === mod.name ? 'bg-gray-100 dark:bg-[#272727] text-black dark:text-white' : 'text-gray-500 dark:text-[#aaaaaa] hover:bg-gray-50 dark:hover:bg-[#272727] hover:text-gray-900 dark:hover:text-white'}`}
                        >
                            <mod.icon className="w-4.5 h-4.5" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Command Palette Mock */}
                    <div className="relative w-64 hidden md:block">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#aaaaaa] w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-8 pl-9 pr-4 bg-gray-100 dark:bg-[#121212] border border-transparent dark:border-[#272727] rounded-full text-sm dark:text-[#f1f1f1] focus:bg-white dark:focus:bg-[#0f0f0f] focus:border-black dark:focus:border-[#aaaaaa] focus:ring-1 focus:ring-black dark:focus:ring-transparent transition-all outline-none placeholder:text-gray-500 dark:placeholder:text-[#aaaaaa]"
                        />
                    </div>
                    <button className="text-gray-400 hover:text-black dark:hover:text-white relative">
                        <Icons.Bell className="w-4 h-4" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-black dark:bg-[#f1f1f1] rounded-full border border-white dark:border-[#0f0f0f]"></span>
                    </button>
                    <div className="h-6 w-px bg-gray-200 dark:bg-[#272727]"></div>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#272727] flex items-center justify-center text-gray-600 dark:text-[#f1f1f1] text-xs font-medium group-hover:bg-gray-300 dark:group-hover:bg-[#3f3f3f] transition-colors">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            {/* MODULE HEADER & TABS */}
            <div className="bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-[#272727] px-6 pt-3 flex-shrink-0 z-10 transition-colors duration-200">
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 dark:text-[#aaaaaa] hover:text-gray-800 dark:hover:text-[#f1f1f1] hover:border-gray-300 dark:hover:border-[#3f3f3f]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* PAGE CONTENT */}
            <main className="flex-1 flex flex-col min-h-0 bg-gray-50/30 dark:bg-[#0f0f0f] overflow-hidden relative transition-colors duration-200">

                {/* Action Bar (Only on specific tabs) */}
                {activeTab === 'Manufacturing orders' && (
                    <div className="px-6 py-4 flex items-center justify-between flex-shrink-0 bg-white border-b border-gray-100">
                        <div className="flex items-center gap-4">

                            <Button onClick={() => setIsCreateOpen(true)} className="bg-black text-white hover:bg-gray-800"><Icons.Plus className="w-4 h-4 mr-1.5" /> Create</Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline"><Icons.Download className="w-4 h-4 mr-1.5 text-gray-500" /> PDF Export</Button>
                            <Button variant="outline" size="icon"><Icons.MoreHorizontal className="w-4 h-4 text-gray-500" /></Button>
                        </div>
                    </div>
                )}

                {/* Dynamic View Area */}
                <div className="flex-1 overflow-hidden">
                    {/* Dashboard Module */}
                    {activeModule === 'Dashboard' && activeTab === 'Overview' && <DashboardView />}
                    {activeModule === 'Dashboard' && activeTab === 'Forecasting' && <DashboardForecastingView />}
                    {activeModule === 'Dashboard' && activeTab === 'AI' && <DashboardAiView />}
                    
                    {/* Sales Module */}
                    {activeModule === 'Sales' && activeTab === 'Customer' && <CustomerView />}
                    {activeModule === 'Sales' && activeTab === 'Process' && <ProcessView />}
                    {activeModule === 'Sales' && activeTab === 'Fulfillment' && <FulfillmentView />}
                    {activeModule === 'Sales' && activeTab === 'Billing' && <BillingView />}
                    {activeModule === 'Sales' && activeTab === 'Analytics' && <SalesAnalyticsView />}

                    {/* Inventory Module */}
                    {activeModule === 'Inventory' && activeTab === 'Inventory items' && <InventoryItemsView />}
                    {activeModule === 'Inventory' && activeTab === 'Transactions' && <TransactionsView />}
                    {activeModule === 'Inventory' && activeTab === 'Warehouses' && <WarehousesView />}
                    {activeModule === 'Inventory' && activeTab === 'Stock adjustments' && <AdjustmentsView />}
                    {activeModule === 'Inventory' && activeTab === 'Stock transfers' && <TransfersView />}
                    {activeModule === 'Inventory' && activeTab === 'Cycle counts' && <CycleCountsView />}
                    {activeModule === 'Inventory' && activeTab === 'Valuation' && <ValuationView />}
                    {activeModule === 'Inventory' && activeTab === 'Analytics' && <AnalyticsView />}

                    {/* Manufacturing Module */}
                    {activeModule === 'Manufacturing' && activeTab === 'Manufacturing orders' && <DataTable data={manufacturingOrders} columns={COLUMNS} onRowClick={setSelectedOrder} />}
                    {activeModule === 'Manufacturing' && activeTab === 'MPS' && <MpsView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Production schedule' && <ScheduleView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Workstations' && <WorkstationsView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Workstation groups' && <WorkstationGroupsView />}
                    {activeModule === 'Manufacturing' && activeTab === 'BOM' && <BomsView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Routings' && <RoutingsView />}
                    {activeModule === 'Manufacturing' && activeTab === 'Statistics' && <StatsView />}
                    
                    {/* Procurement Module */}
                    {activeModule === 'Procurement' && activeTab === 'Suppliers' && <SuppliersView />}
                    {activeModule === 'Procurement' && activeTab === 'Purchase requisitions' && <RequisitionsView />}
                    {activeModule === 'Procurement' && activeTab === 'RFQs' && <RfqsView />}
                    {activeModule === 'Procurement' && activeTab === 'Purchase orders' && <PurchaseOrdersView />}
                    {activeModule === 'Procurement' && activeTab === 'Goods receipts' && <GoodsReceiptsView />}
                    {activeModule === 'Procurement' && activeTab === 'Supplier evaluations' && <EvaluationsView />}
                    {activeModule === 'Procurement' && activeTab === 'Contracts' && <ContractsView />}
                    {activeModule === 'Procurement' && activeTab === 'Analytics' && <ProcurementAnalyticsView />}

                    {/* Logistics Module */}
                    {activeModule === 'Logistics' && activeTab === 'Transportation Management' && <TransportationView />}
                    {activeModule === 'Logistics' && activeTab === 'Fleet Management' && <FleetView />}
                    {activeModule === 'Logistics' && activeTab === 'Shipment Tracking' && <ShipmentView />}
                    {activeModule === 'Logistics' && activeTab === 'Distribution Planning' && <DistributionView />}
                    {activeModule === 'Logistics' && activeTab === 'Analytics' && <LogisticsAnalyticsView />}

                    {/* CRM Module */}
                    {activeModule === 'CRM' && activeTab === 'Leads' && <LeadsView />}
                    {activeModule === 'CRM' && activeTab === 'Accounts' && <AccountsView />}
                    {activeModule === 'CRM' && activeTab === 'Contacts' && <ContactsView />}
                    {activeModule === 'CRM' && activeTab === 'Opportunities' && <OpportunitiesView />}
                    {activeModule === 'CRM' && activeTab === 'Activities' && <ActivitiesView />}
                    {activeModule === 'CRM' && activeTab === 'Sales pipeline' && <PipelineView />}
                    {activeModule === 'CRM' && activeTab === 'Quotations' && <QuotationsView />}
                    {activeModule === 'CRM' && activeTab === 'Analytics' && <CrmAnalyticsView />}

                    {/* HR Module */}
                    {activeModule === 'Human Resources' && activeTab === 'Employees' && <EmployeesView />}
                    {activeModule === 'Human Resources' && activeTab === 'Organizational Structure' && <OrgStructureView />}
                    {activeModule === 'Human Resources' && activeTab === 'Recruitment' && <RecruitmentView />}
                    {activeModule === 'Human Resources' && activeTab === 'Attendance' && <AttendanceView />}
                    {activeModule === 'Human Resources' && activeTab === 'Leave Management' && <LeaveView />}
                    {activeModule === 'Human Resources' && activeTab === 'Payroll' && <PayrollView />}
                    {activeModule === 'Human Resources' && activeTab === 'Performance Management' && <PerformanceView />}
                    {activeModule === 'Human Resources' && activeTab === 'Training' && <TrainingView />}
                    {activeModule === 'Human Resources' && activeTab === 'Analytics' && <HrAnalyticsView />}

                    {/* Projects Module */}
                    {activeModule === 'Projects' && activeTab === 'Portfolios' && <PortfoliosView />}
                    {activeModule === 'Projects' && activeTab === 'Tasks' && <TasksView />}
                    {activeModule === 'Projects' && activeTab === 'Milestones' && <MilestonesView />}
                    {activeModule === 'Projects' && activeTab === 'Budgets' && <BudgetsView />}
                    {activeModule === 'Projects' && activeTab === 'Team' && <TeamView />}
                    {activeModule === 'Projects' && activeTab === 'Analytics' && <ProjectsAnalyticsView />}

                    {/* Reports Module */}
                    {activeModule === 'Reports' && ['Financial', 'Inventory', 'Procurement', 'Manufacturing', 'Sales'].includes(activeTab) && (
                        <ReportsView category={activeTab} />
                    )}

                    {/* Calendar Module */}
                    {activeModule === 'Calendar' && activeTab === 'Events' && <CalendarView />}

                    {/* Platform Module */}
                    {activeModule === 'Platform' && activeTab === 'Overview' && <PlatformOverviewView />}
                    {activeModule === 'Platform' && activeTab === 'Orders' && <PlatformOrdersView />}
                    {activeModule === 'Platform' && activeTab === 'Users' && <PlatformUsersView />}

                    {/* Settings Module */}
                    {activeModule === 'Settings' && activeTab === 'General' && <GeneralSettingsView />}
                    {activeModule === 'Settings' && activeTab === 'Security' && <SecuritySettingsView />}

                    {/* Fallback for unbuilt tabs */}
                    {!(activeModule === 'Dashboard' && ['Overview', 'Forecasting', 'AI'].includes(activeTab)) && 
                     !(activeModule === 'Platform' && ['Overview', 'Orders', 'Users'].includes(activeTab)) && 
                     !(activeModule === 'Sales' && ['Customer', 'Process', 'Fulfillment', 'Billing', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'Inventory' && ['Inventory items', 'Transactions', 'Warehouses', 'Stock adjustments', 'Stock transfers', 'Cycle counts', 'Valuation', 'Analytics'].includes(activeTab)) &&
                     !(activeModule === 'Manufacturing' && ['Manufacturing orders', 'MPS', 'Production schedule', 'Workstations', 'Workstation groups', 'BOM', 'Routings', 'Statistics'].includes(activeTab)) &&
                     !(activeModule === 'Procurement' && ['Suppliers', 'Purchase requisitions', 'RFQs', 'Purchase orders', 'Goods receipts', 'Supplier evaluations', 'Contracts', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'Logistics' && ['Transportation Management', 'Fleet Management', 'Shipment Tracking', 'Distribution Planning', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'CRM' && ['Leads', 'Accounts', 'Contacts', 'Opportunities', 'Activities', 'Sales pipeline', 'Quotations', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'Human Resources' && ['Employees', 'Organizational Structure', 'Recruitment', 'Attendance', 'Leave Management', 'Payroll', 'Performance Management', 'Training', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'Projects' && ['Portfolios', 'Tasks', 'Milestones', 'Budgets', 'Team', 'Analytics'].includes(activeTab)) && 
                     !(activeModule === 'Reports' && ['Financial', 'Inventory', 'Procurement', 'Manufacturing', 'Sales'].includes(activeTab)) && 
                     !(activeModule === 'Calendar' && activeTab === 'Events') && 
                     !(activeModule === 'Settings' && ['General', 'Security'].includes(activeTab)) && (
                        <div className="h-full flex items-center justify-center flex-col text-gray-400">
                            <Icons.Factory className="w-12 h-12 mb-4 opacity-20" />
                            <p>The <span className="font-medium text-gray-600">{activeTab}</span> view is under construction.</p>
                        </div>
                    )}
                </div>

            </main>

            {/* GLOBAL SLIDE-OUT DRAWER */}
            <DetailDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            <CreateDrawer
                isOpen={isCreateOpen}
                columns={COLUMNS.filter(c => c.accessorKey !== 'id')}
                onClose={() => setIsCreateOpen(false)}
                onSave={handleCreateMO}
                title="Create Manufacturing Order"
            />

        </div>
    );
}
