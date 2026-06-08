import React from 'react';

export const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }: any) => {
    const baseStyle = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        default: "bg-black text-white hover:bg-gray-800 shadow-sm",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    };
    const sizes = {
        default: "h-8 px-3 text-sm",
        sm: "h-7 px-2 text-xs",
        icon: "h-8 w-8",
    };
    return (
        <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`} {...props}>
            {children}
        </button>
    );
};
