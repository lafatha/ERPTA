import React from 'react';
import { Button } from '@/components/ui/button';

export const ScheduleView = () => (
    <div className="p-6 h-full flex flex-col bg-white">
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-medium">Production Schedule (Gantt)</h2>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">Today</Button>
                <div className="flex bg-gray-100 p-0.5 rounded-sm">
                    <Button variant="ghost" size="sm" className="bg-white shadow-sm text-black">Days</Button>
                    <Button variant="ghost" size="sm">Weeks</Button>
                </div>
            </div>
        </div>
        <div className="flex-1 border border-gray-200 overflow-hidden relative flex flex-col">
            {/* Fake Gantt Header */}
            <div className="flex bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <div className="w-48 p-2 border-r border-gray-200 font-medium text-gray-700">Work Center</div>
                {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="flex-1 p-2 border-r border-gray-200 text-center">Feb {15 + i}</div>
                ))}
            </div>
            {/* Fake Gantt Body */}
            <div className="flex-1 overflow-auto bg-gray-50/30 pattern-grid-lg text-gray-900/5">
                {['Cutting Line A', 'Assembly B', 'Painting C', 'Packaging A', 'QA Station 1'].map((center, idx) => (
                    <div key={center} className="flex border-b border-gray-200 relative h-12 bg-white">
                        <div className="w-48 p-2 border-r border-gray-200 text-sm font-medium text-gray-700 flex items-center bg-white z-10 sticky left-0">{center}</div>
                        <div className="flex-1 relative">
                            {/* Fake blocks */}
                            {idx % 2 === 0 && <div className="absolute top-2 bottom-2 left-[10%] right-[60%] bg-gray-800 text-white text-xs p-1 rounded-sm flex items-center shadow-sm">MO20015 - In Progress</div>}
                            {idx % 3 === 0 && <div className="absolute top-2 bottom-2 left-[50%] right-[20%] bg-gray-200 border border-gray-300 text-gray-800 text-xs p-1 rounded-sm flex items-center">MO20018 - Planned</div>}
                            {idx === 1 && <div className="absolute top-2 bottom-2 left-[5%] right-[80%] bg-white border border-black text-black font-medium text-xs p-1 rounded-sm flex items-center">Maintenance</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
