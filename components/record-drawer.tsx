"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { ColumnDef } from './data-table';

interface RecordDrawerProps<T> {
    record: T | null;
    columns: ColumnDef<T>[];
    onClose: () => void;
    onSave?: (updatedRecord: T) => void;
    titleAccessor?: keyof T;
    subtitleAccessor?: keyof T;
    statusAccessor?: keyof T;
}

export function RecordDrawer<T extends { id: string | number }>({ 
    record, 
    columns, 
    onClose, 
    onSave,
    titleAccessor,
    subtitleAccessor,
    statusAccessor
}: RecordDrawerProps<T>) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<T>>({});

    useEffect(() => {
        if (record) {
            setFormData(record);
            setIsEditing(false);
        }
    }, [record]);

    if (!record) return null;

    const handleChange = (key: keyof T, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        if (onSave && formData) {
            onSave(formData as T);
        }
        setIsEditing(false);
    };

    const title = titleAccessor ? String(record[titleAccessor] || '') : 'Details';
    const subtitle = subtitleAccessor ? String(record[subtitleAccessor] || '') : '';
    const status = statusAccessor ? String(record[statusAccessor] || '') : '';

    return (
        <>
            <div className="fixed inset-0 bg-black/10 z-40 transition-opacity" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col animate-in slide-in-from-right duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
                            {status && <Badge variant="outline">{status}</Badge>}
                        </div>
                        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        {!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
                        <Button variant="ghost" size="icon" onClick={onClose}><Icons.X className="w-4 h-4" /></Button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="space-y-4">
                        {columns.map(col => {
                            const val = formData[col.accessorKey] !== undefined ? formData[col.accessorKey] : '';
                            
                            return (
                                <div key={col.accessorKey as string} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">{col.header}</label>
                                    
                                    {!isEditing ? (
                                        <div className="text-sm text-gray-900 bg-gray-50 p-2 rounded-sm border border-transparent min-h-[36px] flex items-center">
                                            {String(val || '-')}
                                        </div>
                                    ) : (
                                        col.type === 'select' || col.options ? (
                                            <Select 
                                                value={String(val)} 
                                                onChange={(e: any) => handleChange(col.accessorKey, e.target.value)}
                                                className="w-full"
                                            >
                                                {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </Select>
                                        ) : col.type === 'number' ? (
                                            <Input 
                                                type="number" 
                                                value={String(val)} 
                                                onChange={(e: any) => handleChange(col.accessorKey, Number(e.target.value))} 
                                                className="w-full"
                                            />
                                        ) : (
                                            <Input 
                                                type="text" 
                                                value={String(val)} 
                                                onChange={(e: any) => handleChange(col.accessorKey, e.target.value)} 
                                                className="w-full"
                                            />
                                        )
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                {isEditing && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                )}
            </div>
        </>
    );
}
