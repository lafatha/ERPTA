"use client";

import React from 'react';
import { useMockDb } from '@/lib/mock-db-context';

export const AnalyticsView = () => {
    const { state } = useMockDb();
    const { inventoryItems, inventoryTransactions } = state;

    const totalValue = inventoryItems.reduce((acc, item) => {
        const valNum = (item.name.length * 12.5) + (item.category === 'Finished Goods' ? 200 : 5);
        return acc + (valNum * item.stockLevel);
    }, 0);

    const outOfStock = inventoryItems.filter(i => i.status === 'Out of Stock').length;
    const totalTransactions = inventoryTransactions.length;

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-6">
                
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Total Inventory Value</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">${totalValue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Out of Stock Items</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{outOfStock}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">30-Day Transactions</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{totalTransactions}</p>
                    </div>
                </div>

                <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Inventory Movement Volume</h3>
                    <div className="flex-1 flex items-end gap-2 justify-between mt-auto">
                        {[20, 35, 25, 50, 45, 65, 55, 80, 70, 90, 85, 110].map((h, i) => (
                            <div key={i} className="w-full bg-gray-800 dark:bg-gray-400 rounded-t-sm hover:bg-black dark:hover:bg-white transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span><span>W9</span><span>W10</span><span>W11</span><span>W12</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
