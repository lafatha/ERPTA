"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { sendChatMessage } from '@/app/actions/chat';

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
    const [isLoading, setIsLoading] = useState(false);
    const [activeContext, setActiveContext] = useState<'overview' | 'sales' | 'production'>('overview');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue.trim();
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: userText,
            timestamp: new Date()
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const data = await sendChatMessage(updatedMessages);
            
            if (data.choices && data.choices.length > 0) {
                let aiText = data.choices[0].message.content;
                
                // Parse tags for dashboard switching
                if (aiText.includes('[DASHBOARD:SALES]')) {
                    setActiveContext('sales');
                    aiText = aiText.replace('[DASHBOARD:SALES]', '').trim();
                } else if (aiText.includes('[DASHBOARD:PRODUCTION]')) {
                    setActiveContext('production');
                    aiText = aiText.replace('[DASHBOARD:PRODUCTION]', '').trim();
                } else if (aiText.includes('[DASHBOARD:OVERVIEW]')) {
                    setActiveContext('overview');
                    aiText = aiText.replace('[DASHBOARD:OVERVIEW]', '').trim();
                }

                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    sender: 'agent',
                    text: aiText,
                    timestamp: new Date()
                }]);
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            console.error("Error fetching from OpenRouter:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'agent',
                text: "Sorry, I encountered an error connecting to the AI server. Please try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderDashboardContent = () => {
        if (activeContext === 'sales') {
            return (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Sales & Revenue Insights</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                            <div className="text-sm text-gray-600 dark:text-[#aaaaaa] mb-1">Total Revenue (MTD)</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">Rp 18.675.000.000</div>
                            <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +12% <span className="text-gray-400 dark:text-[#717171]">vs last month</span></div>
                        </div>
                        <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                            <div className="text-sm text-gray-600 dark:text-[#aaaaaa] mb-1">Conversion Rate</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.2%</div>
                            <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +0.5% <span className="text-gray-400 dark:text-[#717171]">vs last month</span></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm h-64 flex flex-col justify-between">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white">Revenue Trend (Last 7 Days)</div>
                        <div className="flex-1 flex items-end gap-2 pt-4">
                            {[40, 55, 45, 70, 65, 85, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-gray-800 dark:bg-white rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${h}%` }}></div>
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
                        <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                            <div className="text-sm text-gray-600 dark:text-[#aaaaaa] mb-1">Total Output Units</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">12,450</div>
                            <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" /> +4.2% <span className="text-gray-400 dark:text-[#717171]">vs target</span></div>
                        </div>
                        <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                            <div className="text-sm text-gray-600 dark:text-[#aaaaaa] mb-1">Active MOs</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                            <div className="text-xs text-red-600 dark:text-red-400 mt-2">3 delayed <span className="text-gray-400 dark:text-[#717171]">due to materials</span></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#212121] p-5 rounded-sm border border-gray-200 dark:border-transparent shadow-sm">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Workstation Efficiency</div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-[#aaaaaa]">Assembly Station</span><span className="font-bold text-gray-900 dark:text-white">92%</span></div>
                                <div className="w-full bg-gray-100 dark:bg-[#3f3f3f] h-1.5 rounded-full overflow-hidden"><div className="bg-black dark:bg-white h-1.5" style={{width: '92%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-[#aaaaaa]">Painting & Finishing</span><span className="font-bold text-gray-900 dark:text-white">85%</span></div>
                                <div className="w-full bg-gray-100 dark:bg-[#3f3f3f] h-1.5 rounded-full overflow-hidden"><div className="bg-black dark:bg-white h-1.5" style={{width: '85%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 dark:text-[#aaaaaa]">Quality Inspection</span><span className="font-bold text-gray-900 dark:text-white">98%</span></div>
                                <div className="w-full bg-gray-100 dark:bg-[#3f3f3f] h-1.5 rounded-full overflow-hidden"><div className="bg-black dark:bg-white h-1.5" style={{width: '98%'}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-[#333] text-gray-900 dark:text-white rounded-full flex items-center justify-center mb-6">
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
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
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
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium ${isAgent ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-[#333] text-gray-700 dark:text-gray-300'}`}>
                                    {isAgent ? <Icons.Monitor className="w-4 h-4" /> : 'JP'}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm max-w-[75%] whitespace-pre-wrap ${isAgent ? 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-[#f1f1f1] rounded-tl-sm' : 'bg-gray-200 dark:bg-[#3f3f3f] text-gray-900 dark:text-[#f1f1f1] rounded-tr-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full flex-shrink-0 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                                <Icons.Monitor className="w-4 h-4 animate-pulse" />
                            </div>
                            <div className="p-3 rounded-2xl text-sm max-w-[75%] bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-[#f1f1f1] rounded-tl-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-[#333] bg-gray-50/50 dark:bg-[#151515]">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                            placeholder="Ask me anything..." 
                            className="w-full bg-white dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-[#eee] transition-all disabled:opacity-50"
                        />
                        <button 
                            type="submit"
                            disabled={!inputValue.trim() || isLoading}
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
