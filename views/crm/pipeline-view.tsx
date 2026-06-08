"use client";

import React from 'react';
import { useMockDb } from '@/lib/mock-db-context';

const STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export const PipelineView = () => {
    const { state } = useMockDb();
    const { opportunities } = state;

    return (
        <div className="p-6 h-full overflow-x-auto bg-gray-50/50">
            <div className="flex gap-4 h-full min-w-max pb-4">
                {STAGES.map(stage => {
                    const oppsInStage = opportunities.filter(o => o.stage === stage);
                    const stageValue = oppsInStage.reduce((sum, o) => sum + o.value, 0);

                    return (
                        <div key={stage} className="w-80 bg-gray-100/50 border border-gray-200 rounded-md flex flex-col max-h-full">
                            <div className="p-3 border-b border-gray-200 bg-white/50 sticky top-0">
                                <h3 className="font-semibold text-gray-800 flex justify-between items-center">
                                    {stage}
                                    <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">{oppsInStage.length}</span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">${stageValue.toLocaleString()}</p>
                            </div>
                            
                            <div className="p-2 overflow-y-auto flex-1 space-y-2">
                                {oppsInStage.map(opp => (
                                    <div key={opp.id} className="bg-white p-3 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <h4 className="font-medium text-gray-900 text-sm truncate">{opp.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{opp.accountName}</p>
                                        <div className="flex justify-between items-center mt-3 text-xs">
                                            <span className="font-semibold text-green-600">${opp.value.toLocaleString()}</span>
                                            <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm">{opp.probability}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
