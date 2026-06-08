"use client";

import React, { useState } from 'react';
import { Icons } from '@/components/icons';

export const SecuritySettingsView = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [passwordChangedDate] = useState('2026-05-10');

    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50/30 dark:bg-[#0f0f0f] transition-colors duration-200">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header */}
                

                {/* Password Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            <Icons.Settings className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-6">Update your password associated with your account.</p>
                            
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">Current Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors placeholder:text-gray-400 dark:placeholder:text-[#aaaaaa]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-[#f1f1f1]">New Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#3f3f3f] rounded-lg text-sm bg-white dark:bg-[#121212] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:border-white transition-colors placeholder:text-gray-400 dark:placeholder:text-[#aaaaaa]"
                                    />
                                </div>
                                <div>
                                    <button className="bg-gray-100 dark:bg-[#3f3f3f] hover:bg-gray-200 dark:hover:bg-[#4f4f4f] text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                                        Update Password
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-[#aaaaaa] mt-2">Last changed: {passwordChangedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2FA Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            <Icons.User className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-4">Add an extra layer of security to your account.</p>
                            
                            <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-[#3f3f3f]">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Authenticator App</p>
                                    <p className="text-xs text-gray-500 dark:text-[#aaaaaa]">Use an app like Google Authenticator or Authy to generate verification codes.</p>
                                </div>
                                <button 
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${twoFactorEnabled ? 'bg-black dark:bg-[#f1f1f1]' : 'bg-gray-200 dark:bg-[#3f3f3f]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${twoFactorEnabled ? 'bg-white dark:bg-[#0f0f0f] translate-x-6' : 'bg-white translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Sessions Card */}
                <div className="bg-white dark:bg-[#212121] border border-gray-200 dark:border-transparent rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-black dark:text-white shrink-0">
                            <Icons.Monitor className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Active Sessions</h3>
                            <p className="text-sm text-gray-500 dark:text-[#aaaaaa] mb-6">Manage and revoke your active sessions across devices.</p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#3f3f3f]">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Windows • Chrome</p>
                                        <p className="text-xs text-gray-600 dark:text-[#aaaaaa] font-medium mt-0.5">Current session</p>
                                    </div>
                                    <p className="text-xs text-gray-400 dark:text-[#717171]">IP: 192.168.1.100</p>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#3f3f3f]">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">iOS • Safari</p>
                                        <p className="text-xs text-gray-500 dark:text-[#717171] mt-0.5">Last active: 2 hours ago</p>
                                    </div>
                                    <button className="text-sm text-gray-600 dark:text-[#aaaaaa] hover:text-black dark:hover:text-white font-medium">Revoke</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
