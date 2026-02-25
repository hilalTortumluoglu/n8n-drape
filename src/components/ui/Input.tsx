import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-charcoal mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-gold transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
