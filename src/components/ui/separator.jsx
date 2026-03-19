import React from 'react';
import { cn } from '../../lib/utils';

const Separator = React.forwardRef(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  const orientationProps = orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]';
  return (
    <div
      ref={ref}
      className={cn('shrink-0 bg-border', orientationProps, className)}
      {...(decorative ? { 'aria-hidden': true } : {})}
      {...props}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
