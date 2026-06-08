export type OrderStatus = 'Planned' | 'Scheduled' | 'Released' | 'In Production' | 'Delayed' | 'Completed' | 'Cancelled';
export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface ManufacturingOrder {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    productName: string;
    quantity: number;
    unit: string;
    partNumber: string;
    partsStatus: 'Booked' | 'Not booked' | 'Expected' | 'Received' | 'Delayed';
    priority: Priority;
    createdDate: string;
    startDate: string;
    finishDate: string;
    dueDate: string;
    assignedOperator: string;
    factory: string;
    progress: number;
}

export interface InventoryItem {
    id: string;
    sku: string;
    name: string;
    category: string;
    stockLevel: number;
    unit: string;
    reorderPoint: number;
    valuationMethod: 'FIFO' | 'LIFO' | 'Average Cost' | 'Standard Cost';
    warehouse: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface InventoryTransaction {
    id: string;
    date: string;
    type: 'Receipt' | 'Issue' | 'Transfer' | 'Adjustment' | 'Production Consumption' | 'FG Receipt';
    itemId: string;
    itemName: string;
    quantity: number;
    reference: string; // PO number, MO number, etc.
}

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    capacityPct: number;
    manager: string;
    status: 'Active' | 'Full' | 'Maintenance';
}

export interface StockAdjustment {
    id: string;
    date: string;
    itemId: string;
    itemName: string;
    reason: 'Damaged' | 'Counting Error' | 'Expired' | 'Found';
    quantityAdjusted: number;
    status: 'Draft' | 'Approved' | 'Applied';
}

export interface StockTransfer {
    id: string;
    date: string;
    itemId: string;
    itemName: string;
    fromWarehouse: string;
    toWarehouse: string;
    quantity: number;
    status: 'Pending' | 'In Transit' | 'Completed';
}

export interface CycleCount {
    id: string;
    scheduledDate: string;
    warehouse: string;
    category: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Requires Recount';
    assignedTo: string;
    varianceValue: number;
}

// Procurement Models
export interface Supplier {
    id: string;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    rating: number; // 1-5
    leadTimeDays: number;
    status: 'Active' | 'Inactive' | 'Pending';
}

export interface PurchaseOrder {
    id: string;
    poNumber: string;
    supplierId: string;
    supplierName: string;
    orderDate: string;
    deliveryDate: string;
    totalAmount: number;
    status: 'Draft' | 'Submitted' | 'Approved' | 'Ordered' | 'Partially Received' | 'Completed';
    items: number;
}

export interface PurchaseRequisition {
    id: string;
    prNumber: string;
    requestor: string;
    department: string;
    requestDate: string;
    requiredDate: string;
    status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Rejected' | 'Converted to PO';
    estimatedValue: number;
}

export interface RFQ {
    id: string;
    rfqNumber: string;
    itemDescription: string;
    deadline: string;
    status: 'Draft' | 'Published' | 'Bids Received' | 'Closed' | 'Awarded';
    bidCount: number;
}

export interface GoodsReceipt {
    id: string;
    receiptNumber: string;
    poNumber: string;
    supplierName: string;
    receivedDate: string;
    receivedBy: string;
    status: 'Pending Inspection' | 'Accepted' | 'Partially Rejected' | 'Rejected';
    itemsReceived: number;
}

export interface SupplierEvaluation {
    id: string;
    supplierName: string;
    evaluationDate: string;
    evaluator: string;
    qualityScore: number; // 1-100
    deliveryScore: number; // 1-100
    overallRating: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

export interface Contract {
    id: string;
    contractNumber: string;
    supplierName: string;
    startDate: string;
    endDate: string;
    value: number;
    status: 'Draft' | 'Active' | 'Expiring Soon' | 'Expired' | 'Terminated';
}

// CRM Models
export interface Lead {
    id: string;
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Converted';
    source: string;
    createdAt: string;
}

export interface CustomerAccount {
    id: string;
    name: string;
    industry: string;
    accountManager: string;
    annualRevenue: number;
    status: 'Active' | 'Inactive';
}

export interface Opportunity {
    id: string;
    title: string;
    accountId: string;
    accountName: string;
    value: number;
    stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
    probability: number;
    expectedCloseDate: string;
}

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    accountId: string;
    accountName: string;
    email: string;
    phone: string;
    role: string;
}

export interface Activity {
    id: string;
    title: string;
    type: 'Call' | 'Email' | 'Meeting' | 'Task';
    relatedTo: string; // Account or Opportunity name
    date: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
}

export interface Quotation {
    id: string;
    quoteNumber: string;
    accountName: string;
    opportunityName: string;
    validUntil: string;
    totalAmount: number;
    status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
}

// Project Models
export interface Project {
    id: string;
    projectName: string;
    customerId: string;
    customerName: string;
    status: 'Planning' | 'Execution' | 'Completed' | 'On Hold';
    budget: number;
    spent: number;
    startDate: string;
    endDate: string;
    manager: string;
}

export interface ProjectTask {
    id: string;
    projectId: string;
    projectName: string;
    taskName: string;
    assignee: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    dueDate: string;
}

export interface ProjectMilestone {
    id: string;
    projectId: string;
    projectName: string;
    title: string;
    date: string;
    status: 'Pending' | 'Achieved';
}

export interface ProjectBudget {
    id: string;
    projectId: string;
    projectName: string;
    category: 'Labor' | 'Materials' | 'Software' | 'Travel' | 'Other';
    allocated: number;
    spent: number;
}

export interface ProjectTeamMember {
    id: string;
    projectId: string;
    projectName: string;
    name: string;
    role: 'Project Manager' | 'Developer' | 'Designer' | 'Consultant' | 'QA';
    allocationPct: number;
}

// Calendar Models
export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    type: 'Production' | 'Delivery' | 'Meeting' | 'Milestone' | 'Maintenance';
    relatedId?: string; // ID of the related MO, PO, Project, etc.
}

// Manufacturing Extended Models
export interface WorkstationGroup {
    id: string;
    name: string;
    department: string;
    manager: string;
    workstationCount: number;
    efficiency: number; // 0-100%
}

export interface Workstation {
    id: string;
    name: string;
    groupId: string;
    groupName: string;
    status: 'Operational' | 'Maintenance' | 'Offline';
    efficiency: number; // 0-100%
}

export interface MPS {
    id: string;
    period: string; // e.g., 'June 2026'
    productName: string;
    plannedQuantity: number;
    status: 'Draft' | 'Confirmed' | 'In Production';
    demandSource: 'Forecast' | 'Sales Orders';
}

export interface BOM {
    id: string;
    productName: string;
    version: string;
    componentCount: number;
    status: 'Active' | 'Obsolete' | 'In Development';
    totalCost: number;
}

export interface Routing {
    id: string;
    productName: string;
    sequenceCount: number;
    totalTimeMinutes: number;
    status: 'Active' | 'Obsolete';
}

