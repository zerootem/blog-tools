import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        variant === 'default' && 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        variant === 'outline' && 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        size === 'default' && 'h-9 px-4 py-2',
        size === 'sm' && 'h-8 rounded-md px-3 text-xs',
        size === 'icon' && 'h-9 w-9',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
