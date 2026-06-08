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
