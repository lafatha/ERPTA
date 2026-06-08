"use client";

import React, { useState } from 'react';
import { SupplierEvaluation } from '@/types';
import { DataTable, ColumnDef } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { useMockDb } from '@/lib/mock-db-context';
import { RecordDrawer } from '@/components/record-drawer';

export const EVALUATION_COLUMNS: ColumnDef<SupplierEvaluation>[] = [
    { header: 'Supplier', accessorKey: 'supplierName', width: 'w-48', render: (val) => <span className="font-medium text-gray-900">{val}</span> },
    { header: 'Evaluation Date', accessorKey: 'evaluationDate' },
    { header: 'Evaluator', accessorKey: 'evaluator' },
    { header: 'Quality Score', accessorKey: 'qualityScore', type: 'number', render: (val) => (
        <span className={Number(val) < 85 ? 'text-orange-500' : 'text-green-600'}>{val}/100</span>
    )},
    { header: 'Delivery Score', accessorKey: 'deliveryScore', type: 'number', render: (val) => (
        <span className={Number(val) < 85 ? 'text-orange-500' : 'text-green-600'}>{val}/100</span>
    )},
    { 
        header: 'Overall Rating', 
        accessorKey: 'overallRating',
        options: ['Excellent', 'Good', 'Average', 'Poor'],
        type: 'select',
        render: (val) => (
            <Badge variant={val === 'Excellent' ? 'success' : val === 'Poor' ? 'dark' : 'outline'}>
                {val}
            </Badge>
        )
    }
];

export const EvaluationsView = () => {
    const { state, updateRecord } = useMockDb();
    const { supplierEvaluations } = state;
    const [selectedEval, setSelectedEval] = useState<SupplierEvaluation | null>(null);

    const handleSave = (updatedEval: SupplierEvaluation) => {
        updateRecord('supplierEvaluations', updatedEval.id, updatedEval);
    };

    return (
        <div className="h-full w-full flex flex-col">
            <DataTable 
                data={supplierEvaluations} 
                columns={EVALUATION_COLUMNS} 
                onRowClick={setSelectedEval} 
            />
            
            <RecordDrawer<SupplierEvaluation>
                record={selectedEval}
                columns={EVALUATION_COLUMNS}
                onClose={() => setSelectedEval(null)}
                onSave={handleSave}
                titleAccessor="supplierName"
                subtitleAccessor="overallRating"
            />
        </div>
    );
};
