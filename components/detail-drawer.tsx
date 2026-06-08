"use client";

import React from 'react';
import { ManufacturingOrder } from '@/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Icons } from './icons';

export const DetailDrawer = ({ order, onClose }: { order: ManufacturingOrder | null, onClose: () => void }) => {
    if (!order) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/10 z-40 transition-opacity" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-semibold tracking-tight text-gray-900">{order.orderNumber}</h2>
                            <Badge variant={order.status === 'Delayed' ? 'dark' : 'outline'}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">{order.productName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"><Icons.MoreHorizontal className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={onClose}><Icons.X /></Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Tabs Mock */}
                    <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm">
                        <span className="pb-2 border-b-2 border-black font-medium text-gray-900">Overview</span>
                        <span className="pb-2 text-gray-500 hover:text-gray-900 cursor-pointer">Operations (4)</span>
                        <span className="pb-2 text-gray-500 hover:text-gray-900 cursor-pointer">Materials</span>
                        <span className="pb-2 text-gray-500 hover:text-gray-900 cursor-pointer">Costs</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Quantity to Produce</label>
                            <div className="text-2xl font-light text-gray-900">{order.quantity} <span className="text-sm text-gray-400">{order.unit}</span></div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Progress</label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-black rounded-full" style={{ width: `${order.progress}%` }} />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{order.progress}%</span>
                            </div>
                        </div>

                        <div className="col-span-2 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Scheduling Details</h3>
                            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-sm border border-gray-100">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Created</div>
                                    <div className="text-sm text-gray-900 font-medium">{order.createdDate}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Planned Start</div>
                                    <div className="text-sm text-gray-900 font-medium">{order.startDate}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Deadline</div>
                                    <div className="text-sm text-gray-900 font-medium">{order.dueDate}</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resource Allocation</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm text-gray-500">Operator</span>
                                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2"><Icons.User className="w-3.5 h-3.5 text-gray-400" /> {order.assignedOperator}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm text-gray-500">Facility</span>
                                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2"><Icons.Factory className="w-3.5 h-3.5 text-gray-400" /> {order.factory}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm text-gray-500">Priority</span>
                                    <span className="text-sm font-medium text-gray-900">{order.priority}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                    <Button variant="outline">Print Routing</Button>
                    <Button>Edit Order</Button>
                </div>
            </div>
        </>
    );
};
