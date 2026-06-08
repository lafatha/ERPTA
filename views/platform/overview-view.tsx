"use client";

import React from 'react';
import { Icons } from '@/components/icons';

export const PlatformOverviewView = () => {
    return (
        <div className="p-6 h-full overflow-y-auto space-y-6">
            {/* Header section */}
            <div className="flex justify-between items-start">
                <div></div>
                <div className="text-sm text-gray-400 dark:text-[#717171]">
                    Last updated: Just now
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">Total Online Orders</h3>
                        <Icons.ShoppingCart className="w-4 h-4 text-gray-400 dark:text-[#717171]" />
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">1,245</span>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                        <span className="text-green-600 dark:text-green-400">+12%</span>
                        <span className="text-gray-400 dark:text-[#717171] ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">Total Value</h3>
                        <Icons.DollarSign className="w-4 h-4 text-gray-400 dark:text-[#717171]" />
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$45,200</span>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                        <span className="text-green-600 dark:text-green-400">+8%</span>
                        <span className="text-gray-400 dark:text-[#717171] ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">Conversion Rate</h3>
                        <Icons.TrendingUp className="w-4 h-4 text-gray-400 dark:text-[#717171]" />
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</span>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                        <span className="text-red-600 dark:text-red-400">-0.4%</span>
                        <span className="text-gray-400 dark:text-[#717171] ml-1">from last week</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-[#aaaaaa]">Active Customers</h3>
                        <Icons.Users className="w-4 h-4 text-gray-400 dark:text-[#717171]" />
                    </div>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">892</span>
                    </div>
                    <div className="mt-2 text-xs font-medium">
                        <span className="text-green-600 dark:text-green-400">+45</span>
                        <span className="text-gray-400 dark:text-[#717171] ml-1">from last week</span>
                    </div>
                </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Top Customers</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3f3f3f] flex items-center justify-center text-sm font-bold text-gray-700 dark:text-[#f1f1f1]">A</div>
                                <span className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Alice Smith</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">12 Orders</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3f3f3f] flex items-center justify-center text-sm font-bold text-gray-700 dark:text-[#f1f1f1]">C</div>
                                <span className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Charlie Davis</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">8 Orders</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3f3f3f] flex items-center justify-center text-sm font-bold text-gray-700 dark:text-[#f1f1f1]">B</div>
                                <span className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Bob Johnson</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">5 Orders</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Product Types</h3>
                    <div className="space-y-4 mt-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="text-gray-700 dark:text-[#aaaaaa]">Standard (Finished)</span>
                                <span className="font-bold text-gray-900 dark:text-white">65%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-[#3f3f3f] rounded-full overflow-hidden">
                                <div className="h-full bg-black dark:bg-[#f1f1f1]" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="text-gray-700 dark:text-[#aaaaaa]">Custom Made</span>
                                <span className="font-bold text-gray-900 dark:text-white">35%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-[#3f3f3f] rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 dark:bg-[#717171]" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
