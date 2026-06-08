import { InventoryItem } from '@/types';

export const CATEGORIES = ['Raw Materials', 'Work in Progress', 'Finished Goods', 'Packaging', 'MRO (Maintenance, Repair, Operations)'];
export const WAREHOUSES = ['Main Distribution Center', 'North Wing Storage', 'South Wing Storage', 'Hazardous Materials Facility', 'Off-site Warehouse A'];
export const VALUATION_METHODS = ['FIFO', 'LIFO', 'Average Cost', 'Standard Cost'] as const;

export const generateInventoryMockData = (count: number): InventoryItem[] => {
    return Array.from({ length: count }, (_, i) => {
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const stockLevel = Math.floor(Math.random() * 5000);
        const reorderPoint = Math.floor(Math.random() * 1000) + 100;
        
        let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
        if (stockLevel === 0) status = 'Out of Stock';
        else if (stockLevel < reorderPoint) status = 'Low Stock';

        return {
            id: `inv-${i}`,
            sku: `SKU-${String(10000 + i).padStart(5, '0')}`,
            name: `Mock Component ${i + 1}`,
            category,
            stockLevel,
            unit: ['pcs', 'kg', 'L', 'm'][Math.floor(Math.random() * 4)],
            reorderPoint,
            valuationMethod: VALUATION_METHODS[Math.floor(Math.random() * VALUATION_METHODS.length)],
            warehouse: WAREHOUSES[Math.floor(Math.random() * WAREHOUSES.length)],
            status,
        };
    });
};

export const MOCK_INVENTORY_DATA = generateInventoryMockData(450);
