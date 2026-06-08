"use client";

import React from 'react';
import { Icons } from '@/components/icons';

interface ReportsViewProps {
    category: string;
}

export const ReportsView = ({ category }: ReportsViewProps) => {
    // Generate some mock reports based on the category
    const reports = [
        { name: `Q1 ${category} Summary`, date: '2026-04-01', size: '2.4 MB', type: 'PDF' },
        { name: `${category} Detail Report - May`, date: '2026-05-05', size: '1.1 MB', type: 'Excel' },
        { name: `YTD ${category} Performance`, date: '2026-06-01', size: '3.5 MB', type: 'PDF' },
        { name: `${category} Audit Log`, date: '2026-06-05', size: '840 KB', type: 'CSV' },
    ];

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2">
                        <Icons.Plus className="w-4 h-4" />
                        Generate New Report
                    </button>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="p-4">Report Name</th>
                                <th className="p-4">Date Generated</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Size</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reports.map((report, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                                        <Icons.FileText className="w-5 h-5 text-gray-400" />
                                        {report.name}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">{report.date}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <span className={`px-2 py-1 text-xs rounded-sm font-medium ${report.type === 'PDF' ? 'bg-red-50 text-red-700' : report.type === 'Excel' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">{report.size}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors" title="Download">
                                            <Icons.Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
