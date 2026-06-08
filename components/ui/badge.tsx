import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }: any) => {
    const base = "inline-flex items-center px-1.5 py-0.5 text-xs font-medium border rounded-sm";
    const variants = {
        default: "bg-gray-100 text-gray-800 border-gray-200",
        dark: "bg-black text-white border-black",
        outline: "text-gray-700 border-gray-300 bg-transparent",
        error: "bg-gray-800 text-white border-gray-800",
        warning: "bg-gray-200 text-gray-900 border-gray-300",
        success: "bg-white text-black border-black font-semibold",
    };
    return <span className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>{children}</span>;
};
