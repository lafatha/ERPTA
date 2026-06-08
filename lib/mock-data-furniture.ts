import { 
    ManufacturingOrder, InventoryItem, Supplier, PurchaseOrder, Lead, 
    CustomerAccount, Opportunity, Project, CalendarEvent, Workstation,
    InventoryTransaction, Warehouse, StockAdjustment, StockTransfer, CycleCount,
    WorkstationGroup, MPS, BOM, Routing, PurchaseRequisition, RFQ, GoodsReceipt, 
    SupplierEvaluation, Contract, Contact, Activity, Quotation,
    ProjectTask, ProjectMilestone, ProjectBudget, ProjectTeamMember
} from '@/types';

// Generators for Furniture Theme
export const FURNITURE_PRODUCTS = [
    { name: 'Executive Desk - Oak', part: 'FD-OAK-01', unit: 'pcs' },
    { name: 'Ergonomic Office Chair', part: 'CH-ERG-02', unit: 'pcs' },
    { name: 'Conference Table 12ft', part: 'CT-12-00', unit: 'pcs' },
    { name: 'Modern Sofa 3-Seater', part: 'SF-MOD-3S', unit: 'pcs' },
    { name: 'Bookshelf - Walnut', part: 'BS-WAL-05', unit: 'pcs' },
    { name: 'Filing Cabinet 4-Drawer', part: 'FC-4D-00', unit: 'pcs' },
    { name: 'Dining Table - Rustic', part: 'DT-RUS-01', unit: 'pcs' },
    { name: 'Lounge Chair', part: 'LC-001', unit: 'pcs' },
];

export const RAW_MATERIALS = [
    { name: 'Oak Wood Panel 8x4', category: 'Raw Materials', unit: 'pcs' },
    { name: 'Walnut Wood Panel 8x4', category: 'Raw Materials', unit: 'pcs' },
    { name: 'MDF Board 18mm', category: 'Raw Materials', unit: 'pcs' },
    { name: 'Premium Leather - Black', category: 'Upholstery', unit: 'm' },
    { name: 'High-Density Foam', category: 'Upholstery', unit: 'kg' },
    { name: 'Drawer Slides (Set)', category: 'Hardware', unit: 'pcs' },
    { name: 'Screws 50mm (Box)', category: 'Hardware', unit: 'box' },
    { name: 'Wood Glue 5L', category: 'Consumables', unit: 'L' },
    { name: 'Clear Varnish', category: 'Consumables', unit: 'L' },
    { name: 'Packaging Cardboard', category: 'Packaging', unit: 'm' },
];

export const SUPPLIERS_LIST = [
    { name: 'Nordic Timber Supplies', contact: 'Olaf Jensen', industry: 'Wood' },
    { name: 'Global Hardware Co.', contact: 'Chen Wei', industry: 'Hardware' },
    { name: 'Premium Fabrics Ltd', contact: 'Sarah Miller', industry: 'Upholstery' },
    { name: 'ChemCo Finishes', contact: 'David Brown', industry: 'Chemicals' },
];

export const CUSTOMERS_LIST = [
    { name: 'OfficeMax Solutions', industry: 'Retail' },
    { name: 'Grand Hotels Group', industry: 'Hospitality' },
    { name: 'Workspace Innovations', industry: 'Corporate' },
    { name: 'Direct Furniture Outlet', industry: 'Retail' },
];

const formatDate = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

// Generators
export const generateInventory = (): InventoryItem[] => {
    return [...FURNITURE_PRODUCTS.map((p, i) => ({
        id: `inv-fg-${i}`,
        sku: p.part,
        name: p.name,
        category: 'Finished Goods',
        stockLevel: Math.floor(Math.random() * 50) + 10,
        unit: p.unit,
        reorderPoint: 15,
        valuationMethod: 'FIFO' as const,
        warehouse: 'Finished Goods Warehouse',
        status: 'In Stock' as const,
    })), ...RAW_MATERIALS.map((m, i) => {
        const stock = Math.floor(Math.random() * 500) + 20;
        return {
            id: `inv-rm-${i}`,
            sku: `RM-${String(i).padStart(4, '0')}`,
            name: m.name,
            category: m.category,
            stockLevel: stock,
            unit: m.unit,
            reorderPoint: 100,
            valuationMethod: 'Average Cost' as const,
            warehouse: 'Raw Materials Warehouse',
            status: stock < 100 ? 'Low Stock' as const : 'In Stock' as const,
        }
    })];
};

export const generateSuppliers = (): Supplier[] => {
    return SUPPLIERS_LIST.map((s, i) => ({
        id: `sup-${i}`,
        name: s.name,
        contactName: s.contact,
        email: `contact@${s.name.toLowerCase().replace(/\s/g, '')}.com`,
        phone: '+1-555-019' + i,
        rating: Math.floor(Math.random() * 2) + 4,
        leadTimeDays: Math.floor(Math.random() * 10) + 5,
        status: 'Active',
    }));
};

export const generatePurchaseOrders = (suppliers: Supplier[]): PurchaseOrder[] => {
    return Array.from({ length: 15 }, (_, i) => {
        const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
        const d = new Date(2026, 4, 1 + i);
        return {
            id: `po-${i}`,
            poNumber: `PO-2026-${String(i + 100)}`,
            supplierId: supplier.id,
            supplierName: supplier.name,
            orderDate: formatDate(d),
            deliveryDate: formatDate(new Date(d.getTime() + supplier.leadTimeDays * 86400000)),
            totalAmount: Math.floor(Math.random() * 50000) + 5000,
            status: ['Draft', 'Submitted', 'Approved', 'Ordered', 'Partially Received', 'Completed'][Math.floor(Math.random() * 6)] as any,
            items: Math.floor(Math.random() * 10) + 1,
        };
    });
};

export const generateManufacturingOrders = (): ManufacturingOrder[] => {
    return Array.from({ length: 25 }, (_, i) => {
        const p = FURNITURE_PRODUCTS[Math.floor(Math.random() * FURNITURE_PRODUCTS.length)];
        const d = new Date(2026, 5, 1 + (i % 20));
        return {
            id: `mo-${i}`,
            orderNumber: `MO-F-${String(20000 + i)}`,
            status: ['Planned', 'Scheduled', 'Released', 'In Production', 'Delayed', 'Completed'][Math.floor(Math.random() * 6)] as any,
            productName: p.name,
            quantity: Math.floor(Math.random() * 50) + 5,
            unit: p.unit,
            partNumber: p.part,
            partsStatus: ['Booked', 'Not booked', 'Expected', 'Received', 'Delayed'][Math.floor(Math.random() * 5)] as any,
            priority: ['Low', 'Normal', 'High', 'Urgent'][Math.floor(Math.random() * 4)] as any,
            createdDate: formatDate(new Date(d.getTime() - 5 * 86400000)),
            startDate: formatDate(d),
            finishDate: formatDate(new Date(d.getTime() + 7 * 86400000)),
            dueDate: formatDate(new Date(d.getTime() + 10 * 86400000)),
            assignedOperator: ['John Smith', 'Maria Garcia', 'Alex Chen'][Math.floor(Math.random() * 3)],
            factory: 'Main Furniture Plant',
            progress: Math.floor(Math.random() * 100),
        };
    });
};

export const generateCustomers = (): CustomerAccount[] => {
    return CUSTOMERS_LIST.map((c, i) => ({
        id: `cust-${i}`,
        name: c.name,
        industry: c.industry,
        accountManager: 'Sarah Jenkins',
        annualRevenue: Math.floor(Math.random() * 5000000) + 500000,
        status: 'Active',
    }));
};

export const generateWarehouses = (): Warehouse[] => {
    return [
        { id: 'wh-1', name: 'Raw Materials Warehouse', location: 'Building A', capacityPct: 85, manager: 'Tom Hanks', status: 'Active' },
        { id: 'wh-2', name: 'Finished Goods Warehouse', location: 'Building B', capacityPct: 62, manager: 'Emma Stone', status: 'Active' },
        { id: 'wh-3', name: 'Hardware Storage', location: 'Building A - Annex', capacityPct: 45, manager: 'Tom Hanks', status: 'Active' },
        { id: 'wh-4', name: 'Upholstery Storage', location: 'Building C', capacityPct: 95, manager: 'Chris Pratt', status: 'Full' },
        { id: 'wh-5', name: 'Distribution Center', location: 'Offsite Logistics Hub', capacityPct: 70, manager: 'Zendaya', status: 'Active' },
    ];
};

export const generateTransactions = (items: InventoryItem[]): InventoryTransaction[] => {
    return Array.from({ length: 40 }, (_, i) => {
        const item = items[Math.floor(Math.random() * items.length)];
        const d = new Date(2026, 5, Math.floor(Math.random() * 8) + 1);
        return {
            id: `txn-${i}`,
            date: formatDate(d),
            type: ['Receipt', 'Issue', 'Transfer', 'Adjustment', 'Production Consumption', 'FG Receipt'][Math.floor(Math.random() * 6)] as any,
            itemId: item.id,
            itemName: item.name,
            quantity: Math.floor(Math.random() * 100) + 1,
            reference: `REF-${2000 + i}`,
        };
    });
};

export const generateAdjustments = (items: InventoryItem[]): StockAdjustment[] => {
    return Array.from({ length: 10 }, (_, i) => {
        const item = items[Math.floor(Math.random() * items.length)];
        return {
            id: `adj-${i}`,
            date: formatDate(new Date(2026, 5, Math.floor(Math.random() * 8) + 1)),
            itemId: item.id,
            itemName: item.name,
            reason: ['Damaged', 'Counting Error', 'Expired', 'Found'][Math.floor(Math.random() * 4)] as any,
            quantityAdjusted: Math.floor(Math.random() * 10) - 5,
            status: ['Draft', 'Approved', 'Applied'][Math.floor(Math.random() * 3)] as any,
        };
    });
};

export const generateTransfers = (items: InventoryItem[]): StockTransfer[] => {
    return Array.from({ length: 8 }, (_, i) => {
        const item = items[Math.floor(Math.random() * items.length)];
        return {
            id: `trx-${i}`,
            date: formatDate(new Date(2026, 5, Math.floor(Math.random() * 8) + 1)),
            itemId: item.id,
            itemName: item.name,
            fromWarehouse: 'Raw Materials Warehouse',
            toWarehouse: 'Hardware Storage',
            quantity: Math.floor(Math.random() * 50) + 10,
            status: ['Pending', 'In Transit', 'Completed'][Math.floor(Math.random() * 3)] as any,
        };
    });
};

export const generateCycleCounts = (): CycleCount[] => {
    return Array.from({ length: 5 }, (_, i) => {
        return {
            id: `cc-${i}`,
            scheduledDate: formatDate(new Date(2026, 5, Math.floor(Math.random() * 20) + 1)),
            warehouse: ['Raw Materials Warehouse', 'Finished Goods Warehouse', 'Hardware Storage'][Math.floor(Math.random() * 3)],
            category: ['Wood', 'Hardware', 'Fabric', 'Finished Goods'][Math.floor(Math.random() * 4)],
            status: ['Scheduled', 'In Progress', 'Completed', 'Requires Recount'][Math.floor(Math.random() * 4)] as any,
            assignedTo: 'Auditor ' + (i + 1),
            varianceValue: Math.floor(Math.random() * 500) - 100,
        };
    });
};

export const generateWorkstationGroups = (): WorkstationGroup[] => {
    return [
        { id: 'wg-1', name: 'Cutting Department', department: 'Primary Machining', manager: 'David Miller', workstationCount: 4, efficiency: 92 },
        { id: 'wg-2', name: 'CNC Routing', department: 'Advanced Machining', manager: 'Sarah Jenkins', workstationCount: 3, efficiency: 88 },
        { id: 'wg-3', name: 'Finishing & Painting', department: 'Surface Treatment', manager: 'Michael Chang', workstationCount: 5, efficiency: 85 },
        { id: 'wg-4', name: 'Upholstery', department: 'Soft Goods', manager: 'Elena Rodriguez', workstationCount: 6, efficiency: 95 },
        { id: 'wg-5', name: 'Final Assembly', department: 'Assembly', manager: 'James Wilson', workstationCount: 8, efficiency: 90 },
    ];
};

export const generateWorkstations = (groups: WorkstationGroup[]): Workstation[] => {
    let wsId = 1;
    return groups.flatMap(g => 
        Array.from({ length: g.workstationCount }, (_, i) => ({
            id: `ws-${wsId++}`,
            name: `${g.name} Station ${i + 1}`,
            groupId: g.id,
            groupName: g.name,
            status: ['Operational', 'Maintenance', 'Offline'][Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : 2) : 0] as any,
            efficiency: Math.floor(Math.random() * 20) + 80,
        }))
    );
};

export const generateMPS = (): MPS[] => {
    return Array.from({ length: 15 }, (_, i) => {
        const p = FURNITURE_PRODUCTS[Math.floor(Math.random() * FURNITURE_PRODUCTS.length)];
        return {
            id: `mps-${i}`,
            period: `W${(i % 4) + 1} Jun 2026`,
            productName: p.name,
            plannedQuantity: Math.floor(Math.random() * 200) + 50,
            status: ['Draft', 'Confirmed', 'In Production'][Math.floor(Math.random() * 3)] as any,
            demandSource: ['Forecast', 'Sales Orders'][Math.floor(Math.random() * 2)] as any,
        };
    });
};

export const generateBOMs = (): BOM[] => {
    return FURNITURE_PRODUCTS.map((p, i) => ({
        id: `bom-${i}`,
        productName: p.name,
        version: `v1.${Math.floor(Math.random() * 5)}`,
        componentCount: Math.floor(Math.random() * 15) + 5,
        status: ['Active', 'In Development', 'Obsolete'][Math.floor(Math.random() * 3)] as any,
        totalCost: Math.floor(Math.random() * 300) + 50,
    }));
};

export const generateRoutings = (): Routing[] => {
    return FURNITURE_PRODUCTS.map((p, i) => ({
        id: `rtg-${i}`,
        productName: p.name,
        sequenceCount: Math.floor(Math.random() * 6) + 3,
        totalTimeMinutes: Math.floor(Math.random() * 240) + 60,
        status: 'Active' as const,
    }));
};


export const generateLeads = (): Lead[] => {
    return Array.from({ length: 20 }, (_, i) => ({
        id: `lead-${i}`,
        company: `Prospect Company ${i + 1}`,
        contactPerson: `John Doe ${i}`,
        email: `john.doe${i}@prospect.com`,
        phone: `+1-555-01${String(i).padStart(2, '0')}`,
        status: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'][Math.floor(Math.random() * 5)] as any,
        source: ['Website', 'Trade Show', 'Referral', 'Cold Call'][Math.floor(Math.random() * 4)],
        createdAt: formatDate(new Date(2026, Math.floor(Math.random() * 5), Math.floor(Math.random() * 28) + 1)),
    }));
};

export const generateOpportunities = (customers: CustomerAccount[]): Opportunity[] => {
    return Array.from({ length: 15 }, (_, i) => {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        return {
            id: `opp-${i}`,
            title: `${customer.name} - Q3 Furniture Upgrade`,
            accountId: customer.id,
            accountName: customer.name,
            value: Math.floor(Math.random() * 100000) + 5000,
            stage: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'][Math.floor(Math.random() * 6)] as any,
            probability: Math.floor(Math.random() * 100),
            expectedCloseDate: formatDate(new Date(2026, Math.floor(Math.random() * 5) + 6, Math.floor(Math.random() * 28) + 1)),
        };
    });
};

export const generateContacts = (customers: CustomerAccount[]): Contact[] => {
    return customers.flatMap((c, i) => [
        {
            id: `cont-${i}-1`,
            firstName: 'Alice',
            lastName: `Smith ${i}`,
            accountId: c.id,
            accountName: c.name,
            email: `alice@${c.name.replace(/\s+/g, '').toLowerCase()}.com`,
            phone: `+1-555-900${i}`,
            role: 'Purchasing Manager',
        },
        {
            id: `cont-${i}-2`,
            firstName: 'Bob',
            lastName: `Johnson ${i}`,
            accountId: c.id,
            accountName: c.name,
            email: `bob@${c.name.replace(/\s+/g, '').toLowerCase()}.com`,
            phone: `+1-555-901${i}`,
            role: 'Facilities Director',
        }
    ]);
};

export const generateActivities = (customers: CustomerAccount[]): Activity[] => {
    return Array.from({ length: 25 }, (_, i) => {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        return {
            id: `act-${i}`,
            title: `Follow up on Proposal`,
            type: ['Call', 'Email', 'Meeting', 'Task'][Math.floor(Math.random() * 4)] as any,
            relatedTo: customer.name,
            date: formatDate(new Date(2026, 5, Math.floor(Math.random() * 28) + 1)),
            status: ['Pending', 'Completed'][Math.floor(Math.random() * 2)] as any,
            assignedTo: 'Sales Rep ' + (Math.floor(Math.random() * 3) + 1),
        };
    });
};

export const generateQuotations = (opps: Opportunity[]): Quotation[] => {
    return opps.map((o, i) => ({
        id: `qt-${i}`,
        quoteNumber: `QT-2026-${String(i + 100)}`,
        accountName: o.accountName,
        opportunityName: o.title,
        validUntil: formatDate(new Date(2026, 6, Math.floor(Math.random() * 28) + 1)),
        totalAmount: o.value * (1 - (Math.random() * 0.1)), // Slightly discounted from opp value
        status: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'][Math.floor(Math.random() * 5)] as any,
    }));
};

export const generateProjects = (customers: CustomerAccount[]): Project[] => {
    return Array.from({ length: 10 }, (_, i) => {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const budget = Math.floor(Math.random() * 200000) + 20000;
        return {
            id: `proj-${i}`,
            projectName: `${customer.name} - Custom Fitout ${i+1}`,
            customerId: customer.id,
            customerName: customer.name,
            status: ['Planning', 'Execution', 'Completed', 'On Hold'][Math.floor(Math.random() * 4)] as any,
            budget: budget,
            spent: budget * (Math.random() * 0.9),
            startDate: formatDate(new Date(2026, Math.floor(Math.random() * 3) + 1, 1)),
            endDate: formatDate(new Date(2026, Math.floor(Math.random() * 3) + 6, 28)),
            manager: 'Alice Project Lead',
        };
    });
};

export const generateProjectTasks = (projects: Project[]): ProjectTask[] => {
    return projects.flatMap(p => Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
        id: `ptask-${p.id}-${i}`,
        projectId: p.id,
        projectName: p.projectName,
        taskName: `Design Phase ${i + 1}`,
        assignee: ['Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 3)],
        status: ['To Do', 'In Progress', 'Review', 'Done'][Math.floor(Math.random() * 4)] as any,
        dueDate: formatDate(new Date(2026, Math.floor(Math.random() * 11), 15)),
    })));
};

export const generateProjectMilestones = (projects: Project[]): ProjectMilestone[] => {
    return projects.flatMap(p => Array.from({ length: 3 }, (_, i) => ({
        id: `pmile-${p.id}-${i}`,
        projectId: p.id,
        projectName: p.projectName,
        title: `Phase ${i + 1} Delivery`,
        date: formatDate(new Date(2026, Math.floor(Math.random() * 11), 28)),
        status: ['Pending', 'Achieved'][Math.floor(Math.random() * 2)] as any,
    })));
};

export const generateProjectBudgets = (projects: Project[]): ProjectBudget[] => {
    return projects.flatMap(p => ['Labor', 'Materials', 'Software', 'Travel'].map((cat, i) => {
        const allocated = p.budget * (Math.random() * 0.3 + 0.1);
        return {
            id: `pbudg-${p.id}-${i}`,
            projectId: p.id,
            projectName: p.projectName,
            category: cat as any,
            allocated: allocated,
            spent: allocated * (Math.random() * 0.9),
        };
    }));
};

export const generateProjectTeamMembers = (projects: Project[]): ProjectTeamMember[] => {
    return projects.flatMap(p => Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (_, i) => ({
        id: `pteam-${p.id}-${i}`,
        projectId: p.id,
        projectName: p.projectName,
        name: `Team Member ${i + 1}`,
        role: ['Project Manager', 'Developer', 'Designer', 'Consultant', 'QA'][Math.floor(Math.random() * 5)] as any,
        allocationPct: Math.floor(Math.random() * 50) + 50,
    })));
};

export const generateRequisitions = (): PurchaseRequisition[] => {
    return Array.from({ length: 12 }, (_, i) => ({
        id: `pr-${i}`,
        prNumber: `PR-2026-${String(i + 100)}`,
        requestor: ['Alice Johnson', 'Bob Smith', 'Charlie Davis'][Math.floor(Math.random() * 3)],
        department: ['Production', 'Maintenance', 'Office'][Math.floor(Math.random() * 3)],
        requestDate: formatDate(new Date(2026, 4, 10 + i)),
        requiredDate: formatDate(new Date(2026, 5, 10 + i)),
        status: ['Draft', 'Submitted', 'In Review', 'Approved', 'Rejected', 'Converted to PO'][Math.floor(Math.random() * 6)] as any,
        estimatedValue: Math.floor(Math.random() * 15000) + 1000,
    }));
};

export const generateRFQs = (): RFQ[] => {
    return Array.from({ length: 8 }, (_, i) => ({
        id: `rfq-${i}`,
        rfqNumber: `RFQ-2026-${String(i + 50)}`,
        itemDescription: ['Lumber Batch', 'Screws & Fasteners', 'Leather Rolls', 'Packaging Materials'][Math.floor(Math.random() * 4)],
        deadline: formatDate(new Date(2026, 5, 15 + i)),
        status: ['Draft', 'Published', 'Bids Received', 'Closed', 'Awarded'][Math.floor(Math.random() * 5)] as any,
        bidCount: Math.floor(Math.random() * 4),
    }));
};

export const generateGoodsReceipts = (pos: PurchaseOrder[]): GoodsReceipt[] => {
    return Array.from({ length: 15 }, (_, i) => {
        const po = pos[Math.floor(Math.random() * pos.length)];
        return {
            id: `gr-${i}`,
            receiptNumber: `GR-2026-${String(i + 200)}`,
            poNumber: po.poNumber,
            supplierName: po.supplierName,
            receivedDate: formatDate(new Date(2026, 5, i + 1)),
            receivedBy: 'Warehouse Team',
            status: ['Pending Inspection', 'Accepted', 'Partially Rejected', 'Rejected'][Math.floor(Math.random() * 4)] as any,
            itemsReceived: po.items,
        };
    });
};

export const generateSupplierEvaluations = (suppliers: Supplier[]): SupplierEvaluation[] => {
    return suppliers.map((s, i) => ({
        id: `eval-${i}`,
        supplierName: s.name,
        evaluationDate: formatDate(new Date(2026, 4, 28)),
        evaluator: 'Procurement Manager',
        qualityScore: Math.floor(Math.random() * 20) + 80,
        deliveryScore: Math.floor(Math.random() * 25) + 75,
        overallRating: ['Excellent', 'Good', 'Average'][Math.floor(Math.random() * 3)] as any,
    }));
};

export const generateContracts = (suppliers: Supplier[]): Contract[] => {
    return suppliers.map((s, i) => ({
        id: `ctr-${i}`,
        contractNumber: `CTR-2026-${String(i + 10)}`,
        supplierName: s.name,
        startDate: formatDate(new Date(2025, 0, 1)),
        endDate: formatDate(new Date(2026, 11, 31)),
        value: Math.floor(Math.random() * 500000) + 50000,
        status: ['Active', 'Expiring Soon'][Math.floor(Math.random() * 2)] as any,
    }));
};

export const generateCalendarEvents = (): CalendarEvent[] => {
    return Array.from({ length: 15 }, (_, i) => ({
        id: `calevt-${i}`,
        title: `Team Sync ${i + 1}`,
        date: formatDate(new Date(2026, Math.floor(Math.random() * 11), Math.floor(Math.random() * 28) + 1)),
        type: ['Production', 'Delivery', 'Meeting', 'Milestone', 'Maintenance'][Math.floor(Math.random() * 5)] as any,
    }));
};

export const INITIAL_INVENTORY = generateInventory();
export const INITIAL_SUPPLIERS = generateSuppliers();
export const INITIAL_POS = generatePurchaseOrders(INITIAL_SUPPLIERS);
export const INITIAL_MOS = generateManufacturingOrders();
export const INITIAL_CUSTOMERS = generateCustomers();
export const INITIAL_WAREHOUSES = generateWarehouses();
export const INITIAL_TRANSACTIONS = generateTransactions(INITIAL_INVENTORY);
export const INITIAL_ADJUSTMENTS = generateAdjustments(INITIAL_INVENTORY);
export const INITIAL_TRANSFERS = generateTransfers(INITIAL_INVENTORY);
export const INITIAL_CYCLE_COUNTS = generateCycleCounts();
export const INITIAL_WORKSTATION_GROUPS = generateWorkstationGroups();
export const INITIAL_WORKSTATIONS = generateWorkstations(INITIAL_WORKSTATION_GROUPS);
export const INITIAL_MPS = generateMPS();
export const INITIAL_BOMS = generateBOMs();
export const INITIAL_ROUTINGS = generateRoutings();
export const INITIAL_REQUISITIONS = generateRequisitions();
export const INITIAL_RFQS = generateRFQs();
export const INITIAL_RECEIPTS = generateGoodsReceipts(INITIAL_POS);
export const INITIAL_EVALUATIONS = generateSupplierEvaluations(INITIAL_SUPPLIERS);
export const INITIAL_CONTRACTS = generateContracts(INITIAL_SUPPLIERS);
export const INITIAL_LEADS = generateLeads();
export const INITIAL_OPPORTUNITIES = generateOpportunities(INITIAL_CUSTOMERS);
export const INITIAL_CONTACTS = generateContacts(INITIAL_CUSTOMERS);
export const INITIAL_ACTIVITIES = generateActivities(INITIAL_CUSTOMERS);
export const INITIAL_QUOTATIONS = generateQuotations(INITIAL_OPPORTUNITIES);
export const INITIAL_PROJECTS = generateProjects(INITIAL_CUSTOMERS);
export const INITIAL_PROJECT_TASKS = generateProjectTasks(INITIAL_PROJECTS);
export const INITIAL_PROJECT_MILESTONES = generateProjectMilestones(INITIAL_PROJECTS);
export const INITIAL_PROJECT_BUDGETS = generateProjectBudgets(INITIAL_PROJECTS);
export const INITIAL_PROJECT_TEAM_MEMBERS = generateProjectTeamMembers(INITIAL_PROJECTS);
export const INITIAL_CALENDAR_EVENTS = generateCalendarEvents();
