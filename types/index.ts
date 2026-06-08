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
