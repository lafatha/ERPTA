"use client";

import React from 'react';
import { useMockDb } from '@/lib/mock-db-context';

export const ProcurementAnalyticsView = () => {
    const { state } = useMockDb();
    const { purchaseOrders, purchaseRequisitions, goodsReceipts } = state;

    const totalPOValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
    const pendingReceipts = goodsReceipts.filter(gr => gr.status === 'Pending Inspection').length;
    const approvedPRs = purchaseRequisitions.filter(pr => pr.status === 'Approved').length;

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-6">
                
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Total PO Spend (YTD)</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">${totalPOValue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Pending Inspections</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{pendingReceipts}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Approved Requisitions</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{approvedPRs}</p>
                    </div>
                </div>

                <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Supplier Spend Distribution</h3>
                    <div className="flex-1 flex items-end gap-2 justify-between mt-auto">
                        {[120, 85, 45, 90, 65, 30, 55, 110, 75, 40, 95, 100].map((h, i) => (
                            <div key={i} className="w-full bg-green-500 rounded-t-sm hover:bg-green-600 transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
