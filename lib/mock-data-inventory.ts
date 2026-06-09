import { InventoryItem } from '@/types';

export const CATEGORIES = ['Finished Goods', 'Semi-Finished Goods', 'Raw Materials', 'Hardware', 'Upholstery Materials', 'Paint & Finishing Materials', 'Packaging Materials', 'Accessories'];
export const WAREHOUSES = ['Raw Materials Warehouse', 'Hardware Warehouse', 'Upholstery Warehouse', 'Finished Goods Warehouse', 'Distribution Center'];
export const VALUATION_METHODS = ['FIFO', 'LIFO', 'Average Cost', 'Standard Cost'] as const;

export const generateInventoryMockData = (count: number): InventoryItem[] => {
    return Array.from({ length: count }, (_, i) => {
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const stockLevel = Math.floor(Math.random() * 5000);
        const reorderPoint = Math.floor(Math.random() * 1000) + 100;
        
        let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
        if (stockLevel === 0) status = 'Out of Stock';
        else if (stockLevel < reorderPoint) status = 'Low Stock';

        // Furniture-specific item names based on category
        let name = '';
        if (category === 'Finished Goods') {
            name = ['Executive Desk Pro', 'Modern Wardrobe Series A', 'Premium Bookshelf XL', 'Conference Table Elite', 'Luxury Sofa Collection', 'Dining Set Signature'][i % 6];
        } else if (category === 'Semi-Finished Goods') {
            name = ['Sanded Wood Frame', 'Pre-assembled Drawer Box', 'Cushion Inner Core', 'Polished Table Top'][i % 4];
        } else if (category === 'Raw Materials') {
            name = ['Oak Wood Panel 8x4', 'Teak Wood Board', 'MDF Sheet 18mm', 'Plywood Panel 12mm', 'Veneer Sheet'][i % 5];
        } else if (category === 'Upholstery Materials') {
            name = ['Premium Leather Roll', 'Upholstery Fabric Blue', 'High-Density Foam Cushion', 'Polyester Padding'][i % 4];
        } else if (category === 'Hardware') {
            name = ['Metal Drawer Slides', 'Cabinet Hinges', 'Screws 50mm (Box)', 'Fasteners Pack'][i % 4];
        } else if (category === 'Paint & Finishing Materials') {
            name = ['Clear Varnish 5L', 'Wood Stain Walnut', 'Sandpaper Grits Set', 'Wood Primer'][i % 4];
        } else if (category === 'Packaging Materials') {
            name = ['Packaging Carton Box', 'Bubble Wrap Roll', 'Pallet Stretch Film', 'Edge Protectors'][i % 4];
        } else {
            name = `Furniture Accent Grade-${(i % 3) + 1}`;
        }

        return {
            id: `inv-${i}`,
            sku: `SKU-${String(10000 + i).padStart(5, '0')}`,
            name,
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
