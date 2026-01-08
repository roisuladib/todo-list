'use client';

import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'group tap-highlight-transparent relative z-0 box-border inline-flex transform-gpu cursor-pointer select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap font-normal subpixel-antialiased outline-solid outline-transparent transition-transform-colors-opacity hover:opacity-80 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 active:scale-[0.97] motion-reduce:transition-none [&>svg]:max-w-8',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-50',
    },
    size: {
      sm: 'h-8 min-w-16 gap-2 rounded-lg px-3 text-xs',
      md: 'h-10 min-w-20 gap-2 rounded-xl px-4 text-sm',
      lg: 'h-12 min-w-24 gap-3 rounded-1.5xl px-6 text-[1rem]',
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
  defaultVariants: {
    size: 'md',
    color: 'default',
    variant: 'solid',
  },
  compoundVariants: [],
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  onPress,
  startContent,
  endContent,
  ...variantProps
}: ButtonProps) {
  return (
    <button
      type="button"
      slot="base"
      className={button(variantProps)}
      onClick={onPress}
      aria-disabled={variantProps.isDisabled}
      disabled={variantProps.isDisabled}>
      {startContent}
      {children}
      {endContent}
    </button>
  );
}
