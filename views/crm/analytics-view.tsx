"use client";

import React from 'react';
import { useMockDb } from '@/lib/mock-db-context';

export const CrmAnalyticsView = () => {
    const { state } = useMockDb();
    const { opportunities, leads, customers } = state;

    const wonOpps = opportunities.filter(o => o.stage === 'Closed Won');
    const totalWonRevenue = wonOpps.reduce((sum, o) => sum + o.value, 0);
    
    const pipelineOpps = opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
    const openPipelineValue = pipelineOpps.reduce((sum, o) => sum + o.value, 0);

    const activeAccounts = customers.filter(c => c.status === 'Active').length;
    const newLeads = leads.filter(l => l.status === 'New').length;

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-6">
                
                

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Closed Won (YTD)</p>
                        <p className="text-3xl font-semibold text-green-600 mt-2">${totalWonRevenue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Open Pipeline Value</p>
                        <p className="text-3xl font-semibold text-blue-600 mt-2">${openPipelineValue.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Active Accounts</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{activeAccounts}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">New Leads</p>
                        <p className="text-3xl font-semibold text-orange-600 mt-2">{newLeads}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Pipeline by Stage</h3>
                        <div className="flex-1 flex flex-col justify-end gap-2">
                            {['Prospecting', 'Qualification', 'Proposal', 'Negotiation'].map((stage, i) => {
                                const val = opportunities.filter(o => o.stage === stage).reduce((s, o) => s + o.value, 0);
                                const maxVal = Math.max(...['Prospecting', 'Qualification', 'Proposal', 'Negotiation'].map(st => opportunities.filter(o => o.stage === st).reduce((s, o) => s + o.value, 0)));
                                const width = maxVal > 0 ? (val / maxVal) * 100 : 0;
                                
                                return (
                                    <div key={stage} className="flex items-center gap-3">
                                        <div className="w-24 text-xs text-gray-600 truncate text-right">{stage}</div>
                                        <div className="w-48 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-gray-800 dark:bg-gray-400 h-full" style={{ width: `${width}%` }}></div>
                                        </div>
                                        <div className="w-20 text-xs font-semibold text-gray-700">${val.toLocaleString()}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Win Rate Trend</h3>
                        <div className="flex-1 flex items-end gap-2 justify-between mt-auto">
                            {[45, 50, 48, 55, 62, 58, 65, 70, 68, 75, 72, 80].map((h, i) => (
                                <div key={i} className="w-full bg-green-500 rounded-t-sm hover:bg-green-600 transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
