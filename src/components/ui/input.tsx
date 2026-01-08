'use client';

import type { VariantProps } from 'tailwind-variants';

import { forwardRef } from 'react';

import { cn, tv } from 'tailwind-variants';

export const input = tv({
  base: 'inline-flex items-center gap-2 bg-default-100 px-3',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-50',
    },
    fullWidth: {
      true: 'w-full',
    },
    size: {
      sm: 'h-8 min-h-8 rounded-lg',
      md: 'h-10 min-h-10 rounded-xl',
      lg: 'h-12 min-h-12 rounded-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type InputVariants = VariantProps<typeof input>;

interface InputProps
  extends InputVariants,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, fullWidth, isDisabled, className, startContent, endContent, ...rest }, ref) => {
    return (
      <div className={cn(input({ size, fullWidth, isDisabled }), className)}>
        {startContent}
        <input
          ref={ref}
          className="h-full w-full outline-none transition-all motion-reduce:transition-none"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          required={!isDisabled}
          autoComplete="off"
          {...rest}
        />
        {endContent}
      </div>
    );
  },
);
