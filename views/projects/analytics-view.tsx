"use client";

import React from 'react';
import { useMockDb } from '@/lib/mock-db-context';

export const ProjectsAnalyticsView = () => {
    const { state } = useMockDb();
    const { projects, projectTasks, projectMilestones } = state;

    const activeProjects = projects.filter(p => p.status === 'Execution');
    const totalBudget = activeProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = activeProjects.reduce((sum, p) => sum + p.spent, 0);
    
    const pendingTasks = projectTasks.filter(t => ['To Do', 'In Progress'].includes(t.status)).length;
    const achievedMilestones = projectMilestones.filter(m => m.status === 'Achieved').length;

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-6">
                
                

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Active Projects</p>
                        <p className="text-3xl font-semibold text-blue-600 mt-2">{activeProjects.length}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Budget Variance</p>
                        <p className={`text-3xl font-semibold mt-2 ${totalSpent > totalBudget ? 'text-red-600' : 'text-green-600'}`}>
                            Rp {(totalBudget - totalSpent).toLocaleString('id-ID', {maximumFractionDigits: 0})}
                        </p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Pending Tasks</p>
                        <p className="text-3xl font-semibold text-gray-900 mt-2">{pendingTasks}</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                        <p className="text-sm text-gray-500 font-medium">Milestones Achieved</p>
                        <p className="text-3xl font-semibold text-purple-600 mt-2">{achievedMilestones}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Project Budget Burn-down</h3>
                        <div className="flex-1 flex flex-col justify-end gap-3">
                            {activeProjects.slice(0, 5).map(proj => {
                                const percent = (proj.spent / proj.budget) * 100;
                                return (
                                    <div key={proj.id} className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span className="truncate w-48">{proj.projectName}</span>
                                            <span>{Math.round(percent)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className={`h-full ${percent > 95 ? 'bg-red-500' : percent > 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm h-80 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Task Completion Status</h3>
                        <div className="flex-1 flex items-end gap-4 justify-center mt-auto pb-4">
                            {['To Do', 'In Progress', 'Review', 'Done'].map((status, i) => {
                                const count = projectTasks.filter(t => t.status === status).length;
                                const max = Math.max(...['To Do', 'In Progress', 'Review', 'Done'].map(s => projectTasks.filter(t => t.status === s).length));
                                const h = max > 0 ? (count / max) * 100 : 0;
                                const colors = ['bg-gray-300', 'bg-gray-400', 'bg-gray-600', 'bg-gray-800'];
                                return (
                                    <div key={status} className="flex flex-col items-center gap-2">
                                        <div className="w-16 flex items-end justify-center h-48">
                                            <div className={`w-12 ${colors[i]} rounded-t-sm`} style={{ height: `${h}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">{status}</span>
                                        <span className="text-xs text-gray-400">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
