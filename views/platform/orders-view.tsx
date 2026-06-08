"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '@/components/icons';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';

interface PlatformOrder {
    id: string;
    orderNumber: string;
    user: string;
    status: 'Pending' | 'Processing' | 'Completed';
    date: string;
    total: string;
}

interface ChatMessage {
    id: string;
    sender: 'user' | 'system' | 'agent';
    text: string;
    timestamp: Date;
}

export const PlatformOrdersView = () => {
    // Mock Data for Platform Orders
    const [orders] = useState<PlatformOrder[]>([
        { id: '1', orderNumber: 'PLAT-1001', user: 'Alice Smith', status: 'Pending', date: '2026-06-08', total: '$1,200.00' },
        { id: '2', orderNumber: 'PLAT-1002', user: 'Bob Johnson', status: 'Processing', date: '2026-06-07', total: '$450.00' },
        { id: '3', orderNumber: 'PLAT-1003', user: 'Charlie Davis', status: 'Completed', date: '2026-06-05', total: '$3,150.00' },
        { id: '4', orderNumber: 'PLAT-1004', user: 'Diana Prince', status: 'Pending', date: '2026-06-08', total: '$890.00' },
        { id: '5', orderNumber: 'PLAT-1005', user: 'Ethan Hunt', status: 'Processing', date: '2026-06-09', total: '$2,100.00' },
        { id: '6', orderNumber: 'PLAT-1006', user: 'Fiona Gallagher', status: 'Completed', date: '2026-06-02', total: '$500.00' },
    ]);

    // Chat State
    const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeChatUser]);

    const handleOpenChat = (userName: string) => {
        setActiveChatUser(userName);
        // Initialize chat history if empty
        if (!messages[userName]) {
            setMessages(prev => ({
                ...prev,
                [userName]: [
                    { id: Date.now().toString(), sender: 'system', text: `Chat started with ${userName}`, timestamp: new Date() }
                ]
            }));
        }
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || !activeChatUser) return;

        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => ({
            ...prev,
            [activeChatUser]: [...(prev[activeChatUser] || []), newMsg]
        }));
        
        setInputValue('');

        // Simulate user reply after 1.5 seconds
        setTimeout(() => {
            setMessages(prev => {
                const currentHistory = prev[activeChatUser] || [];
                const replyMsg: ChatMessage = {
                    id: Date.now().toString(),
                    sender: 'user',
                    text: `Thanks for the update! I'll wait for the next steps regarding my order.`,
                    timestamp: new Date()
                };
                return {
                    ...prev,
                    [activeChatUser]: [...currentHistory, replyMsg]
                };
            });
        }, 1500);
    };

    const columns: ColumnDef<PlatformOrder>[] = [
        { 
            header: 'Order #', 
            accessorKey: 'orderNumber',
            render: (val) => <span className="font-medium underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-black text-blue-600">{val}</span>
        },
        { 
            header: 'User', 
            accessorKey: 'user',
            render: (val) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {String(val).charAt(0)}
                    </div>
                    <span>{val}</span>
                </div>
            )
        },
        { 
            header: 'Date', 
            accessorKey: 'date',
            type: 'date',
            render: (val) => <span className="text-gray-500">{val}</span>
        },
        { 
            header: 'Total', 
            accessorKey: 'total',
            render: (val) => <span className="font-medium text-gray-900">{val}</span>
        },
        { 
            header: 'Status', 
            accessorKey: 'status',
            type: 'select',
            options: ['Pending', 'Processing', 'Completed'],
            render: (val) => {
                if (val === 'Completed') return <Badge variant="success">{val}</Badge>;
                if (val === 'Processing') return <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-200">{val}</Badge>;
                return <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">{val}</Badge>;
            }
        },
        {
            header: 'Actions',
            accessorKey: 'id', // dummy accessor key since we need one
            render: (_, row) => (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenChat(row.user);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-sm transition-colors"
                >
                    <Icons.MessageCircle className="w-4 h-4" />
                    Chat
                </button>
            )
        }
    ];

    return (
        <div className="h-full flex relative overflow-hidden bg-white dark:bg-[#0f0f0f] transition-colors duration-200">
            {/* Main Table Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${activeChatUser ? 'mr-80' : ''}`}>
                {/* Action Bar */}
                
                <DataTable 
                    data={orders} 
                    columns={columns} 
                    onRowClick={(row) => handleOpenChat(row.user)}
                />
            </div>

            {/* Chat Drawer */}
            <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#212121] border-l border-gray-200 dark:border-[#3f3f3f] shadow-xl flex flex-col transform transition-transform duration-300 z-10 ${activeChatUser ? 'translate-x-0' : 'translate-x-full'}`}>
                {activeChatUser && (
                    <>
                        {/* Chat Header */}
                        <div className="px-4 py-3 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-[#3f3f3f] text-gray-900 dark:text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3f3f3f] text-gray-800 dark:text-white flex items-center justify-center font-bold shadow-inner">
                                    {activeChatUser.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm leading-tight">{activeChatUser}</h3>
                                    <p className="text-[10px] flex items-center gap-1 text-gray-500 dark:text-[#aaaaaa]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setActiveChatUser(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors text-gray-500 hover:text-gray-800 dark:text-[#aaaaaa] dark:hover:text-white">
                                <Icons.X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 flex flex-col gap-3">
                            {(messages[activeChatUser] || []).map((msg) => {
                                if (msg.sender === 'system') {
                                    return (
                                        <div key={msg.id} className="text-center">
                                            <span className="px-2 py-1 bg-gray-100 rounded-full text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                }
                                
                                const isAgent = msg.sender === 'agent';
                                return (
                                    <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'} max-w-[85%]`}>
                                        <div className={`px-3 py-2.5 rounded-2xl text-sm shadow-sm ${isAgent ? 'bg-black dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] rounded-br-sm' : 'bg-gray-100 dark:bg-[#3f3f3f] border border-transparent text-gray-800 dark:text-white rounded-bl-sm'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-400 dark:text-[#717171] mt-1 px-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-200 dark:border-[#3f3f3f] bg-white dark:bg-[#212121]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#3f3f3f] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white text-gray-900 dark:text-[#f1f1f1] placeholder:text-gray-400 dark:placeholder:text-[#717171] transition-all"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="p-2.5 bg-black dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] rounded-full hover:bg-gray-800 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Icons.Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
