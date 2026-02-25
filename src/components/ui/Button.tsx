import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  children: ReactNode;
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-8 py-3 rounded font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gold text-charcoal hover:bg-opacity-90 hover:shadow-lg',
    ghost: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
    outline: 'border border-border text-charcoal hover:border-gold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
