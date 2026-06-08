"use client";

import React, { useState } from 'react';
import { useMockDb } from '@/lib/mock-db-context';
import { Icons } from '@/components/icons';

export const GeneralSettingsView = () => {
    const { theme, toggleTheme } = useMockDb();
    const [companyName, setCompanyName] = useState('Acme Furniture Manufacturing');
    const [email, setEmail] = useState('admin@acmefurniture.com');
    const [timezone, setTimezone] = useState('UTC-05:00 Eastern Time');
    const [currency, setCurrency] = useState('USD ($)');

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/30 dark:bg-[#0f0f0f] transition-colors duration-200">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header */}
                

                {/* Theme Settings Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            {theme === 'dark' ? <Icons.Settings className="w-5 h-5" /> : <Icons.Settings className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Appearance</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-4">Customize the look and feel of your workspace.</p>
                            
                            <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-[#3f3f3f]">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                                    <p className="text-xs text-gray-500 dark:text-[#aaaaaa]">Switch between light and dark themes.</p>
                                </div>
                                <button 
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-[#f1f1f1]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${theme === 'dark' ? 'bg-[#0f0f0f] translate-x-6' : 'bg-white translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Profile Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            <Icons.Factory className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Company Profile</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-6">Update your business details and contact information.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Company Name</label>
                                    <input 
                                        type="text" 
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Primary Email</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Localization Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            <Icons.Search className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Localization</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-6">Configure regional formats, currency, and timezones.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Timezone</label>
                                    <select 
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors"
                                    >
                                        <option>UTC-05:00 Eastern Time</option>
                                        <option>UTC-08:00 Pacific Time</option>
                                        <option>UTC+00:00 Greenwich Mean Time</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Default Currency</label>
                                    <select 
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors"
                                    >
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>IDR (Rp)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pb-8">
                    <button className="bg-black dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] hover:bg-gray-800 dark:hover:bg-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};
