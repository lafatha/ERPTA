"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    ManufacturingOrder, InventoryItem, Supplier, PurchaseOrder, CustomerAccount,
    Warehouse, InventoryTransaction, StockAdjustment, StockTransfer, CycleCount,
    WorkstationGroup, Workstation, MPS, BOM, Routing,
    PurchaseRequisition, RFQ, GoodsReceipt, SupplierEvaluation, Contract,
    Lead, Opportunity, Contact, Activity, Quotation,
    Project, ProjectTask, ProjectMilestone, ProjectBudget, ProjectTeamMember, CalendarEvent
} from '@/types';
import { 
    INITIAL_MOS, INITIAL_INVENTORY, INITIAL_SUPPLIERS, INITIAL_POS, INITIAL_CUSTOMERS,
    INITIAL_WAREHOUSES, INITIAL_TRANSACTIONS, INITIAL_ADJUSTMENTS, INITIAL_TRANSFERS, INITIAL_CYCLE_COUNTS,
    INITIAL_WORKSTATION_GROUPS, INITIAL_WORKSTATIONS, INITIAL_MPS, INITIAL_BOMS, INITIAL_ROUTINGS,
    INITIAL_REQUISITIONS, INITIAL_RFQS, INITIAL_RECEIPTS, INITIAL_EVALUATIONS, INITIAL_CONTRACTS,
    INITIAL_LEADS, INITIAL_OPPORTUNITIES, INITIAL_CONTACTS, INITIAL_ACTIVITIES, INITIAL_QUOTATIONS,
    INITIAL_PROJECTS, INITIAL_PROJECT_TASKS, INITIAL_PROJECT_MILESTONES, INITIAL_PROJECT_BUDGETS, INITIAL_PROJECT_TEAM_MEMBERS,
    INITIAL_CALENDAR_EVENTS
} from './mock-data-furniture';

// We'll expand this as we add modules
export interface DatabaseState {
    manufacturingOrders: ManufacturingOrder[];
    inventoryItems: InventoryItem[];
    suppliers: Supplier[];
    purchaseOrders: PurchaseOrder[];
    customers: CustomerAccount[];
    warehouses: Warehouse[];
    inventoryTransactions: InventoryTransaction[];
    stockAdjustments: StockAdjustment[];
    stockTransfers: StockTransfer[];
    cycleCounts: CycleCount[];
    workstationGroups: WorkstationGroup[];
    workstations: Workstation[];
    mps: MPS[];
    boms: BOM[];
    routings: Routing[];
    purchaseRequisitions: PurchaseRequisition[];
    rfqs: RFQ[];
    goodsReceipts: GoodsReceipt[];
    supplierEvaluations: SupplierEvaluation[];
    contracts: Contract[];
    leads: Lead[];
    opportunities: Opportunity[];
    contacts: Contact[];
    activities: Activity[];
    quotations: Quotation[];
    projects: Project[];
    projectTasks: ProjectTask[];
    projectMilestones: ProjectMilestone[];
    projectBudgets: ProjectBudget[];
    projectTeamMembers: ProjectTeamMember[];
    calendarEvents: CalendarEvent[];
}

interface DatabaseContextType {
    state: DatabaseState;
    addRecord: <K extends keyof DatabaseState>(collection: K, record: DatabaseState[K][number]) => void;
    updateRecord: <K extends keyof DatabaseState>(collection: K, id: string, data: Partial<DatabaseState[K][number]>) => void;
    deleteRecord: <K extends keyof DatabaseState>(collection: K, id: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const MockDatabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<DatabaseState>({
        manufacturingOrders: INITIAL_MOS,
        inventoryItems: INITIAL_INVENTORY,
        suppliers: INITIAL_SUPPLIERS,
        purchaseOrders: INITIAL_POS,
        customers: INITIAL_CUSTOMERS,
        warehouses: INITIAL_WAREHOUSES,
        inventoryTransactions: INITIAL_TRANSACTIONS,
        stockAdjustments: INITIAL_ADJUSTMENTS,
        stockTransfers: INITIAL_TRANSFERS,
        cycleCounts: INITIAL_CYCLE_COUNTS,
        workstationGroups: INITIAL_WORKSTATION_GROUPS,
        workstations: INITIAL_WORKSTATIONS,
        mps: INITIAL_MPS,
        boms: INITIAL_BOMS,
        routings: INITIAL_ROUTINGS,
        purchaseRequisitions: INITIAL_REQUISITIONS,
        rfqs: INITIAL_RFQS,
        goodsReceipts: INITIAL_RECEIPTS,
        supplierEvaluations: INITIAL_EVALUATIONS,
        contracts: INITIAL_CONTRACTS,
        leads: INITIAL_LEADS,
        opportunities: INITIAL_OPPORTUNITIES,
        contacts: INITIAL_CONTACTS,
        activities: INITIAL_ACTIVITIES,
        quotations: INITIAL_QUOTATIONS,
        projects: INITIAL_PROJECTS,
        projectTasks: INITIAL_PROJECT_TASKS,
        projectMilestones: INITIAL_PROJECT_MILESTONES,
        projectBudgets: INITIAL_PROJECT_BUDGETS,
        projectTeamMembers: INITIAL_PROJECT_TEAM_MEMBERS,
        calendarEvents: INITIAL_CALENDAR_EVENTS,
    });

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Effect to apply theme to HTML root
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const addRecord = <K extends keyof DatabaseState>(collection: K, record: DatabaseState[K][number]) => {
        setState(prev => ({
            ...prev,
            [collection]: [record, ...prev[collection]]
        }));
    };

    const updateRecord = <K extends keyof DatabaseState>(collection: K, id: string, updates: Partial<DatabaseState[K][number]>) => {
        setState(prev => ({
            ...prev,
            [collection]: prev[collection].map((item: any) => 
                item.id === id ? { ...item, ...updates } : item
            )
        }));
    };

    const deleteRecord = <K extends keyof DatabaseState>(collection: K, id: string) => {
        setState(prev => ({
            ...prev,
            [collection]: prev[collection].filter((item: any) => item.id !== id)
        }));
    };

    return (
        <DatabaseContext.Provider value={{ state, addRecord, updateRecord, deleteRecord, theme, toggleTheme }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useMockDb = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error("useMockDb must be used within a MockDatabaseProvider");
    }
    return context;
};
