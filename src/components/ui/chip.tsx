import { forwardRef } from 'react';

import { XCircle } from 'lucide-react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const chip = tv({
  slots: {
    base: 'relative box-border inline-flex min-w-min max-w-fit items-center justify-between whitespace-nowrap',
    content: 'flex-1 font-normal text-inherit',
  },
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-50',
    },
    size: {
      sm: 'h-6 text-xs',
      md: 'h-7 text-sm',
      lg: 'h-8 text-base',
    },
    color: {
      default: 'bg-default',
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger text-white',
    },
    radius: {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-1.5xl',
      full: 'rounded-full',
      none: 'rounded-none',
    },
    variant: {
      solid: '',
      bordered: '',
      light: '',
      flat: '',
      faded: '',
      shadow: '',
      dot: '',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-1',
    },
    {
      size: 'lg',
      class: 'px-2',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'default',
    radius: 'full',
    variant: 'solid',
  },
});

export type ChipVariants = VariantProps<typeof chip>;

interface ChipProps extends ChipVariants, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  children?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClose?: () => void;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      startContent,
      endContent,
      onClose,
      className,
      isDisabled,
      size,
      color,
      radius,
      variant,
      ...props
    },
    ref,
  ) => {
    const { base, content } = chip({ isDisabled, size, color, radius, variant });

    return (
      <div
        ref={ref}
        className={cn(base(), className)}
        slot="base"
        aria-disabled={isDisabled}
        {...props}>
        {startContent}
        <span slot="content" className={cn(content(), size === 'sm' ? 'px-1' : 'px-2')}>
          {children}
        </span>
        {endContent || (onClose && <XCircle className="size-4 cursor-pointer" onClick={onClose} />)}
      </div>
    );
  },
);
