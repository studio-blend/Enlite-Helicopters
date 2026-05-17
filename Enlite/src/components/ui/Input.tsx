"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{icon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-card text-text-primary text-sm",
              "placeholder:text-text-muted transition-all duration-200",
              "focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-card text-text-primary text-sm",
            "placeholder:text-text-muted transition-all duration-200 resize-y min-h-[120px]",
            "focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border-default bg-bg-card text-text-primary text-sm",
            "transition-all duration-200 cursor-pointer appearance-none",
            "focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20",
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
