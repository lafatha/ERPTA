"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '@/components/icons';

interface Message {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: Date;
}

export const DashboardAiView = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'agent',
            text: 'Hello! I am your ERP Assistant. How can I help you analyze your data today?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [activeContext, setActiveContext] = useState<'overview' | 'sales' | 'production'>('overview');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: userText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setInputValue('');

        // Simple mock intelligence
        setTimeout(() => {
            const lowerText = userText.toLowerCase();
            let aiText = "I've updated the dashboard view with the requested information.";
            let nextContext = activeContext;

            if (lowerText.includes('sales') || lowerText.includes('revenue') || lowerText.includes('order')) {
                aiText = "Here is your sales and revenue overview. Platform sales are up by 12% compared to last month.";
                nextContext = 'sales';
            } else if (lowerText.includes('production') || lowerText.includes('manufactur') || lowerText.includes('output')) {
                aiText = "I have pulled up the production metrics. Overall output is 4.2% above target.";
                nextContext = 'production';
            } else if (lowerText.includes('overview') || lowerText.includes('summary')) {
                aiText = "Switching back to the general overview.";
                nextContext = 'overview';
            } else {
                aiText = "I found some relevant data for your query. Let me know if you need more specific details like 'Sales' or 'Production'.";
            }

            const agentMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'agent',
                text: aiText,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, agentMsg]);
            setActiveContext(nextContext);
        }, 1000);
    };

    const renderDashboardContent = () => {
        if (activeContext === 'sales') {
            return (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Sales & Revenue Insights</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Revenue (MTD)</div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">$1,245,000</div>
                            <div className="text-xs text-blue-500 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +12% vs last month</div>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                            <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Conversion Rate</div>
                            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">4.2%</div>
                            <div className="text-xs text-emerald-500 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +0.5% vs last month</div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#222] rounded-lg p-5 border border-gray-100 dark:border-[#333] h-64 flex flex-col justify-between">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Trend (Last 7 Days)</div>
                        <div className="flex-1 flex items-end gap-2 pt-4">
                            {[40, 55, 45, 70, 65, 85, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-blue-400 dark:bg-blue-500 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (activeContext === 'production') {
            return (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Production Analytics</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                            <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Total Output Units</div>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">12,450</div>
                            <div className="text-xs text-purple-500 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +4.2% vs target</div>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800/30">
                            <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">Active MOs</div>
                            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">24</div>
                            <div className="text-xs text-orange-500 mt-2">3 delayed due to materials</div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#222] rounded-lg p-5 border border-gray-100 dark:border-[#333]">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Workstation Efficiency</div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-gray-400">Assembly Line A</span><span className="font-bold text-gray-900 dark:text-white">92%</span></div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full"><div className="bg-purple-500 h-1.5 rounded-full" style={{width: '92%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-gray-400">Welding Station</span><span className="font-bold text-gray-900 dark:text-white">85%</span></div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full"><div className="bg-purple-500 h-1.5 rounded-full" style={{width: '85%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-gray-400">Quality Control</span><span className="font-bold text-gray-900 dark:text-white">98%</span></div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full"><div className="bg-purple-500 h-1.5 rounded-full" style={{width: '98%'}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                    <Icons.Monitor className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">ERP Assistant Dashboard</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                    I can dynamically pull and visualize data based on your queries. Try asking me about <strong className="text-gray-700 dark:text-gray-300">Sales</strong>, <strong className="text-gray-700 dark:text-gray-300">Revenue</strong>, or <strong className="text-gray-700 dark:text-gray-300">Production</strong>.
                </p>
                <div className="flex gap-4">
                    <button onClick={() => setInputValue('Show me sales insights')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#333] dark:hover:bg-[#444] text-sm font-medium rounded-full transition-colors text-gray-700 dark:text-gray-200">
                        "Show me sales insights"
                    </button>
                    <button onClick={() => setInputValue('What is the production status?')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#333] dark:hover:bg-[#444] text-sm font-medium rounded-full transition-colors text-gray-700 dark:text-gray-200">
                        "What is the production status?"
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex gap-6 p-6 bg-gray-50/50 dark:bg-[#0f0f0f] overflow-hidden">
            
            {/* Left Panel: Dynamic Dashboard View */}
            <div className="flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl shadow-sm p-6 overflow-y-auto">
                {renderDashboardContent()}
            </div>

            {/* Right Panel: Chat Interface */}
            <div className="w-[400px] flex flex-col bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl shadow-sm overflow-hidden flex-shrink-0">
                <div className="p-4 border-b border-gray-100 dark:border-[#333] bg-gray-50/50 dark:bg-[#151515] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                        <Icons.Monitor className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#eee]">ERP Assistant</h3>
                        <p className="text-xs text-gray-500 dark:text-[#888]">Online</p>
                    </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                    {messages.map((msg) => {
                        const isAgent = msg.sender === 'agent';
                        return (
                            <div key={msg.id} className={`flex gap-3 ${isAgent ? '' : 'flex-row-reverse'}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium ${isAgent ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gray-200 dark:bg-[#333] text-gray-700 dark:text-gray-300'}`}>
                                    {isAgent ? <Icons.Monitor className="w-4 h-4" /> : 'JP'}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm max-w-[75%] ${isAgent ? 'bg-blue-50 dark:bg-[#1a2333] text-blue-900 dark:text-[#a5c2f5] rounded-tl-sm' : 'bg-gray-100 dark:bg-[#272727] text-gray-800 dark:text-[#ddd] rounded-tr-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-[#333] bg-gray-50/50 dark:bg-[#151515]">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything..." 
                            className="w-full bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-[#eee] transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black dark:bg-[#eee] text-white dark:text-black rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            <Icons.Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
