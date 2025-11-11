/**
 * Container component for consistent page width and padding
 */

import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function Container({
  children,
  maxWidth = '2xl',
  className = '',
  ...props
}: ContainerProps) {
  const maxWidthStyles = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`container mx-auto px-4 ${maxWidthStyles[maxWidth]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
