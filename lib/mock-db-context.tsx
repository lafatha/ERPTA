"use client";

import React, { createContext, useContext, useState } from 'react';
import { ManufacturingOrder, InventoryItem } from '@/types';
import { MOCK_DATA } from './mock-data';
import { MOCK_INVENTORY_DATA } from './mock-data-inventory';

// We'll expand this as we add modules
export interface DatabaseState {
    manufacturingOrders: ManufacturingOrder[];
    inventoryItems: InventoryItem[];
    // alerts, pos, crm, etc.
}

interface DatabaseContextType {
    state: DatabaseState;
    addRecord: <K extends keyof DatabaseState>(collection: K, record: DatabaseState[K][number]) => void;
    updateRecord: <K extends keyof DatabaseState>(collection: K, id: string, updates: Partial<DatabaseState[K][number]>) => void;
    deleteRecord: <K extends keyof DatabaseState>(collection: K, id: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const MockDatabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<DatabaseState>({
        manufacturingOrders: MOCK_DATA,
        inventoryItems: MOCK_INVENTORY_DATA,
    });

    const addRecord = <K extends keyof DatabaseState>(collection: K, record: DatabaseState[K][number]) => {
        setState(prev => ({
            ...prev,
            [collection]: [record, ...prev[collection]]
        }));
    };

    const updateRecord = <K extends keyof DatabaseState>(collection: K, id: string, updates: Partial<DatabaseState[K][number]>) => {
        setState(prev => ({
            ...prev,
            [collection]: prev[collection].map((item: any) => 
                item.id === id ? { ...item, ...updates } : item
            )
        }));
    };

    const deleteRecord = <K extends keyof DatabaseState>(collection: K, id: string) => {
        setState(prev => ({
            ...prev,
            [collection]: prev[collection].filter((item: any) => item.id !== id)
        }));
    };

    return (
        <DatabaseContext.Provider value={{ state, addRecord, updateRecord, deleteRecord }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useMockDb = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error("useMockDb must be used within a MockDatabaseProvider");
    }
    return context;
};
