import { ManufacturingOrder, OrderStatus, Priority } from '@/types';

// Deterministic random number generator to prevent Next.js hydration errors
let seed = 12345;
const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const PRODUCTS = [
    { name: 'Industrial Pump', part: 'IP-100', unit: 'pcs' },
    { name: 'Hydraulic Valve', part: 'HV-250', unit: 'pcs' },
    { name: 'Steel Frame A', part: 'SF-A1', unit: 'kg' },
    { name: 'Gearbox Assembly', part: 'GA-500', unit: 'pcs' },
    { name: 'Control Panel V2', part: 'CP-V2', unit: 'pcs' },
    { name: 'Base Bulk Food Product', part: 'BBFP', unit: 'kg' },
    { name: 'Packaged Food Product, 5L', part: 'PFP_5L', unit: 'pcs' },
    { name: 'Wooden Table', part: 'WT-01', unit: 'pcs' },
    { name: 'Main Subassembly', part: 'MS-1', unit: 'pcs' },
    { name: 'Mechanical Subassembly', part: 'MS-11', unit: 'pcs' },
    { name: 'Final Assembly', part: 'FA-00', unit: 'pcs' }
];

export const STATUSES: OrderStatus[] = ['Planned', 'Scheduled', 'Released', 'In Production', 'Delayed', 'Completed', 'Cancelled'];
export const PARTS_STATUSES = ['Booked', 'Not booked', 'Expected', 'Received', 'Delayed'];
export const PRIORITIES: Priority[] = ['Low', 'Normal', 'High', 'Urgent'];
export const OPERATORS = ['Mr. Peasy', 'John Carter', 'Sarah Kim', 'David Chen', 'Emma Wilson', 'Unassigned'];
export const FACTORIES = ['Jakarta Plant', 'Bandung Plant', 'Surabaya Plant', 'US Plant 1', 'DE Plant 2'];

export const generateMockData = (count: number): ManufacturingOrder[] => {
    return Array.from({ length: count }, (_, i) => {
        const product = PRODUCTS[Math.floor(random() * PRODUCTS.length)];
        const createdDate = new Date(2026, 1, 15 + Math.floor(random() * 30));
        const startOffset = Math.floor(random() * 10);
        const startDate = new Date(createdDate);
        startDate.setDate(startDate.getDate() + startOffset);
        const finishDate = new Date(startDate);
        finishDate.setDate(finishDate.getDate() + Math.floor(random() * 14) + 1);
        const dueDate = new Date(finishDate);
        dueDate.setDate(dueDate.getDate() + Math.floor(random() * 5));

        const formatDate = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

        return {
            id: `uuid-${i}`,
            orderNumber: `MO${String(20000 + i).padStart(5, '0')}`,
            status: STATUSES[Math.floor(random() * STATUSES.length)],
            productName: product.name,
            quantity: Math.floor(random() * 500) + 10,
            unit: product.unit,
            partNumber: product.part,
            partsStatus: PARTS_STATUSES[Math.floor(random() * PARTS_STATUSES.length)] as any,
            priority: PRIORITIES[Math.floor(random() * PRIORITIES.length)],
            createdDate: formatDate(createdDate),
            startDate: formatDate(startDate),
            finishDate: formatDate(finishDate),
            dueDate: formatDate(dueDate),
            assignedOperator: OPERATORS[Math.floor(random() * OPERATORS.length)],
            factory: FACTORIES[Math.floor(random() * FACTORIES.length)],
            progress: Math.floor(random() * 101),
        };
    });
};

export const MOCK_DATA = generateMockData(524);
