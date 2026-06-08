import React from 'react';

export const Select = ({ className = '', children, ...props }: any) => (
    <select
        className={`flex h-8 w-full items-center justify-between rounded-none border border-gray-300 bg-white px-2.5 py-1 text-sm text-gray-900 shadow-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
        {...props}
    >
        {children}
    </select>
);
