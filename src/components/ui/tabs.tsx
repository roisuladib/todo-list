'use client';

import { forwardRef, useState } from 'react';

import { cn } from 'tailwind-variants';

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement<{ title: string }>[];
  defaultSelectedKey?: string;
  onPress?: (selectedKey: string) => void;
};

export const Tab = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className }, ref) => (
    <div className={cn(className)} ref={ref}>
      {children}
    </div>
  ),
);
Tab.displayName = 'Tab';

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, children, defaultSelectedKey, onPress }, ref) => {
    const [selectedKey, setSelectedKey] = useState(defaultSelectedKey || children[0].key);

    const handleTabClick = (targetKey: string | null) => {
      setSelectedKey(targetKey);
      if (onPress && targetKey) {
        onPress(targetKey);
      }
    };

    return (
      <div ref={ref}>
        <div className={cn('inline-flex', className)}>
          <div className="scrollbar-hide relative flex h-fit flex-nowrap items-center gap-2 overflow-x-scroll">
            {children.map(child => (
              <button
                key={child.key}
                type="button"
                title={child.props.title}
                className={cn(
                  'group tap-highlight-transparent relative z-0 flex h-8 w-full cursor-pointer items-center justify-center px-3 py-1 font-medium text-base outline-solid outline-transparent transition-all duration-300 after:absolute after:bottom-0 after:h-0.5 after:w-full',
                  { 'after:bg-primary': child.key === selectedKey },
                )}
                onClick={() => handleTabClick(child.key)}>
                <div
                  className={cn('relative z-10 whitespace-nowrap transition-none', {
                    'text-default-500': child.key !== selectedKey,
                  })}>
                  {child.props.title}
                </div>
              </button>
            ))}
          </div>
        </div>
        {children.find(child => child.key === selectedKey)}
      </div>
    );
  },
);
Tabs.displayName = 'Tabs';
