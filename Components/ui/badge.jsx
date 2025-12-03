import React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
      className
    )}
    {...props}
  >
    {children}
  </div>
))

Badge.displayName = 'Badge'

export { Badge }
