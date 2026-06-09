import { ManufacturingOrder, OrderStatus, Priority } from '@/types';

// Deterministic random number generator to prevent Next.js hydration errors
let seed = 12345;
const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const PRODUCTS = [
    { name: 'Executive Desk Pro', part: 'FG-EDP-001', unit: 'pcs' },
    { name: 'Modern Wardrobe Series A', part: 'FG-MWA-002', unit: 'pcs' },
    { name: 'Premium Bookshelf XL', part: 'FG-PBX-003', unit: 'pcs' },
    { name: 'Conference Table Elite', part: 'FG-CTE-004', unit: 'pcs' },
    { name: 'Luxury Sofa Collection', part: 'FG-LSC-005', unit: 'pcs' },
    { name: 'Dining Set Signature', part: 'FG-DSS-006', unit: 'pcs' },
    { name: 'Oak Wood Panel 8x4', part: 'RM-OWP-001', unit: 'pcs' },
    { name: 'Teak Wood Board', part: 'RM-TWB-002', unit: 'pcs' },
    { name: 'MDF Sheet 18mm', part: 'RM-MDF-003', unit: 'pcs' },
    { name: 'Premium Leather Roll', part: 'RM-LTR-008', unit: 'pcs' },
    { name: 'Metal Drawer Slides', part: 'RM-DRW-010', unit: 'pcs' }
];

export const STATUSES: OrderStatus[] = ['Planned', 'Scheduled', 'Released', 'In Production', 'Delayed', 'Completed', 'Cancelled'];
export const PARTS_STATUSES = ['Booked', 'Not booked', 'Expected', 'Received', 'Delayed'];
export const PRIORITIES: Priority[] = ['Low', 'Normal', 'High', 'Urgent'];
export const OPERATORS = ['Budi Santoso', 'Siti Rahma', 'Adi Wijaya', 'Eko Susilo', 'Dewi Lestari', 'Unassigned'];
export const FACTORIES = ['Jepara Plant', 'Cikarang Plant', 'Surabaya Plant', 'Tangerang Plant', 'Semarang Plant'];

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
