import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'muted';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-charcoal text-ivory',
    gold: 'bg-gold text-charcoal',
    muted: 'bg-border text-muted',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
