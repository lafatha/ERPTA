"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { ColumnDef } from './data-table';

interface CreateDrawerProps<T> {
    isOpen: boolean;
    columns: ColumnDef<T>[];
    onClose: () => void;
    onSave?: (newRecord: Partial<T>) => void;
    title?: string;
}

export function CreateDrawer<T extends { id?: string | number }>({ 
    isOpen,
    columns, 
    onClose, 
    onSave,
    title = 'Create New Record'
}: CreateDrawerProps<T>) {
    const [formData, setFormData] = useState<Partial<T>>({});

    if (!isOpen) return null;

    const handleChange = (key: keyof T, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
        setFormData({});
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/10 z-40 transition-opacity" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}><Icons.X className="w-4 h-4" /></Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="space-y-4">
                        {columns.map(col => {
                            // Don't show id in create form usually, but depend on columns
                            const val = formData[col.accessorKey] !== undefined ? formData[col.accessorKey] : '';
                            
                            return (
                                <div key={col.accessorKey as string} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">{col.header}</label>
                                    
                                    {col.type === 'select' || col.options ? (
                                        <Select 
                                            value={String(val)} 
                                            onChange={(e: any) => handleChange(col.accessorKey, e.target.value)}
                                            className="w-full"
                                        >
                                            <option value="" disabled>Select {col.header}</option>
                                            {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </Select>
                                    ) : col.type === 'number' ? (
                                        <Input 
                                            type="number" 
                                            value={String(val)} 
                                            onChange={(e: any) => handleChange(col.accessorKey, Number(e.target.value))} 
                                            className="w-full"
                                            placeholder={`Enter ${col.header.toLowerCase()}`}
                                        />
                                    ) : (
                                        <Input 
                                            type="text" 
                                            value={String(val)} 
                                            onChange={(e: any) => handleChange(col.accessorKey, e.target.value)} 
                                            className="w-full"
                                            placeholder={`Enter ${col.header.toLowerCase()}`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSave}>Create</Button>
                </div>
            </div>
        </>
    );
}
