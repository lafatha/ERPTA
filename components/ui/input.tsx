import React from 'react';

export const Input = ({ className = '', ...props }: any) => (
    <input
        className={`flex h-8 w-full rounded-none border border-gray-300 bg-white px-2.5 py-1 text-sm text-gray-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);
